import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        subject: {
            type: String,
            required: true,
            trim: true,
        },

        noSQs: {
            type: Number,
            required: true,
            min: 0,
        },

        noLQs: {
            type: Number,
            required: true,
            min: 0,
        },

        shortMarks: {
            type: Number,
            required: true,
            min: 0,
        },

        longMarks: {
            type: Number,
            required: true,
            min: 0,
        },

        year: {
            type: String,
            required: true,
            trim: true,
        },

        semester: {
            type: String,
            required: true,
            trim: true,
        },

        term: {
            type: String,
            required: true,
            trim: true,
            enum: ["Mid", "Final"],
        },

        shortQuestions: {
            type: Array,
            default: [],
        },

        longQuestions: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export const Paper =
    mongoose.models.Paper || mongoose.model("Paper", paperSchema);