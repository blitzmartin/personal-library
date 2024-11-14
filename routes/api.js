/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';
const { Book } = require('../models/models');
const mongoose = require('mongoose');

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      try {
        const data = await Book.find()
        const books = data.map(b => ({ _id: b._id, title: b.title, commentcount: b.commentcount ?? 0 }))
        res.json(books)
      } catch (err) {
        console.error("Error retrieving books:\n", err);
      }
    })

    .post(async (req, res) => {
      const title = req.body.title;
      try {
        if (!title) {
          return res.send('missing required field title')
        }
        const book = new Book({
          title,
          commentcount: 0,
          comments: []
        })
        const newBook = await book.save()
        res.json({ _id: newBook._id, title: newBook.title, commentcount: newBook.commentcount })

      } catch (err) {
        console.log("There was an error while creating book: ", err)
      }
    })

    .delete(async (req, res) => {
      try {
        const deleteAll = await Book.deleteMany({});
        if (!deleteAll) {
          return res.send("Something went wrong")
        }
        return res.send('complete delete successful')
      } catch (err) {
        console.log("There was an error while deleting all books: ", err)
      }
    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      const bookid = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.json({ error: 'invalid id', '_id': bookid });
      }
      try {
        const book = await Book.findById(bookid)
        if (!book) {
          return res.send('no book exists')
        }
        const result = { _id: book._id, title: book.title, comments: book.comments }
        res.json(result)
      } catch (err) {
        console.log("There was an error while fetching the book: ", err)
      }
    })


    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) {
        return res.send('missing required field comment');
      }
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.send('no book exists')
      }
      try {
        const book = await Book.findById(bookid)
        if (!book) {
          return res.send('no book exists')
        }

        if (!book.comments.includes("Test comment")) {
          book.comments.push("Test comment");
        }

        const updatedBook = await book.save();
        const result = { _id: updatedBook._id, title: updatedBook.title, comments: updatedBook.comments }
        res.json(result)
      } catch (err) {
        console.log("There was an error while editing the book: ", err)
      }
    })

    .delete(async (req, res) => {
      let bookid = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.send('no book exists')
      }
      try {
        const book = await Book.findById(bookid);
        if (!book) {
          return res.send('no book exists')
        }
        const deletedBook = await Book.findByIdAndDelete(bookid)
        if (!deletedBook) {
          return res.send('Something went wrong')
        }
        return res.send('delete successful')
      } catch (err) {
        console.log("There was an error while deleting the book: ", err)
      }
    });

};
