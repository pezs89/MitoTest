import { Flight } from "./Flight";

export interface Flights {
    departureFlights: Flight[];
    returnFlights: Flight[];
}