import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FlightsService } from '../services/flights.service';
import { TicketingService } from '../services/ticketing.service';
import { Flights } from '../../../core/models/flights';
import { Flight } from '../../../core/models/Flight';
import { RETURN_FLIGHT_FORM } from '../../../core/constants/returnFlightForm';

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
    formConfig = [...RETURN_FLIGHT_FORM]

    constructor(private flightsService: FlightsService, private ticketingService: TicketingService private fb: FormBuilder) { }

    ngOnInit() {
        this.availableTicketsSubscription = this.flightsService.ticketsObservable.subscribe((flights) => {
            this.flights = flights;
            this.selectedDeparture = undefined;
            this.selectedReturn = undefined;

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

    ticketSelectionHandler(flight: any) {
        if (flight.type === 'departureFlight') {
            this.selectedDeparture = this.flights.departureFlights.find((x: Flight) => x.flightNumber === flight.flightNumber);
            this.selectedDeparture.remainingTickets--;
        } else {
            this.selectedReturn = this.flights.returnFlights.find((x: Flight) => x.flightNumber === flight.flightNumber);
            this.selectedReturn.remainingTickets--;
        }
    }

    searchForReturnFlight(formValues: any) {
        this.isSubmitted = true;
        this.ticketingService.searchForOneWayFlight(this.flights.destination, this.flights.origin, formValues.return).subscribe(response => {
            this.flights.returnFlights = response;
        });
    }

    ngOnDestroy() {
        this.availableTicketsSubscription.unsubscribe();
    }
}