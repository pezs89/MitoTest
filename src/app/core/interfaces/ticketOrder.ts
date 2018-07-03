import { SelectedFlightDetails } from "../models/selectedFlightDetails";

export interface TicketOrder {
    departureFlight: SelectedFlightDetails;
    returnFlight: SelectedFlightDetails;
}