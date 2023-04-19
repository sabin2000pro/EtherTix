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

      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: [true, "Please specify the Event ID that this review is for"]
      },

      createdAt: {
        type: Date,
        default: Date.now
      }

})

const Review = mongoose.model<IReviewDocument>("Review", ReviewSchema);
export {Review}