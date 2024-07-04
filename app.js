// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { getGroqChatCompletion } = require('./groqUtils'); // Assuming you store Groq API functions in groqUtils.js

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Routes
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const chatCompletion = await getGroqChatCompletion(message);
    res.json({ completion: chatCompletion.choices[0]?.message?.content || "" });
  } catch (error) {
    console.error('Error fetching chat completion:', error);
    res.status(500).json({ error: 'Failed to fetch chat completion' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
