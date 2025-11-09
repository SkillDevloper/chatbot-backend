const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (index.html, script.js, style.css) from project root
app.use(express.static(path.join(__dirname)));

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

if (!process.env.OPENAI_API_KEY && !process.env.OPENROUTER_API_KEY) {
  console.warn('WARNING: No API key found. Set OPENAI_API_KEY or OPENROUTER_API_KEY in a .env file.');
}

// Helper to call OpenRouter (if OPENROUTER_API_KEY is provided)
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
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });


  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`OpenRouter error ${res.status}: ${txt}`);
  }

  const data = await res.json();
  // Attempt to read the assistant reply in common response shapes
  const answer = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.message || data?.choices?.[0]?.text || null;
  return answer;
}

// Read the local index.html once (you can expand to read other pages if needed)
const INDEX_PATH = path.resolve(__dirname, 'index.html');
let pageText = '';
try {
  const html = fs.readFileSync(INDEX_PATH, 'utf-8');
  // very simple strip-tags to get textual context
  pageText = html.replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
} catch (err) {
  console.warn('Could not read index.html for context:', err.message);
}

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  // Build system prompt instructing the model to answer only from the site's content
  const systemPrompt = `
You are an intelligent, friendly, and professional AI assistant for this website. 
Your main job is to help users by answering only questions related to the website's content.

You must analyze the user's intent carefully before replying.

---

🧩 BEHAVIOR RULES:

**Greetings & Polite Chat:**
If the user greets you (e.g. "hi", "hello", "hey", "salam"), respond warmly and naturally:
→ "Hello! How can I help you with this website today?"
→ "Salam! How can I assist you about this site?"

If the user says thank you or shows appreciation:
→ "You're very welcome!"
→ "Khushi hui madad karke!"

If the user says goodbye (e.g. "bye", "khuda hafiz"):
→ "Goodbye! Take care and have a great day!"

---

**Website-related questions:**
If the user asks a question that clearly relates to this website, its content, features, or services:
→ Answer helpfully and accurately using only the provided website text.
→ Summarize naturally, don’t copy long text.
→ Keep responses short, clear, and user-friendly.

---

**Pricing or plan questions:**
If the user asks about pricing, plans, or cost:
→ "Our pricing or plans may vary depending on services. Please check the website’s pricing section or contact the admin for exact details."

---

**Out-of-scope questions:**
If the user asks something **unrelated to the website** (e.g. world news, general knowledge, math, politics, etc.), politely stop them:
→ "This question is outside the website’s content. Please contact the website admin for more details."

You must never answer such questions, even if you know the answer — always redirect politely.

---

**Language & Tone:**
- Always reply in the same language the user uses (English,hinglish or Urdu).
- Maintain a polite, natural, and conversational tone.
- Keep responses short and to the point.

---

GOAL:
Act like a smart, human-like website assistant who:
- Welcomes greetings,
- Answers relevant questions clearly,
- Refuses off-topic ones politely,
- Keeps the tone friendly and intelligent.
`;



  // Construct the messages array with site context (trimmed to a reasonable length)
  const context = pageText ? pageText.slice(0, 15000) : 'No site context available.';

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'system', content: `Website content (for reference):\n${context}` },
    { role: 'user', content: message }
  ];

  try {
    let answer = null;

    if (process.env.OPENROUTER_API_KEY) {
      // Prefer OpenRouter if API key provided
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
      return res.status(500).json({ error: 'No AI provider configured (set OPENROUTER_API_KEY or OPENAI_API_KEY).' });
    }

    if (!answer) answer = 'Sorry, I could not get an answer.';
    res.json({ answer });
  } catch (err) {
    console.error('AI provider error', err);
    const isDev = process.env.NODE_ENV !== 'production';
    res.status(500).json({ error: isDev ? (err.message || String(err)) : 'AI request failed' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
