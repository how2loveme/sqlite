const sqlite3 = require('sqlite3').verbose();

// 절대경로로 써야 인식함
let dbFile = 'lib/db/chinook.db'; // :memory:

/*
let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(`${dbFile} Connected!`);
});

db.serialize(() => {
  db.each(`SELECT PlaylistId as id, Name as name FROM playlists`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + '\t' + row.name);
  })
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(`${dbFile} Closed!`)
});
*/

const open = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
        reject(err.message);
        return;
      }
      console.log(`${dbFile} Connected!`);
      resolve(db);
    });
  });
}

const close = (db) => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`${dbFile} Closed!`)
  });
}

const query = (db, query) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const result = [];
      db.all(query, (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        console.log(`QUERY: ${query}`, '\n', `RESULT: `, rows);
        resolve(rows);
      });
      /*
      db.each(query, (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        result.push(row);
        console.log(row.id + '\t' + row.name);
      });
      */
    });
  });
}

module.exports = { open, close, query };