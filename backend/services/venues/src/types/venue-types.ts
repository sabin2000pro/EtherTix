import mongoose from 'mongoose';

export interface IVenueAttributes {
    name: string;
    slug: string;
    venueCapacity: number;
    phone: string;
    ageRestriction: string;
    openTime: Date,
    closeTime: Date,
    hasPublicAccess: boolean;
    smokingAllowed: boolean;
    photo: string;
    createdAt: Date;
    website: string;
    location: Object;
    address: string
    email: string
    organiser: mongoose.Schema.Types.ObjectId // Organiser -> Venue Relationship
    event: mongoose.Schema.Types.ObjectId
    ticket: mongoose.Schema.Types.ObjectId
}

export interface IVenueDocument extends mongoose.Model<IVenueAttributes> {
    name: string;
    slug: string;
    venue: Object;
    phone: string;
    website: string;
    openTime: Date;
    email: string;
    closeTime: Date;
    hasPublicAccess: boolean;
    smokingAllowed: boolean;
    photo: string;
    createdAt: Date;

    venueCapacity: number;
    ageRestriction: string;
    address: string;
    location: Object;
    organiser: mongoose.Schema.Types.ObjectId
    event: mongoose.Schema.Types.ObjectId
    ticket: mongoose.Schema.Types.ObjectId
}