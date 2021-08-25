'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const server = express();
server.use(cors());
server.use(express.json());
const bookModel = require('./modules/book-model');
const PORT = process.env.PORT;

server.get('/', handleMainRoute);

function handleMainRoute(req,res){
    res.send('Hello')
} 


server.get('/books',getBooksByOwnerEmail);
server.post('/books',addBookForOwnerEmail);
server.delete('/books/:bookID',deleteBookForOwnerEmail);
server.put('/books/:bookID',editBookForOwnerEmail);

async function editBookForOwnerEmail(req, res) {
    const {bookDescription,bookImageUrl,bookName} = req.body;
    await bookModel.findOne({_id:req.params.bookID},(err,book)=>{
        if(err){
            res.status(500).send({message:err.message});
        }
        else{
            book.title = bookName;
            book.description = bookDescription;
            book.image = bookImageUrl;
            book.save().then(book=>{
                bookModel.find({email:book.email},(err,bookData)=>{
              
                        res.status(200).send(bookData);
                    
                })
            }).catch((err)=>{
                res.status(500).send(err)
            })
    
        }
    });

}

async function deleteBookForOwnerEmail(req,res){
    const bookID = req.params.bookID;
    const ownerName = req.query.ownerName;
    bookModel.deleteOne({_id:bookID},(error,deletedBook)=>{
        if(error) {
            console.log('error in deleteing the book')
        } else {
            console.log('book has been deleted', deletedBook)
            bookModel.find({ email:ownerName }, function (err, bookData) {
                if (err) {
                    console.log('error in getting the books')
                } else {
                    res.send(bookData)
                }
            })
        }
    })


}

async function addBookForOwnerEmail(req,res){
const {ownerEmail,bookDescription,bookImageUrl,bookName} = req.body; 
await bookModel.create({email:ownerEmail,description:bookDescription,image:bookImageUrl,title:bookName});
bookModel.find({email:ownerEmail},(err,bookData)=>{
    if(err){
        res.status(500).send(err)
    }else{
        res.status(200).send(bookData);
    }
})

}
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


server.listen(PORT, () => console.log(`Server listening ${PORT}`));

// mongodb://<username>:admin-trad@cluster0-shard-00-00.7i932.mongodb.net:27017,cluster0-shard-00-01.7i932.mongodb.net:27017,cluster0-shard-00-02.7i932.mongodb.net:27017/books?ssl=true&replicaSet=atlas-ygzegn-shard-0&authSource=admin&retryWrites=true&w=majority