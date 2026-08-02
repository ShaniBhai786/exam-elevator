import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
    {
        // Owner of the paper
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        // Paper Information
        subject: {
            type: String,
            required: true,
            trim: true,
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
            enum: ["Mid", "Final"],
            required: true,
            trim: true,
        },

        // Questions
        shortQuestions: {
            type: [String],
            default: [],
        },

        longQuestions: {
            type: [String],
            default: [],
        },

        // Marks Information
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

        totalMarks: {
            type: Number,
            default: function () {
                return (
                    this.noSQs * this.shortMarks +
                    this.noLQs * this.longMarks
                );
            },
        },

        // Users with whom this paper is shared
        sharedWith: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
            default: [],
            index: true,
        },

        // Future Features
        isArchived: {
            type: Boolean,
            default: false,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index for faster filtering
paperSchema.index({
    userId: 1,
    subject: 1,
    semester: 1,
    year: 1,
});

export const Paper =
    mongoose.models.Paper ||
    mongoose.model("Paper", paperSchema);