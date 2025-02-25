import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://chisellabs.com/glossary/wp-content/uploads/2023/05/962b45f9-e2a6-4f59-8f0a-9e1e1a1d1f7f.png'
    },
    age:{
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
   
});

export default mongoose.model('User', UserSchema);