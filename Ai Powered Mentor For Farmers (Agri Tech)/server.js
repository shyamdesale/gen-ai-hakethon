const express = require('express');
const path = require('path');
const cors = require('cors');
// const admin = require('firebase-admin'); // Placeholder for Firebase

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Placeholder for Firebase init
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

const askRoute = require('./routes/ask');
const resourcesRoute = require('./routes/resources');

app.use('/ask', askRoute);
app.use('/resources', resourcesRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
