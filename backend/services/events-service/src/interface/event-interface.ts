import mongoose from 'mongoose';

export interface EventAttributes { // Interface for the event attributes
    name: string;
    summary: string;
    description: string;
    startAt: Date;
    slug: string;
    createdAt: Date;
    changedAt: Date;
    endsAt: Date;    
    event_url: string;
    isOnline: boolean
    format: string;
    hasSeating: boolean;
    image: string;
    capacity: number;
    salesStatus: string;
    isSoldOut: boolean;
    reservedSeating: boolean;
    eventStatus: string;
    likes: any[];
    bookmarks: any[]
    followers: any[]

    organiser: mongoose.Schema.Types.ObjectId; // Organiser ID (User) of the specific event
    venue: mongoose.Schema.Types.ObjectId; // Venue ID of the specific Event
    tickets: mongoose.Schema.Types.ObjectId; // The Ticket ID of the specific Event
    category: mongoose.Schema.Types.ObjectId; // Category ID of the Specifid Event
}

export interface EventDocument extends mongoose.Model<EventAttributes> {
    name: string;
    summary: string;
    description: string;
    startAt: Date;
    slug: string;
    endsAt: Date;
    createdAt: Date;
    image: string;
    changedAt: Date;
    format: string
    isOnline: boolean;
    capacity: number;
    event_url: string;
    reservedSeating: boolean;
    isSoldOut: boolean;
    hasSeating: boolean;
    salesStatus: string;
    eventStatus: string;
    likes: any[];
    bookmarks: []
    followers: any[]

    organiser: mongoose.Schema.Types.ObjectId; // Event organiser (User ID)
    venue: mongoose.Schema.Types.ObjectId; // The venue for which an event belongs to
    tickets: mongoose.Schema.Types.ObjectId; // Ticket corresponding to an event
    category: mongoose.Schema.Types.ObjectId;
}
