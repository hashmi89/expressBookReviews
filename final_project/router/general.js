const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const authorBooks = [];

    for (let isbn in books){
        if (books[isbn].author.toLowerCase() === author.toLowerCase()){
            authorBooks.push(books[isbn]);
        }
    }

    if (authorBooks.length > 0){
        return res.send(JSON.stringify(authorBooks));
    } else {
        return res.status(404).json({message : `Unable to find any books with author: ${author}`})
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const titleBooks = [];

    for (let isbn in books){
        if (books[isbn].title.toLowerCase() === title.toLowerCase()){
            titleBooks.push(books[isbn]);
        }
    }

    if (titleBooks.length > 0){
        return res.send(JSON.stringify(titleBooks));
    } else {
        return res.status(404).json({message : `Unable to find any books with title: ${title}`})
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const reviews = books[isbn].reviews
    return res.send(JSON.stringify(reviews,null,4));
});

module.exports.general = public_users;
