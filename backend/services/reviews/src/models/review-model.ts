import mongoose from "mongoose";

interface IReviewAttributes {
    title: string;
    rating: number;
    text: string;
    createdAt: Date;
}

interface IReviewDocument extends mongoose.Model<IReviewAttributes> {
    title: string;
    rating: number;
    text: string;
    createdAt: Date;
}

// @description: Review Schema for an event
const ReviewSchema = new mongoose.Schema<IReviewDocument>({

    title: { // Title of the Review
        type: String,
        trim: true,
        required: [true, 'Please add a title for the review'],
        maxlength: 100
      },

      text: { // Text Review
        type: String,
        required: [true, 'Please add some text']
      },

      rating: { // Rating for the review
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating for the event between 1 and 10']
      },

      createdAt: {
        type: Date,
        default: Date.now
      }

})

const Review = mongoose.model<IReviewDocument>("Review", ReviewSchema);
export {Review}