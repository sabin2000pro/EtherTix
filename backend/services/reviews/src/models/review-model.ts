import mongoose from "mongoose";

interface IReviewAttributes {
    event: mongoose.Schema.Types.ObjectId;
    title: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

interface IReviewDocument extends mongoose.Model<IReviewAttributes> {
  event: mongoose.Schema.Types.ObjectId;
    title: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

// @description: Review Schema for an event
const ReviewSchema = new mongoose.Schema<IReviewDocument>({

     event: {
      type: String,
      ref: 'Event',
      required: [true, "Please specify the event ID that you want to create a review for"]
     },

      comment: { // Text Review
        type: String,
        required: [true, 'Please provide a comment for this review']
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