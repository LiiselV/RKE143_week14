const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const TARGET_BASE = process.env.TARGET_BASE || 'https://rke143-week12-26op.onrender.com';

app.get('/', (req, res) => {
  res.send('OK');
});

app.get('/random', async (req, res) => {
  try {
    const r = await fetch(`${TARGET_BASE}/random`);
    const text = await r.text();
    res.status(r.status).type('application/json').send(text);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get('/fullRecipes', async (req, res) => {
  try {
    const r = await fetch(`${TARGET_BASE}/fullRecipes`);
    const text = await r.text();
    res.status(r.status).type('application/json').send(text);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
