const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Use the cors middleware with specific options to allow requests from the client-side
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST'],
}));

app.use(express.json()); // To parse JSON data in the request body

app.post('/api/gpt3', async (req, res) => {
  try {
    const { query } = req.body;
    console.log('Received query:', query);

    if (!query) {
      throw new Error('Query not provided');
    }

    const prompt = `Search for: ${query}`;

    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      {
        prompt,
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
           Authorization: "Bearer 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",
        },
      }
    );

    res.json(response.data.choices[0].text);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
