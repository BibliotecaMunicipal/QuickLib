import mongoose from "mongoose";

const categorysSchema = new mongoose.Schema({
    Category: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    },
    nameCategory: {
        type: String,
        required: true,
    }
})

export default mongoose.model("Categorys", categorysSchema)