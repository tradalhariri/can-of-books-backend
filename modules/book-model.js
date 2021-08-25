'use strict';

const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGODB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });
const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    image:String,
    email: String
});

const bookModel = mongoose.model('book', bookSchema);

module.exports = bookModel;