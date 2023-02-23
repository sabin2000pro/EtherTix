import { User } from '../authentication/src/models/user-model';
import {Event} from '../events/src/models/event-model';
import {Ticket} from '../tickets/src/models/ticket-model';
import {Review} from '../reviews/src/models/review-model';
import {Venue} from '../venues/src/models/venue-model';
import {EmailVerification} from '../authentication/src/models/email-verification-model';

import {connectAuthSchema} from '../authentication/src/database/auth-schema';
import connectEventsDatabase from '../events/src/database/event-db';
import {connectTicketsSchema} from '../tickets/src/database/tickets-db';

import users from '../authentication/src/data/users.json';
import events from '../events/src/data/events.json';
import tickets from '../tickets/src/data/tickets.json';
import venues from '../venues/src/data/venues.json';
import reviews from '../reviews/src/data/reviews.json';

const connectServicesToDb = () => {
    connectAuthSchema();
    connectEventsDatabase();
}

connectServicesToDb()

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
            await Review.create(reviews);

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

    let dataRemoved = false;

    try {

        await User.remove();
        await Event.remove();
        await Ticket.remove();
        await Venue.remove();
        await EmailVerification.remove();

        dataRemoved = (!dataRemoved) as boolean;

        console.log(`Data removed from the database.`);

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