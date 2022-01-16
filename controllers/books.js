const path = require("path");

const formidable = require('formidable');

const Book = require("../models/books");
const Cat = require("../models/categories");

const rootDir = require("../utils/path");
const { builtinModules } = require("module");



module.exports.getAddBookPage = (req, res, next) => {
    Cat.getAllCat((data)=>{

        res.render("add-book", {
            pageTitle: "Admin | Add book",
            cat:data
        })
    })
};
module.exports.saveBookAndRedirectToList = (req, res, next) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        let pathFile = files.image.filepath;
        let fileName = files.image.originalFilename;

        let title = fields.title;
        let description = fields.description;
        let catId = fields.catId;
        let price = fields.price;
        let publishDate = fields.publishDate;
        let publisingCompany= fields.publisingCompany;
        let pages = fields.pages;
        let author = fields.author;

        const book = new Book(title,description,catId,price,publishDate,publisingCompany, pages,author,pathFile, fileName);
        book.save(() => {
            res.redirect("/shop/list"); 
        });
    })

}

module.exports.loadListOfBooks = (req, res, next) => {

    Book.fetchAll((books) => {
        Cat.getAllCat((data)=>{

            res.render("book-list", {
                pageTitle: "Shop | Book list",
                books: books,allCat:data
            })
        })
    })

}

module.exports.bookDetail = (req, res, next) => {
    let slug = req.params.slug;
    Book.fetchBySlug(slug, (book) => {
        let bookData = book[0];
        Cat.getCatById(bookData.cat_id,catName=>{
            
            res.render("book-detail", {
                pageTitle: "Shop | Book detail", book: bookData, cat:catName[0]
            });
            
        })
  
       
    })
}

module.exports.getBookByCat = (req,res,next)=>{
    let slug = req.params.slug;
    Book.fetchAllBookByCat(slug,(allBook)=>{
        Cat.getAllCat((allCat)=>{
            res.render("book-list-by-cat",{
                pageTitle: "Shop | Book detail", books: allBook, allCat:allCat
            })
        })
    })
}