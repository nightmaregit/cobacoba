require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.get('/api/getFirebaseConfig', (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401); // Unauthorized
  
    if (token !== AUTH_TOKEN) return res.sendStatus(403); // Forbidden
  
    next(); // Jika token benar, lanjut ke handler berikutnya
  }

  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

  res.status(200).json(firebaseConfig);
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
