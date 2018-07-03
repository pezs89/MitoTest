import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Flight } from '../../../core/models/Flight';
import { Fare } from '../../../core/models/fare';

@Component({
    selector: 'flight-card',
    templateUrl: 'flightDetailsCard.component.html'
})

export class FlightDetailsCard {
    @Input('flightDetail') flight: Flight;
    @Input('selectedFlight') selectedDeparture: Flight;
    @Input('type') flightType: boolean;
    @Output() buyTicketEvent = new EventEmitter();

    selectedTicket: Fare;

    hasSelectedDeparture(): boolean {
        return this.selectedDeparture && this.selectedDeparture.flightNumber !== this.flight.flightNumber;
    }

    hasSelectedTicket(fare: Fare): boolean {
        return this.selectedTicket && fare.fareSellKey !== this.selectedTicket.fareSellKey;
    }

    hasAvailableTickets(): boolean {
        return this.flight.remainingTickets > 0;
    }

    isTicketSelected(fare: Fare): boolean {
        return this.selectedTicket && fare.fareSellKey === this.selectedTicket.fareSellKey;
    }

    addTicket(fare: Fare) {
        if (!this.selectedTicket) {
            this.selectedTicket = fare;
        }
        this.buyTicketEvent.emit({ fare: fare, flightNumber: this.flight.flightNumber, type: this.flightType });
    }
}