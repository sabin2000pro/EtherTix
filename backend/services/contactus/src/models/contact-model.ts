import mongoose from "mongoose";

interface IContactAttributes {
    reason: string;
    description: string;
}

interface IContactDocument extends mongoose.Model<IContactAttributes> {
    reason: string;
    description: string;
}

const ContactSchema = new mongoose.Schema<IContactDocument>({

    reason: {
        type: String,
        required: [true, "Please specify the reason for contact"]
    },

    description: {
        type: String,
        required: [true, "Please specify the description for contact"]
    }
    
}, {timestamps: true, toJSON: {virtuals: true} })

const Contact = mongoose.model<IContactDocument>("Contact", ContactSchema);
export {Contact}