import { Flight } from "./Flight";

export interface Flights {
    departureFlights: Flight[];
    returnFlights: Flight[];
    origin: string;
    destination: string;
    departure: Date;
    return?: Date;

}