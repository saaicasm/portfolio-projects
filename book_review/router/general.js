const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
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


public_users.get('/', function (req, res) {
  new Promise((resolve, reject) => {
    if (books) {
      resolve(books);
    } else {
      reject("Books not found");
    }
  })
  .then((bookList) => {
    return res.status(200).json(bookList); 
  })
  .catch((err) => {
    return res.status(500).json({ message: err }); 
  });
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
 
  const isbn = req.params.isbn;
  
  new Promise((resolve,reject) => {
    if(isbn) {
      const book = books[isbn];
      resolve(book);
    }else{
      reject("Invalid ISBN")
    }
  }).then((book) => {
    return res.status(200).json(book);
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({message:err});
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  new Promise ((resolve, reject) => {
    const ids = Object.keys(books);
    const author = req.params.author;
    ids.forEach((id) => {
      if(books[id]['author'] == author) {
        const book = books[id];
        resolve(book);
      }
    })
    if(!book) {
      reject("Author Invalid");
    }
  }).then((book) => {
    res.status(200).json(book);
  }).catch((err) => {
    res.status(500).json({message:err});
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  new Promise ((resolve, reject) => {
    const ids = Object.keys(books);
    const title = req.params.title;
    ids.forEach((id) => {
      if(books[id]['title'] == title) {
        const book = books[id];
        resolve(book);
      }
    })
    if(!book) {
      reject("Title Invalid");
    }
  }).then((book) => {
    res.status(200).json(book);
  }).catch((err) => {
    res.status(500).json({message:err});
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn;
    
    return res.status(300).json(books[isbn]['reviews']);
  
});

module.exports.general = public_users;