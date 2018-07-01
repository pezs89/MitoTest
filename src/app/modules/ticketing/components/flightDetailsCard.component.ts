import { Component, Input } from '@angular/core';
import { Flight } from '../../../core/models/Flight';

@Component({
    selector: 'flight-card',
    templateUrl: 'flightDetailsCard.component.html'
})

export class FlightDetailsCard {
    @Input('flightDetail') flight: Flight;
}