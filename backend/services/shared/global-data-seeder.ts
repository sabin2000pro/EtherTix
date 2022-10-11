import { User } from '../authentication/src/models/user-model';
import {Event} from '../events/src/models/event-model';
import {Ticket} from '../tickets/src/models/ticket-model';
import {Venue} from '../venues/src/models/venue-model';
import connectAuthDatabase from '../authentication/src/database/auth-db';
import connectEventsDatabase from '../events/src/database/event-db';
import connectTicketsDatabase from '../tickets/src/database/tickets-db';
import connectVenuesDatabase from '../venues/src/database/venues-db';
import fs from "fs";
import path from 'path';

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../authentication/src/data/users.json')).toString()) as unknown as string;
const events = JSON.parse(fs.readFileSync(path.join(__dirname, '../events/src/data/events.json')).toString()) as unknown as string;
const tickets = JSON.parse(fs.readFileSync(path.join(__dirname, '../tickets/src/data/tickets.json')).toString()) as unknown as string;
const venues = JSON.parse(fs.readFileSync(path.join(__dirname, '../venues/src/data/venues.json')).toString()) as unknown as string;

const connectServicesToDb = () => {
    connectAuthDatabase();
    connectEventsDatabase();
    connectTicketsDatabase();
    connectVenuesDatabase();
}

connectServicesToDb();

export const loadAllData = async (): Promise<any> => {
    let dataImported = false;

    try {

        if(users !== null && events !== null && tickets != null && venues != null) {

            await User.create(users);
            await Event.create(events);
            await Ticket.create(tickets);
            await Venue.create(venues);

            dataImported = (!dataImported) as boolean;

            if(dataImported) {
                console.log(`Data imported to the database.`);

                return process.exit(1);
            }
        
        }

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

// Handle command line args
if(process.argv[2] === '--import') {
   loadAllData();
}

if(process.argv[2] === '--delete') {
   removeAllData();
}