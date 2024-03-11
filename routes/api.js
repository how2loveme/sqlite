const express = require('express');

const { open, close, query } = require('../lib/db/sqlite');

const router = express.Router();

router.get('/hello', function (req, res) {
  res.status(200).json('hello world!');
});
router.get('/test', async function (req, res) {
  const db = await open();
  const result = await query(db, `SELECT PlaylistId as id, Name as name FROM playlists`);
  close(db);
  res.status(200).json(result);
});

module.exports = router;