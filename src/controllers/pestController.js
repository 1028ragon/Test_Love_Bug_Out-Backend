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

    res.json({
      status: "success",
      ...result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "AI 분석 실패",
    });
  }
};

module.exports = { analyzePest };