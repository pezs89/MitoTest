import { Flight } from "../models/Flight";

export interface Flights {
    departureFlights: Flight[];
    returnFlights: Flight[];
    origin: string;
    originIata: string;
    destination: string;
    destinationIata: string;
    departure: Date;
    return?: Date;
}