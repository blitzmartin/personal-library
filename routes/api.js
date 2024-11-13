/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';
const { Book } = require('../models/models');
module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      try {
        const data = await Book.find()
        const books = data.map(b => ({ _id: b._id, title: b.title, commentcount: b.commentcount ?? 0 }))
        res.json(books)
        //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]}
      } catch (err) {
        console.error("Error retrieving books:\n", err);
      }
    })

    .post(async (req, res) => {
      let title = req.body.title;
      try {
        if (!title) {
          return res.json({ error: "missing required field title" })
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
    .get(function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

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
