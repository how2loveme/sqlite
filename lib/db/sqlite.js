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

const all = (db, query) => {
  return new Promise((resolve, reject) => {
    try {
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
      });
    } catch (err) {
      console.log(err.message, err.stack);
    }
  });
}

const run = (db, query) => {
  return new Promise((resolve, reject) => {
    try {
      db.serialize(() => {
        db.run(query, (err, result) => {
          if (err) {
            console.error(err.message);
            reject(err);
          }
          console.log(`QUERY: ${query}`, '\n', `RESULT: `, result);
          resolve(result);
        });
      });
    } catch (err) {
      console.log(err.message, err.stack);
    }
  });
}

const select = (db, query, param) => {
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      const result = await all(db, query, param, (err, _result) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        console.log(_result);
      });
      resolve(result);
    });
  });
}

const insert = (db, query, param) => {
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      console.log(`INSERT RUN`);
      await run(db, query, param, (err) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }
      });
      resolve();
    });
  });
}

const update = (db, query, param) => {
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      console.log(`UPDATE RUN`);
      await run(db, query, param, (err) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }
      });
      resolve();
    });
  });
}

const _delete = (db, query, param) => {
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      console.log(`DELETE RUN`);
      await run(db, query, param, (err) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }
      });
      resolve();
    });
  });
}

module.exports = { open, close, select, insert, update, _delete };