const fs = require('fs');
const path = require("path");

const mysql = require("mysql");
const formidable = require('formidable');

const rootDir = require("../utils/path");
const { networkInterfaces } = require('os');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'labnodejs'
})

const p = path.join(rootDir, "data", "books.json");


const getBookFromDB = (cb) => {
    let sql = "SELECT * FROM book";

    db.query(sql,(err,data)=>{
        if(err) throw err;
        cb(data);
    })
}

const addBookToDB = (cb)=>{
    // do something
}

function slugify(string){
    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return string.toString().toLowerCase()
        .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
        .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
        .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
        .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
        .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
        .replace(/đ/gi, 'd')
        .replace(/\s+/g, '-') 
        .replace(p, c => b.charAt(a.indexOf(c)))
        .replace(/&/g, '-and-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
    }

module.exports = class Book {
    constructor(name,description,catId,price,publishDate,publisingCompany, pages,author,pathFile, fileName) {
        this.name = name;
        this.author = author;
        this.price = price;
        this.description = description;
        this.pathFile = pathFile;
        this.fileName = fileName;
        this.publishDate = publishDate;
        this.publisingCompany = publisingCompany;
        this.pages = pages;
        this.catId = catId
    }

    save(cb) {
        // save image
        let destPath = path.join(rootDir, "public", "images", this.fileName);
        let slug = slugify(this.name) + "-"+this.pages + "-pages";

        let today = new Date();
        let updateTime = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        fs.copyFile(this.pathFile, destPath, (err) => {
            if (err) throw err;
            fs.unlink(this.pathFile, () => {
                console.log("Temp image file was deleted!");
            })
            // save content into database
            let sql = "insert into book SET ?";

            let newBook = {
                book_name: this.name,
                description: this.description,
                imageUrl : this.fileName,
                updateTime: updateTime,
                price: this.price,
                publish_date: this.publishDate,
                showHide: 1,
                cat_id:this.catId,
                publising_company: this.publisingCompany,
                pages: this.pages,
                slug:slug,
                author: this.author
            }
            db.query(sql, newBook,(err)=>{
                if(err) throw err;
                cb();
            })
            

        })

    }

    static fetchAll(cb) {
        getBookFromDB(books => {
            cb(books);
        })
    }
    static fetchBySlug(slug, cb) {
        let sql = `SELECT * FROM book where slug = '${slug}'`;
        
        db.query(sql,(err,data)=>{
            if(err) throw err;
            cb(data);
        })
    }
    static fetchAllBookByCat(slug,cb){
        let sql = `SELECT cat_id FROM cat where slug = '${slug}'`;
        db.query(sql,(err,data)=>{
            if(err) throw err;
            sql = `SELECT * from book where cat_id = ${data[0].cat_id}`;
            db.query(sql,(err,allBook)=>{
                if(err) throw err;
                cb(allBook);
            })
        })
    }

}