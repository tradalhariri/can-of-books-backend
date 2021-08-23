'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const server = express();
server.use(cors());
const bookModel = require('./modules/book-model');
const PORT = process.env.PORT;

const booksData = require('./constants/dummy-data')

server.get('/', handleMainRoute);

function handleMainRoute(req,res){
    res.send('Hello')
} 


server.get('/books',getBooksByOwnerEmail);

function getBooksByOwnerEmail(req,res){
    let ownerEmail = req.query.ownerEmail;
    bookModel.find({email:ownerEmail},function(err,bookData){
        if(err){
            res.send(err);
        }else{
            res.send(bookData)
        }

    })
}


function fillBestBooksWithData(){

booksData.map(book=>{
    let myBook = new bookModel({title:book.title,description:book.description,image:book.image,email:book.email})
    myBook.save();
});
}

// fillBestBooksWithData();


server.listen(PORT, () => console.log(`Server listening ${PORT}`));