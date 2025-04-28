import axios from 'axios';

export const sendToOpenAI = async (userMessage) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: "You are NANI, an advanced StarkTech AI Assistant. Be helpful, powerful and slightly sassy." },
          { role: 'user', content: userMessage }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    const aiMessage = response.data.choices[0].message.content;
    return aiMessage;

  } catch (error) {
    console.error('Error talking to OpenAI:', error);
    return "⚠️ Sorry, Commander, I'm experiencing some issues right now.";
  }
};
