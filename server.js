const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Fallback to index.html for SPA (optional, can be removed if not needed)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 