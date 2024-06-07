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
  try {
    const name = req.body.name;
    const db = await open();
    const result = await insert(db, `INSERT INTO playlists (Name) values ('${name}')`);
    close(db);
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message, err.stack);
  }
});
router.put('/update', async function (req, res) {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const db = await open();
    const result = await update(db, `UPDATE playlists SET Name='${name}' WHERE PlaylistId='${id}'`);
    close(db);
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message, err.stack);
  }
});
router.delete('/delete', async function (req, res) {
  try {
    const id = req.body.id;
    const db = await open();
    const result = await _delete(db, `DELETE FROM playlists WHERE PlaylistId = ${id}`);
    close(db);
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message, err.stack);
  }
});

module.exports = router;