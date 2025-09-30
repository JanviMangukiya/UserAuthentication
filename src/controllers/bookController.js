const Book = require('../../../User_Authentication/src/models/bookModel');

const createBook = async (req, res) => {
    try {
        const newBook = await Book.create({
            title: req.body.title,
            author: req.body.author
        });
        res.json(newBook);
        
    } catch (error) {
        res.json(error);
    }
}

const allBook = async (req, res) => {
    try {
        const limit = parseInt(req?.query?.limit || 5);
        const skip = parseInt(req?.query?.skip || 0);

        let filter = {};
        let sortBook = {};

        const sortField = req.query.sortField;
        let sortOrder = parseInt(req?.query?.sortOrder || 1);

        if (req.query.title && req.query.author) {
            filter = {
                $or: [
                    { 
                        title: 
                        { 
                            $regex: req.query.title, 
                            $options: "i" 
                        } 
                    },
                    { 
                        author: 
                        {
                             $regex: req.query.author, 
                             $options: "i" 
                        } 
                    }
                ]
            }
        } else if (req.query.title) {
            filter = { 
                title: 
                {
                    $regex: req.query.title, 
                    $options: "i" 
                }
            };
        } else if (req.query.author) {
            filter = { 
                author: 
                {
                    $regex: req.query.author, 
                    $options: "i" 
                } 
            };
        }
        sortBook[sortField] = sortOrder;

        const books = await Book.find(filter).skip(skip).limit(limit).sort(sortBook);
        res.json(books);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getId = async(req, res) => {
    try {
        const books = await Book.findById(req.params.id);
        if(!books) {
            return res.json({message: "Book is not Found..."});
        }
        res.json(books);
    } catch (error) {
        res.json(error);
    }
}

const updateBook = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, author } = req.body;
        const books = await Book.findByIdAndUpdate(id, { title, author });
        if(!books) {
            return res.json({message: "Book not Found or Updating..."});
        }
        res.json(books);
    } catch (error) {
        res.json(error);
    }
}

const deleteBook = async(req, res) => {
    try {
        const books = await Book.findByIdAndDelete(req.params.id);
        if(!books) {
            return res.json({message: "Book not Found or Deleted..."});
        } res.json({message: "Book Deleted Successfully ..."});
    } catch (error) {
        res.json(error);
    }
    
}

module.exports = { createBook, allBook, getId, updateBook, deleteBook };