const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();

// تهيئة Firebase
try {
  const serviceAccount = require('./serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('✅ تم تهيئة Firebase');
} catch (error) {
  console.error('❌ خطأ في Firebase:', error.message);
}

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'User-Agent']
}));

app.use(express.json({ limit: '50mb' }));

// Health check endpoint - IMPORTANT!
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    version: '2.0.0',
    uptime: process.uptime(),
    timestamp: Date.now(),
    requests: pendingRequests.size
  });
});

// Ping endpoint
app.get('/ping', (req, res) => {
  res.send('pong');
});

// باقي الكود نفسه...
// (الكود الكامل اللي أرسلته قبل كده)

const pendingRequests = new Map();

// ... كل الـ endpoints ...

// Keep-alive mechanism
setInterval(() => {
  console.log(`💚 Keep-alive - Requests: ${pendingRequests.size}`);
}, 5 * 60 * 1000); // كل 5 دقائق

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('═══════════════════════════════════════');
  console.log('⚡ TurboShare Server v2.0');
  console.log('✅ السيرفر يعمل على المنفذ:', PORT);
  console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
  console.log('═══════════════════════════════════════');
});
