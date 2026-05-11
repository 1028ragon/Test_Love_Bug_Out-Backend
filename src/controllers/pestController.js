const { analyzeImageWithGemini } = require("../services/geminiService");

const analyzePest = async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res.status(400).json({
        status: "error",
        message: "이미지 파일이 필요합니다.",
      });
    }

    const result = await analyzeImageWithGemini({
      imageBuffer: image.buffer,
      mimeType: image.mimetype,
    });

    return res.json({
      status: "success",
      ...result,
    });
  } catch (err) {
    console.error("AI 분석 에러:", err);

    // 무료 사용량 초과
    if (err.status === 429) {
      return res.status(429).json({
        status: "error",
        message: "AI 무료 사용량을 초과했습니다. 잠시 후 다시 시도하세요.",
      });
    }

    // Gemini 서버 혼잡
    if (err.status === 503) {
      return res.status(503).json({
        status: "error",
        message: "AI 서버가 현재 혼잡합니다. 잠시 후 다시 시도하세요.",
      });
    }

    // 기타 에러
    return res.status(500).json({
      status: "error",
      message: "AI 분석 실패",
    });
  }
};

module.exports = { analyzePest };