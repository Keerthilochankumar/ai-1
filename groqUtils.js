// groqUtils.js
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey:'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'});
async function getGroqChatCompletion(message) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama3-8b-8192",
  });
}

module.exports = { getGroqChatCompletion };

