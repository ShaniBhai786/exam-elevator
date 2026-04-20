import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        index: true,
        lowerCase: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        index: true,
        lowerCase: true,
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    userRole: {
        type: String,
        enum: ["teacher", "student", "admin"]
    },
    CNIC:{
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    Contact:{
        type: Number,
        required: true,
        trim: true,
        index: true,
    },
    Profile:{
        type: String,
        // required: true,
    },
    subscription:{
        type: String,
        enum: ["Verified", "Trail"],
        required: true
    }


},{timestamps: true})

export const Users = mongoose.model("Users", userSchema)