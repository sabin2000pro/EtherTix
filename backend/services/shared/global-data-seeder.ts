require('dotenv').config();
import { User } from '../authentication/src/models/user-model'
import {Event} from  '../events/src/models/event-model'
import {Ticket} from '../tickets/src/models/ticket-model';
import {Venue} from '../venues/src/models/venue-model'

import {connectAuthSchema} from  '../authentication/src/database/auth-schema'
import connectEventsDatabase from '../events/src/database/event-db'
import {connectTicketsSchema} from '../tickets/src/database/tickets-db'
import { connectVenuesSchema } from '../venues/src/database/venues-db';

const users = require( '../authentication/src/data/users.json')
const events = require('../events/src/data/events.json');
const tickets = require('../tickets/src/data/tickets.json');
const venues = require('../venues/src/data/venues.json');

connectAuthSchema();
connectEventsDatabase();
connectTicketsSchema();
connectVenuesSchema();

export const loadAllData = async (): Promise<any> => {
    
        try {

            await User.deleteMany();
            await Event.deleteMany();
            await Ticket.deleteMany();
            await Venue.deleteMany();

            await User.create(users);
            await Event.create(events);

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