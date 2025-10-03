const Book = require('../../../User_Authentication/src/models/bookModel');
const { successHandle, errorHandle } = require('../helper/helper');


const createBook = async (req, res) => {
    try {
        const newBook = await Book.create({
            title: req.body.title,
            author: req.body.author
        });
        return successHandle('', res, "New Book Add Successfully", 201, newBook);   
    } catch (error) {
        return errorHandle('', res, "Book Not Added", 404, error.message);
    }
}

const allBook = async (req, res) => {
    try {
        const limit = parseInt(req?.query?.limit || 5);
        const skip = parseInt(req?.query?.skip || 0);

        let filter = {};
        let sortBook = {};
        const { title, author, sortField, sortOrder } = req.query;

        if (title && author) {
            filter.$or = [
                { title: { $regex: title, $options: "i" }}, 
                { author: { $regex: author, $options: "i" }}
            ]
        } 
        else if (title) {
            filter = { title: { $regex: title, $options: "i" }};
        } 
        else if (author) {
            filter = { author: { $regex: author, $options: "i" }};
        }

        sortBook[sortField] = parseInt(sortOrder || 1);

        try {
            const books = await Book.find(filter).skip(skip).limit(limit).sort(sortBook);
            return successHandle('', res, "Books Fetched Successfully", 200, books);
        } catch (error) {
            return errorHandle('', res, "Book Not Found", 404, error.message);
        }
    } catch (error) {
        return errorHandle('', res, "Error Fetching Books", 500, error.message);
    }
}

const getId = async(req, res) => {
    try {
        const books = await Book.findById(req.params.id);
        if(!books) {
            return errorHandle('', res, "Book is not Found", 404, error.message);
        }
        return successHandle('', res, "Book Found Successfully", 200, books);
    } catch (error) {
        return errorHandle('', res, "Error Retrieving Book", 500, error.message);
    }
}

const updateBook = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, author } = req.body;
        try {
            const books = await Book.findByIdAndUpdate(id, { title, author });
            if(!books) {
                return errorHandle('', res, "Book not Found or Updating", 404, error.message);
            }
            return successHandle('', res, "Book Updated Successfully", 200, books);
        } catch (error) {
            return errorHandle('', res, "Book Not Found", 404, error.message);
        }
    } catch (error) {
        return errorHandle('', res, "Error in Updating Book", 500, error.message);
    }
}

const deleteBook = async(req, res) => {
    try {
        const { id } = req.params;
        try {
            const books = await Book.findByIdAndDelete(id);
            if(!books) {
                return errorHandle('', res, "Book not Found or Deleted", 404, error.message);
            }
            return successHandle('', res, "Book Deleted Successfully", 200, books);      
        } catch (error) {
            return errorHandle('', res, "Book Not Found", 404, error.message);
        }
    } catch (error) {
        return errorHandle('', res, "Error in Deleting Book", 500, error.message);
    }    
}

module.exports = { createBook, allBook, getId, updateBook, deleteBook };