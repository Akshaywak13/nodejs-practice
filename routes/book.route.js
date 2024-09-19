const express = require('express');
const router = express.Router();
const bookService = require('../service/book.service');

router.post('/create', async (req, res)=>{
    try {
      const book = await bookService.createBook(req.body);
      return res.status(200).send({message:"Book Created Successfully",book});
    } catch (error) {
        res.status(500).send({message:"Internal server error",error});
    }
});

router.get('/getById/:bookId', async (req,res) =>{
    const data = req.params.bookId
    try {
        const bookById = await bookService.getBookById(parseInt(data));
        if(!bookById){
            return res.status(404).send({message: "Book not found"});
        }
        res.status(200).send({message: "Book Found Scuccessfull",bookById});
    } catch (error) {
        res.send({message:"Internal Server Eror"});
    }
});

router.get('/getAllBooks', async (req, res)=>{
    const book = req.params
    try {
        const books = await bookService.getAllBooks(book);
        res.status(200).send({message: "All Books Found Successfully", books});
    } catch (error) {
        res.send({message: "Internal Server Error", error});
    }
});

router.put('/update/:bookId', async ( req, res )=> {
    const bookId = parseInt(req.params.bookId);
    const data =  req.body;
    try {
        const updateBooks = await bookService.updateBook( bookId, data);
        if(!updateBooks){
            return res.status(404).send({message: "Book not found"});
        }
        res.status(200).json({message: " Book updated successfully",updateBooks});
    } catch (error) {
        res.status(500).send({message: "Internal server errro", error});
    }
});

router.delete('/delete/:bookId', async (req, res)=>{
    const book = parseInt(req.params.bookId);
    try {
        const bookId = await bookService.deleteBook(book)
        if(!bookId){
            return res.status(404).send({message: "Book not found",bookId});
        }
        res.send({message: "Book deleted successfully",bookId});
    } catch (error) {
        res.status(500).send({message: "Internal server error", error});
    }
});


module.exports = router;