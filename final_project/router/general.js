const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
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

// TASK 10 - getting the list of books using Promise callbacks
public_users.get('/books',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });
      get_books.then(() => console.log("Promise for Task 10 resolved"));
  });

// TASK 11 - getting the book details based on ISBN using Promise callbacks
public_users.get('/books/:isbn',function (req, res) {
  const get_books_isbn = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    resolve(res.send(books[isbn]));
  });
    get_books_isbn.then(() => console.log("Promise for TASK 11 resolved"));
 });

 // TASK 12 - getting the book details based on ISBN using Promise callbacks
 public_users.get('/books/author/:author',function (req, res) {
    const get_books_author = new Promise((resolve, reject) =>{
        const author = req.params.author;
        const authorBooks = [];

        for (let isbn in books){
            if (books[isbn].author.toLowerCase() === author.toLowerCase()){
                authorBooks.push(books[isbn]);
            }
        }

        if (authorBooks.length > 0){
            resolve(res.send(JSON.stringify(authorBooks)));
        } else {
            reject(res.status(404).json({message : `Unable to find any books with author: ${author}`}));
        }
        get_books_author.then(() => console.log("Promise for TASK 12 resolved"));
    });
});

// TASK 13 - getting the book details based on the title using Promise callbacks
public_users.get('/books/title/:title',function (req, res) {
    const get_books_title = new Promise((resolve,reject) => {
        const title = req.params.title;
        const titleBooks = [];

        for (let isbn in books){
            if (books[isbn].title.toLowerCase() === title.toLowerCase()){
                titleBooks.push(books[isbn]);
            }
        }

        if (titleBooks.length > 0){
            resolve(res.send(JSON.stringify(titleBooks)));
        } else {
            reject(res.status(404).json({message : `Unable to find any books with title: ${title}`}));
        }
        get_books_title.then(() => console.log("Promise for TASK 13 resolved"));
    });
});

module.exports.general = public_users;
