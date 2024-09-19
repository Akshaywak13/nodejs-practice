const BookModel = require('../schema/book.schema');

// Utility function to generate a unique numeric ID
async function generateUniqueId(){
    const lastBook = await BookModel.findOne().sort({ bookId: -1});
    return lastBook ? lastBook.bookId + 1 : 10001;   // start with 10000 if no book exists
}

class BookService {

    async createBook(data){
        try {
            const bookId = await generateUniqueId();
            const newBook = new BookModel({
                bookId,
                title: data.title,
                author: data.author,
                description: data.description,
            });
            return await newBook.save();
        } catch (error) {
            console.error("Error in createBook:",error);
            throw error;
        }
    }

    async getBookById(bookId) {
        try {
            const bookData = await BookModel.findOne({ bookId: bookId });
            return bookData;
        } catch (error) {
            console.log("Error in getBookById", error);
            throw error;
        }
    }
    
    async getAllBooks (){
        try {
            const bookData =  await BookModel.find();
            return bookData; 
        } catch (error) {
            console.eror ("Error in getAllBooks", error);
        }
    }

    async updateBook(bookId, data){
        try {
            return  await BookModel.findOneAndUpdate( {bookId:bookId}, {$set:data}, {new : true});
        } catch (error) {
            console.eror ("Error in getAllBooks", error);
        }
    }

    async deleteBook(bookId){
        try {
            const bookData = await BookModel.findOneAndDelete({bookId:bookId});
            return bookData;
        } catch (error) {
            console.error("Error in deleteBook", error);
        }
    }
}

module.exports = new BookService();