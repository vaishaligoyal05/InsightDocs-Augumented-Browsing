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

  const message = `
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
    const response = await cohere.chat({
      model: 'command-r-plus-08-2024',     // ✅ Updated model
      message,                     // ✅ Correct key name
      temperature: 0.5,
      max_tokens: 700,
    });

    console.log("✅ AI Result:", response.text);
    res.json({ result: response.text });
  } catch (err) {
    console.error("❌ Cohere Error:", err);
    res.status(500).json({
      error: 'Cohere API failed',
      details: err.body?.message || err.message,
    });
  }
});

module.exports = router;
