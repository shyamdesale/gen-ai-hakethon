const express = require('express');
const router = express.Router();

// Simulated AI response function
function generateAdvice(crop, location, challenges) {
  return {
    bestPractices: `Best practices for growing ${crop} in ${location} include proper irrigation and pest control.`,
    fertilizerRecommendations: `Use nitrogen-rich fertilizers for ${crop}.`,
    pesticideRecommendations: `Use eco-friendly pesticides to manage pests in ${crop}.`,
    marketTrends: `The market price for ${crop} is expected to rise by 5% next season.`,
    careerGuidance: `Consider training programs in sustainable farming and government schemes for ${crop} farmers.`,
  };
}

router.post('/', (req, res) => {
  const { crop, location, challenges } = req.body;
  if (!crop || !location || !challenges) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const advice = generateAdvice(crop, location, challenges);
  // Here you would save the query and advice to Firestore (mocked for now)
  res.json(advice);
});

module.exports = router;
