// models/ReturnedBooks.js

import mongoose from 'mongoose';

const LossBooksSchema = new mongoose.Schema({
    idLoan: {
        type: Number,
        required: true,
        unique: true,
    },
    ISBN: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    returnDate: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('LossBooks', LossBooksSchema);

