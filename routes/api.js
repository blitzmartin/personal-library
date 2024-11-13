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
      try {//response will be array of book objects
        const books = await Book.find()
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
          title
        })
        const newBook = await book.save()
        res.json(newBook)
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
