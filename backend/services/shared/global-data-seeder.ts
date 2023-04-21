require('dotenv').config();
import { User } from '../authentication/src/models/user-model'
import {Event} from  '../events-service/src/models/event-model'
import {Ticket} from '../tickets/src/models/ticket-model';
import {Venue} from '../venues/src/models/venue-model'
import { Booking } from '../booking-service/src/model/booking-model';

import {connectAuthSchema} from  '../authentication/src/database/auth-schema'
import connectEventsDatabase from '../events-service/src/database/event-schema'
import {connectTicketsSchema} from '../tickets/src/database/tickets-db'
import { connectVenuesSchema } from '../venues/src/database/venues-db';
import { connectBookingSchema } from './../booking-service/src/database/booking-schema';

const users = require( '../authentication/src/data/users.json')
const events = require('../events-service/src/data/events.json');
const tickets = require('../tickets/src/data/tickets.json');
const venues = require('../venues/src/data/venues.json');
const bookings = require('../booking-service/src/data/bookings.json');

connectAuthSchema();
connectEventsDatabase();
connectTicketsSchema();
connectVenuesSchema();
connectBookingSchema();

export const loadAllData = async (): Promise<any> => { // Load the data into the database
    
        try {

            await User.deleteMany();
            await Event.deleteMany();
            await Ticket.deleteMany();
            await Venue.deleteMany();

            await User.create(users);
            await Event.create(events);
            await Booking.create(bookings);

            await Ticket.create(tickets);
            await Venue.create(venues);

            console.log(`All service Data imported successfully.`);
            return process.exit(1);

    } 
    
    catch(err: any) {

        if(err) {
            return console.error(err )
        }
    }


}

export const removeAllData = async (): Promise<any> => {

    try {

        await User.remove();
        await Event.remove();
        await Ticket.remove();
        await Venue.remove();

        console.log(`All the services data removed from the schemas.`);

        return process.exit(1);
    } 
    
    catch(err: any) {
        
        if(err) {
            return console.log(err);
        }

    }


}

// Handle command line args for --import and --delete
if(process.argv[2] === '--import') {
   loadAllData();
}

if(process.argv[2] === '--delete') {
   removeAllData();
}