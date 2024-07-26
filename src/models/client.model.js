import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email:{
        type: String,
        required:true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        required: String,
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
    status: {
        type: Boolean,
        default: true,
    },
    age: {
        type: Number,
        required: true,
    },
    verify: {
        type:Boolean,
        default: false,
    }
});

export default mongoose.model("Client", clientSchema);