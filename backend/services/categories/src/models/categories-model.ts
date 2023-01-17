import mongoose from 'mongoose';
interface CategoryAttributes {
    name: string;
    icon: string;
    categoryType: string;
}
interface CategoryDocument extends mongoose.Model<CategoryAttributes> {
    name: string;
    icon: string;
    categoryType: string;
}

const CategorySchema = new mongoose.Schema<CategoryDocument>({

    name: {
        type: String,
        required: [true, "Please specify the name of the category you want to create"],
        default: ''
    },

    icon: {
        type: String,
        default: ''
    },

    categoryType: {
        type: String,
        required: [true, "Please specify the category type"],
        default: ''
    }

}, {timestamps: true})

const Category = mongoose.model<CategoryDocument>("Category", CategorySchema);
export {Category}