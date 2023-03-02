require('dotenv').config();
import NodeGeocoder from 'node-geocoder'

interface GeocoderInterface {
    provider: string;
    apiKey: string;
}

export const geocoder = NodeGeocoder({
    provider: "mapquest",
    apiKey: process.env.MAPQUEST_API_KEY
})