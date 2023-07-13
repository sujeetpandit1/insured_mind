const express = require('express');
const { upload, searchPolicyByUser, aggregatePoliciesByUser } = require('../controller/controller');
const { schedule } = require('../controller/task2Controller');
const router = express.Router();

router.post('/upload', upload);
router.get('/search', searchPolicyByUser);
router.get('/aggregate', aggregatePoliciesByUser);

router.post('/schedule', schedule);

router.get('/testing', (_req, res) => {
  res.status(200).send({ status: true, message: 'Hello Testing API is Live' });
});

router.all('/**', (_req, res) => {
  res.status(404).send({ status: false, message: 'Requested API not Available' });
});

module.exports = router;