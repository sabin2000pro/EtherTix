import mongoose from 'mongoose';
interface CategoryAttributes {
    name: string;
    icon: string;
    categoryType: string;
    isTrending: boolean;
    isNew: boolean;
    event: mongoose.Schema.Types.ObjectId
}
interface CategoryDocument extends mongoose.Model<CategoryAttributes> {
    name: string;
    icon: string;
    categoryType: string;
    isTrending: boolean;
    isNew: boolean;

    event: mongoose.Schema.Types.ObjectId
}

const CategorySchema = new mongoose.Schema<CategoryDocument>({

    name: {
        type: String,
        required: [true, "Please specify the name of the category you want to create"],
        default: ''
    },

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

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    }

}, {timestamps: true})

const Category = mongoose.model<CategoryDocument>("Category", CategorySchema);
export {Category}