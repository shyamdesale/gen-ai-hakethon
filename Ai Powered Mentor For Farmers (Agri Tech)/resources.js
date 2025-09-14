const express = require('express');
const router = express.Router();

// Mock resources data
const resources = [
  { title: 'Sustainable Farming Guide', link: 'https://example.com/guide' },
  { title: 'Government Schemes for Farmers', link: 'https://example.com/schemes' },
  { title: 'Crop Disease Management', link: 'https://example.com/diseases' },
];

router.get('/', (req, res) => {
  res.json(resources);
});

module.exports = router;
