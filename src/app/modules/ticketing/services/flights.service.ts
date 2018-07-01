import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Flights } from '../../../core/models/flights';

@Injectable()
export class FlightsService {
    private tickets: Subject<Flights> = new Subject<Flights>();
    ticketsObservable: Observable<Flights> = this.tickets.asObservable();

    sendAvailableTickets(tickets: Flights) {
        this.tickets.next(tickets);
    }
}



