document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      sections.forEach(section => {
        section.classList.add('hidden');
      });
      document.getElementById(targetId).classList.remove('hidden');
    });
  });

  // Load resources
  fetch('http://localhost:3000/resources')
    .then(response => response.json())
    .then(data => {
      const resourcesDiv = document.getElementById('resources');
      resourcesDiv.innerHTML = data.map(res => `<p><a href="${res.link}" target="_blank">${res.title}</a></p>`).join('');
    })
    .catch(error => console.error('Error loading resources:', error));

  const adviceForm = document.getElementById('adviceForm');
  const adviceResult = document.getElementById('adviceResult');
  const adviceContent = document.getElementById('adviceContent');

  adviceForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    adviceContent.innerHTML = 'Loading...';
    adviceResult.classList.remove('hidden');

    const crop = document.getElementById('crop').value.trim();
    const location = document.getElementById('location').value.trim();
    const challenges = document.getElementById('challenges').value.trim();

    try {
      const response = await fetch('http://localhost:3000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop, location, challenges }),
      });
      if (!response.ok) {
        throw new Error('Failed to get advice');
      }
      const data = await response.json();
      adviceContent.innerHTML = `
        <p><strong>Best Practices:</strong> ${data.bestPractices}</p>
        <p><strong>Fertilizer Recommendations:</strong> ${data.fertilizerRecommendations}</p>
        <p><strong>Pesticide Recommendations:</strong> ${data.pesticideRecommendations}</p>
        <p><strong>Market Trends:</strong> ${data.marketTrends}</p>
        <p><strong>Career Guidance:</strong> ${data.careerGuidance}</p>
      `;
    } catch (error) {
      adviceContent.innerHTML = '<p class="text-red-600">Error fetching advice. Please try again later.</p>';
    }
  });
});
