import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import { Subscription } from 'rxjs';
import { Flights } from '../../../core/models/flights';

@Component({
    selector: 'flights',
    templateUrl: 'flightsList.component.html'
})

export class FlightsList implements OnInit, OnDestroy {
    private availableTicketsSubscription: Subscription;
    flights: Flights;
    constructor(private flightsService: FlightsService) {}
    
    ngOnInit() {
        this.availableTicketsSubscription = this.flightsService.ticketsObservable.subscribe((flights) => {
            console.log(flights);
            this.flights = flights;
        })
    }

    ticketHandler(asd: any) {
        console.log(asd)
    }

    ngOnDestroy() {
        this.availableTicketsSubscription.unsubscribe();
    }
}