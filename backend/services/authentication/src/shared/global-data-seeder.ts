import { User } from '../../src/models/user-model';
import connectAuthDatabase from '../database/auth-db';
import fs from "fs";
import path from 'path';

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')).toString()) as unknown as string;

connectAuthDatabase();

const loadUserData = async (): Promise<any> => {

    try {

        await User.create(users);
        console.log(`User data imported to DB`);

        return process.exit(1);
    } 
    
    catch(err: any) {
        if(err) {
            return console.error(err )
        }
    }


}

const removeUserData = async (): Promise<any> => {
    try {
        await User.remove();
        console.log(`All user data removed`);

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
    loadUserData();
}

if(process.argv[2] === '--delete') {
    removeUserData();
}