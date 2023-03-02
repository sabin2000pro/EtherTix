require('dotenv').config();
import NodeGeocoder from 'node-geocoder'

export const geocoder = NodeGeocoder({
    provider: "mapquest",
    apiKey: process.env.MAPQUEST_API_KEY
})