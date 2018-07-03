import { Fare } from "../models/fare";

export interface SelectedFlight {
    type: string;
    flightNumber: string;
    fare: Fare;
}