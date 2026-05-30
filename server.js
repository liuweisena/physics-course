const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve Vue static files in production
const distPath = path.join(__dirname, 'client', 'dist');
app.use(express.static(distPath));

// API routes
app.use('/api/courses', require('./api/courses'));
app.use('/api/payment', require('./api/payment'));
app.use('/api/auth', require('./api/auth'));

// SPA fallback — serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return;
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
