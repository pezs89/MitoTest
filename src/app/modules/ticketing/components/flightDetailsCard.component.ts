import { Component, Input, Output } from '@angular/core';
import { Flight } from '../../../core/models/Flight';
import { EventEmitter } from 'events';
import { Fare } from '../../../core/models/fare';

@Component({
    selector: 'flight-card',
    templateUrl: 'flightDetailsCard.component.html'
})

export class FlightDetailsCard {
    @Input('flightDetail') flight: Flight;
    @Input('isButtonsEnabled') isEnabled: boolean;
    @Output('buyTicket') event: EventEmitter = new EventEmitter();
    
    buyTicket(event: any) {
        this.event.emit(event);
    }
}