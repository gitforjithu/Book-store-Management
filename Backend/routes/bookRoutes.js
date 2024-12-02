import express from 'express';
import { Book } from '../models/bookModels.js';
import mongoose from 'mongoose';

const router = express.Router();

//Route to save a new book
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear 
        ) {
            return res.status(400).send({
                message: 'Send all required fields'
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);

        return res.status(200).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
});

//Route to Get All Books from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count : books.length,
            data : books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
});

//Route to Get one Book from database by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
    
         // Check if the ID is valid
         if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Book ID' });
        }

        const book = await Book.findById(id);

        return res.status(200).json({ book });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
});

//Route to Update a Book
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear 
        ) {
            return res.status(400).send({
                message: 'Send all required fields'
            });
        }

        const { id } = req.params;

         // Check if the ID is valid
         if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Book ID' });
        }

        const result = await Book.findByIdAndUpdate(id, req.body);

        //If book not found return 404
        if (!result) {
            return res.status(404).json({ message : ' Book not found'});
        }
        return res.status(200).send({ message: 'Book updated successfully'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
})

//Route to delete a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message : "Invalid book ID" });
        }

        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).json({ message : "Book not found"});
        }
        return res.status(200).send({ message : "Book deleted successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
});

export default router;