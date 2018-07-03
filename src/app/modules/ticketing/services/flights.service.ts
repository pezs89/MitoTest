import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Flights } from '../../../core/interfaces/flights';
import { TicketOrder } from '../../../core/interfaces/ticketOrder';

@Injectable()
export class FlightsService {
    private tickets: Subject<Flights> = new Subject<Flights>();
    private ticketOrder: Subject<TicketOrder> = new Subject<TicketOrder>();

    ticketsOrderObservable: Observable<TicketOrder> = this.ticketOrder.asObservable();
    ticketsObservable: Observable<Flights> = this.tickets.asObservable();

    sendAvailableTickets(tickets: Flights) {
        this.tickets.next(tickets);
    }

    sendSummary(order: TicketOrder) {
        this.ticketOrder.next(order);
    }
}



