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

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      const bookid = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.json({ error: 'invalid id', '_id': _id });
      }
      try {
        const book = await Book.findById(bookid)
        if (!book) {
          return res.send('no book exists')
        }
        res.json({ _id: book._id, title: book.title, comments: book.comments })
      } catch (err) {
        console.log(err)
      }
    })
    //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}


    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });

};
