import mongoose from 'mongoose';

export interface CategoryAttributes {
    categoryType: string;
    isTrending: boolean;
    isNew: boolean;
    event: mongoose.Schema.Types.ObjectId
}

export interface CategoryDocument extends mongoose.Model<CategoryAttributes> {
    categoryType: string;
    isTrending: boolean;
    isNew: boolean;

    event: mongoose.Schema.Types.ObjectId
}
