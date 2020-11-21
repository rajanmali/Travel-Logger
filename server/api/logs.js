const { Router } = require('express');
const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const deletRes = await LogEntry.deleteOne({ _id: req.body.id });
    res.json({ ...deletRes, message: 'Log has been deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
