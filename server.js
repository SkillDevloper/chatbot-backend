// ====== DEPENDENCIES ======
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const OpenAI = require('openai');

// ====== APP SETUP ======
const app = express();
app.use(cors());
app.use(express.json());

// ====== STATIC FILES (optional for public folder) ======
app.use(express.static(path.join(__dirname, 'public')));

// ====== OPENAI / OPENROUTER CONFIG ======
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

if (!process.env.OPENAI_API_KEY && !process.env.OPENROUTER_API_KEY) {
  console.warn('⚠️ WARNING: No API key found. Set OPENAI_API_KEY or OPENROUTER_API_KEY in .env');
}

// ====== OPENROUTER HELPER ======
async function callOpenRouter(messages, opts = {}) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not set');

  const model = process.env.OPENROUTER_MODEL || 'gpt-4o-mini';

  const body = {
    model,
    messages,
    max_tokens: opts.max_tokens || 800,
    temperature: typeof opts.temperature !== 'undefined' ? opts.temperature : 0.2,
  };

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`OpenRouter error ${res.status}: ${txt}`);
  }

  const data = await res.json();
  return (
    data?.choices?.[0]?.message?.content ||
    data?.choices?.[0]?.message ||
    data?.choices?.[0]?.text ||
    'No reply.'
  );
}

// ====== LOAD LOCAL WEBSITE TEXT (OPTIONAL) ======
let pageText = '';
try {
  const INDEX_PATH = path.resolve(__dirname, 'public', 'index.html');
  const html = fs.readFileSync(INDEX_PATH, 'utf-8');
  pageText = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
} catch (err) {
  console.warn('No local index.html found for context.');
}

// ====== CHATBOT ENDPOINT ======
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  const systemPrompt = `
You are an intelligent, friendly, and professional AI assistant for this website.
Your main job is to help users by answering only questions related to the website's content.
Follow these rules:
- Greet politely ("Salam!", "Hello! How can I help you?")
- Answer only about website info; if unrelated, politely refuse.
- Reply in user's language (English, Hinglish, or Urdu).
- Keep tone natural, polite, short.
`;

  const context = pageText ? pageText.slice(0, 15000) : 'No site context available.';
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'system', content: `Website content (for reference):\n${context}` },
    { role: 'user', content: message },
  ];

  try {
    let answer = null;

    if (process.env.OPENROUTER_API_KEY) {
      answer = await callOpenRouter(messages, { max_tokens: 800, temperature: 0.2 });
    } else if (openai) {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 800,
        temperature: 0.2,
      });
      answer = response.choices?.[0]?.message?.content?.trim();
    } else {
      return res.status(500).json({ error: 'No AI provider configured.' });
    }

    res.json({ answer: answer || 'Sorry, I could not get an answer.' });
  } catch (err) {
    console.error('AI provider error:', err);
    res.status(500).json({ error: 'AI request failed.' });
  }
});

// ====== HEALTH CHECK ======
app.get('/', (req, res) => {
  res.send('✅ Chatbot backend is running successfully.');
});

// ====== START SERVER ======
const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
