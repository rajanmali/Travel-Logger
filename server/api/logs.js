const { Router } = require('express');
const LogEntry = require('../models/LogEntry');

const router = Router();

const { API_KEY } = process.env;

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
    if (req.get('X-API-KEY') !== API_KEY) {
      res.status(401);
      throw new Error('Unauthorised.');
    }
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json({ ...createdEntry, message: 'Created new log entry.' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    if (!error.message) error.message = 'Log could not be created';
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    if (req.get('X-API-KEY') !== API_KEY) {
      res.status(401);
      throw new Error('Unauthorised.');
    }
    const deletRes = await LogEntry.deleteOne(
      {
        _id: req.body.id,
      },
      (error, result) => {
        try {
          if (error === null && result.deletedCount === 0) {
            res.status(409);
            throw new Error('Log could not be deleted');
          }
        } catch (err) {
          next(err);
        }
      }
    );

    res.json({ ...deletRes, message: 'Log has been deleted.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
