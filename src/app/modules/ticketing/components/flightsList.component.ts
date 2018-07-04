import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FlightsService } from '../services/flights.service';
import { TicketingService } from '../services/ticketing.service';
import { Flights } from '../../../core/interfaces/flights';
import { Flight } from '../../../core/models/Flight';
import { RETURN_FLIGHT_FORM } from '../../../core/constants/returnFlightForm';
import { TicketOrder } from '../../../core/interfaces/ticketOrder';
import { SelectedFlightDetails } from '../../../core/models/selectedFlightDetails';
import { SelectedFlight } from '../../../core/interfaces/selectedFlight';

import { DEPARTURE_DATE_TYPES } from '../../../core/constants/departureDateTypes';
import { FLIGHT_TYPES } from '../../../core/constants/flightTypes';

@Component({
    selector: 'flights',
    templateUrl: 'flightsList.component.html'
})

export class FlightsList implements OnInit, OnDestroy {
    private availableTicketsSubscription: Subscription;
    flights: Flights;
    selectedDeparture: Flight;
    selectedReturn: Flight;
    isSubmitted: boolean = false;
    returnFlightForm: FormGroup;
    formConfig = [...RETURN_FLIGHT_FORM];
    ticketOrderSummary: TicketOrder;
    private orderConfirmSubscription: Subscription;

    constructor(private flightsService: FlightsService, private ticketingService: TicketingService, private fb: FormBuilder) { }

    ngOnInit() {
        this.availableTicketsSubscription = this.flightsService.ticketsObservable.subscribe((flights) => {
            this.resetState();
            this.flights = flights;
            if (flights.returnFlights.length === 0) {
                this.returnFlightForm = this.createGroup();
            }
        })

        this.orderConfirmSubscription = this.flightsService.orderSubmitObservable.subscribe(x => {
            this.resetState();
        })
    }

    createGroup(): FormGroup {
        const group = this.fb.group({});
        const formControls = this.formConfig.filter(config => config.type !== 'button');
        formControls.forEach(control => group.addControl(control.controlName, this.fb.control('')));
        return group;
    }

    ticketSelectionHandler(flight: SelectedFlight) {
        const key: string = flight.type === FLIGHT_TYPES.DEPARTURE_FLIGHTS ? FLIGHT_TYPES.SELECTED_DEPARTURE : FLIGHT_TYPES.SELECTED_RETURN;
        this[key] = this.flights[flight.type].find((x: Flight) => x.flightNumber === flight.flightNumber);
        this[key].remainingTickets--;
        this.setOrderSummary(flight);
    }

    searchForReturnFlight(formValues: any) {
        this.isSubmitted = true;
        this.ticketingService.searchForOneWayFlight(this.flights.destinationIata, this.flights.originIata, formValues.return).subscribe(response => {
            this.flights.returnFlights = response;
            this.flightsService.sendReturnDate(formValues.return);
        });
    }

    getOrigin(flightType: string): string {
        return flightType === FLIGHT_TYPES.DEPARTURE_FLIGHTS ? this.flights.origin : this.flights.destination;
    }

    getDestination(flightType: string): string {
        return flightType === FLIGHT_TYPES.DEPARTURE_FLIGHTS ? this.flights.destination : this.flights.origin;
    }

    getDepartureDate(type: string, flightNumber: string, key: string): string {
        return this.flights[type].find((flight: Flight) => flight.flightNumber === flightNumber)[key];
    }

    getPrice(type: string, farePrice: number): number {
        return (this.ticketOrderSummary[type].orderedTickets + 1) * farePrice;
    }

    setOrderSummary(flight: SelectedFlight) {
        const type: string = flight.type === FLIGHT_TYPES.DEPARTURE_FLIGHTS ? FLIGHT_TYPES.DEPARTURE_FLIGHT : FLIGHT_TYPES.RETURN_FLIGHT;

        this.ticketOrderSummary[type] = {
            origin: this.getOrigin(flight.type),
            destination: this.getDestination(flight.type),
            departureDate: this.getDepartureDate(flight.type, flight.flightNumber, DEPARTURE_DATE_TYPES.DEPARTURE),
            arrivalDate: this.getDepartureDate(flight.type, flight.flightNumber, DEPARTURE_DATE_TYPES.ARRIVAL),
            orderedTickets: this.ticketOrderSummary[type].orderedTickets + 1,
            bundle: flight.fare.bundle,
            price: this.getPrice(type, flight.fare.price)
        }
    }

    resetState() {
        this.selectedDeparture = undefined;
        this.selectedReturn = undefined;
        this.flights = undefined;
        this.ticketOrderSummary = { departureFlight: new SelectedFlightDetails(), returnFlight: new SelectedFlightDetails() };
        this.isSubmitted = false;
    }

    submitSummary() {
        const ticketSummary = { ...this.ticketOrderSummary };
        this.flightsService.sendSummary(ticketSummary);
    }

    isContinueEnabled() {
        return this.ticketOrderSummary && this.ticketOrderSummary.departureFlight.price > 0;
    }

    ngOnDestroy() {
        this.availableTicketsSubscription.unsubscribe();
        this.orderConfirmSubscription.unsubscribe();
    }
}