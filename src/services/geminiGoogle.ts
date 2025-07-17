import axios from "axios";

const aiGemini = async (message: string) => {

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi.';
    return reply;
  } catch (error) {
    console.error('Gemini API error:', error);
  }
}
export default aiGemini;