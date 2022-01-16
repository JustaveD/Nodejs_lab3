
const mysql = require("mysql");

const { networkInterfaces } = require('os');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'labnodejs'
})

const getCatFromDB = (cb) => {
    let sql = "SELECT * FROM cat";

    db.query(sql,(err,data)=>{
        if(err) throw err;
        cb(data);
    })
}

module.exports = class Categories {
    
    static getAllCat(cb) {
        getCatFromDB(cat => {
            cb(cat);
        })
    }
    static getCatById(id,cb) {
        let sql = `SELECT cat_name from cat where cat_id = ${id}`;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            cb(data);
        })
    }
}