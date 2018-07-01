import { Fare } from './fare';

export class Flight {
    carrierCode: string;
    arrival: Date;
    departure: Date;
    flightNumber: string;
    remainingTickets: number;
    fares: Fare[];
}