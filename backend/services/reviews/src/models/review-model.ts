import mongoose from "mongoose";

interface IReviewAttributes {
    title: string;
    text: string;
    rating: Number;
    createdAt: Date;
    event: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
}

interface IReviewDocument extends mongoose.Model<IReviewAttributes> {
    title: string;
    text: string;
    rating: Number;
    createdAt: Date;
    event: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
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
      },

      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bootcamp',
        required: true
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }

})

const Review = mongoose.model<IReviewDocument>("Review", ReviewSchema);
export {Review}