import mongoose from 'mongoose';
import { CategoryDocument } from '../interface/categories-interface';

const CategorySchema = new mongoose.Schema<CategoryDocument>({

    categoryType: {
        type: String,
        required: [true, "Please specify the category type"],
        default: ''
    },

    isTrending: {
        type: Boolean,
        default: false,
        required: [true, "Please specify whether the category is trending or not"]
    },

    isNew: {
        type: Boolean,
        default: false,
        required: [true, "Please specify whether or not the category is newly created or not"]
    },

    event: { // Category -> Event Relationship
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: [true, "Please specify the event that this category belongs to"]
    }

}, {timestamps: true})

const Category = mongoose.model<CategoryDocument>("Category", CategorySchema);
export {Category}