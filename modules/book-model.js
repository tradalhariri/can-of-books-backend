'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bestbooks', { useNewUrlParser: true, useUnifiedTopology: true });
const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    image:String,
    email: String
});

const bookModel = mongoose.model('book', bookSchema);

module.exports = bookModel;