const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeImageWithGemini = async ({ imageBuffer, mimeType }) => {
  const imageBase64 = imageBuffer.toString("base64");

  const prompt = `
이 사진을 보고 해충 출현 가능성을 판단해줘.

반드시 JSON으로만 답해줘. 
그리고 판단 근거와 행동 안내는 한국어로 부탁해. 
PestType에는 배열로 이 사진에 있을 법한 해충 종류를 넣어줘

{
  "hasPest": true,
  "riskLevel": "low | medium | high",
  "confidence": 0.0,
  "pestTypes": ["모기"],
  "reason": "판단 근거",
  "recommendation": "행동 안내"
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType,
              data: imageBase64,
            },
          },
        ],
      },
    ],
  });

  const text = response.text;

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

module.exports = { analyzeImageWithGemini };