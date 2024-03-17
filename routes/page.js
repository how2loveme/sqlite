const express = require('express');

const { open, close, select, insert, update, _delete } = require('../lib/db/sqlite');

const router = express.Router();

router.get('/hello', function (req, res) {
  res.status(200).json('hello world!');
});
router.get('/test', async function (req, res) {
  const db = await open();
  const result = await select(db, `SELECT PlaylistId as id, Name as name FROM playlists`);
  close(db);
  res.status(200).json(result);
});
router.post('/insert', async function (req, res) {
  const id = req.body.id;
  const db = await open();
  const cnt1 = await select(db, `SELECT COUNT(1) FROM playlists`);
  const result = await select(db, `INSERT INTO playlist ('Name') values (${id})`);
  const cnt2 = await select(db, `SELECT COUNT(1) FROM playlists`);
  close(db);
  res.status(200).json(result);
});

module.exports = router;