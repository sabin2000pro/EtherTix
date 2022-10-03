import mongoose from "mongoose";

interface IContactAttributes {
    reason: string;
    description: string;
}

interface IContactDocument extends mongoose.Model<IContactDocument> {

}

const ContactSchema = new mongoose.Schema<IContactDocument>({

})

const Contact = mongoose.model<IContactDocument>("Contact", ContactSchema);
export {Contact}