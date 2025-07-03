const express = require('express');
const router = express.Router();
require('dotenv').config();

const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

router.post('/', async (req, res) => {
  const { text } = req.body;
  console.log("🔹 Request received to explain:", text);

  const prompt = `
You're a helpful coding assistant. Generate structured documentation for: "${text}"

Include:
**Explanation**
- Bullet points explaining it

**Syntax**
\`\`\`language
// proper code syntax
\`\`\`

**Example**
\`\`\`language
// minimal working example
\`\`\`

**Related Examples**
- Related concept 1
- Related concept 2

**Dependencies**
- Any required import or setup

**FAQ**
- A typical user question and a short answer
`;

  try {
    const response = await cohere.generate({
      model: 'command',
      prompt: prompt,
      max_tokens: 700, 
      temperature: 0.5,
    });

    const result = response.generations[0].text;
    console.log(" AI Result:", result);
    res.json({ result });
  } catch (err) {
    console.error(" Cohere Error:", err);
    res.status(500).json({ error: 'Cohere API failed', details: err.message });
  }
});

module.exports = router;
