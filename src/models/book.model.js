import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    ISBN: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    },
    title: {
        type: String,
        required:true,
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    yearPublication: {
        type: Number,
        required: true,
    },
    copies: {
        type: Number,
        required: true,
    },
    category: {
        type: Number,
        required: true,
    },
    donation: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
      },
});

export default mongoose.model("Books", bookSchema);