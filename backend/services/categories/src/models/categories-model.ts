import mongoose from 'mongoose';
interface CategoryAttributes {
    icon: string;
    categoryType: string;
    isTrending: boolean;
    isNew: boolean;
    event: mongoose.Schema.Types.ObjectId
}
interface CategoryDocument extends mongoose.Model<CategoryAttributes> {
    icon: string;
    categoryType: string;
    isTrending: boolean;
    isNew: boolean;

    event: mongoose.Schema.Types.ObjectId
}

const CategorySchema = new mongoose.Schema<CategoryDocument>({

    icon: { // Icon for the category
        type: String,
        default: ''
    },

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