import mongoose from "mongoose";

interface EventAttributes {

}

interface EventDocument extends mongoose.Model<EventAttributes> {

}

const EventSchema = new mongoose.Schema<EventDocument>({

}) 

export default EventSchema;