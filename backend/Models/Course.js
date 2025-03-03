import mongoose from "mongoose";

let CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    poster:{
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

export default mongoose.model('Course', CourseSchema);