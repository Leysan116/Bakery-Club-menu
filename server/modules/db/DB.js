const sqlite3 = require('sqlite3').verbose();
const { resolve } = require('path');
const path = require('path');

class DB {
    constructor({ NAME }) {
        this.db = new sqlite3.Database(path.join(__dirname, NAME));
    }

    destructor() {
        if (this.db) this.db.close();
    }

    getCupckakeByName(name) {
        return new Promise(resolve =>
            this.db.serialize(() => {
                const query = "SELECT * FROM cupcakes WHERE name=?";
                this.db.get(query, [name], (err, row) => resolve(err ? null : row));
            })
        );
    }

    db_all(query) {
        return new Promise((resolve, reject) => {
            this.db.all(query, (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    getAllProductsByTableName(tableName) {
        return this.db_all(`SELECT * FROM ${tableName}`);
    }
}

module.exports = DB;