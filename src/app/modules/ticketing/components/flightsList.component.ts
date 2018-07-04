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

    constructor(private flightsService: FlightsService, private ticketingService: TicketingService, private fb: FormBuilder) { }

    ngOnInit() {
        this.availableTicketsSubscription = this.flightsService.ticketsObservable.subscribe((flights) => {
            this.flights = flights;
            this.resetState();
            if (flights.returnFlights.length === 0) {
                this.returnFlightForm = this.createGroup();
            }
        })
    }

    createGroup(): FormGroup {
        const group = this.fb.group({});
        const formControls = this.formConfig.filter(config => config.type !== 'button');
        formControls.forEach(control => group.addControl(control.controlName, this.fb.control('')));
        return group;
    }

    ticketSelectionHandler(flight: SelectedFlight) {
        const key: string = flight.type === 'departureFlights' ? 'selectedDeparture' : 'selectedReturn';
        this[key] = this.flights[flight.type].find((x: Flight) => x.flightNumber === flight.flightNumber);
        this[key].remainingTickets--;
        this.setOrderSummary(flight);
    }

    searchForReturnFlight(formValues: any) {
        this.isSubmitted = true;
        this.ticketingService.searchForOneWayFlight(this.flights.destinationIata, this.flights.originIata, formValues.return).subscribe(response => {
            this.flights.returnFlights = response;
        });
    }

    getOrigin(flightType: string): string {
        return flightType === 'departureFlights' ? this.flights.origin : this.flights.destination;
    }

    getDestination(flightType: string): string {
        return flightType === 'departureFlights' ? this.flights.destination : this.flights.origin;
    }

    getDepartureDate(type: string, flightNumber: string, key: string): string {
        return this.flights[type].find((flight: Flight) => flight.flightNumber === flightNumber)[key];
    }

    getPrice(type: string, farePrice: number): number {
        return (this.ticketOrderSummary[type].orderedTickets + 1) * farePrice;
    }

    setOrderSummary(flight: SelectedFlight) {
        const type: string = flight.type === 'departureFlights' ? 'departureFlight' : 'returnFlight';

        this.ticketOrderSummary[type] = {
            origin: this.getOrigin(flight.type),
            destination: this.getDestination(flight.type),
            departureDate: this.getDepartureDate(flight.type, flight.flightNumber, 'departure'),
            arrivalDate: this.getDepartureDate(flight.type, flight.flightNumber, 'arrival'),
            orderedTickets: this.ticketOrderSummary[type].orderedTickets + 1,
            bundle: flight.fare.bundle,
            price: this.getPrice(type, flight.fare.price)
        }
    }

    resetState() {
        this.selectedDeparture = undefined;
        this.selectedReturn = undefined;
        this.ticketOrderSummary = { departureFlight: new SelectedFlightDetails(), returnFlight: new SelectedFlightDetails() };
        this.isSubmitted = false;
    }

    submitSummary() {
        this.flightsService.sendSummary(this.ticketOrderSummary);
    }

    ngOnDestroy() {
        this.availableTicketsSubscription.unsubscribe();
    }
}