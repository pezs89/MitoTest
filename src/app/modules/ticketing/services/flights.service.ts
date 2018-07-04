import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Flights } from '../../../core/interfaces/flights';
import { TicketOrder } from '../../../core/interfaces/ticketOrder';

@Injectable()
export class FlightsService {
    private tickets: Subject<Flights> = new Subject<Flights>();
    private ticketOrder: Subject<TicketOrder> = new Subject<TicketOrder>();
    private returnDate: Subject<string> = new Subject<string>();
    private orderSubmit: Subject<boolean> = new Subject<boolean>();

    ticketsOrderObservable: Observable<TicketOrder> = this.ticketOrder.asObservable();
    ticketsObservable: Observable<Flights> = this.tickets.asObservable();
    returnDateObservable: Observable<string> = this.returnDate.asObservable();
    orderSubmitObservable: Observable<boolean> = this.orderSubmit.asObservable();

    sendAvailableTickets(tickets: Flights) {
        this.tickets.next(tickets);
    }

    sendSummary(order: TicketOrder) {
        this.ticketOrder.next(order);
    }

    sendReturnDate(returnDate: string) {
        this.returnDate.next(returnDate);
    }

    submitOrder(hasOrder: boolean) {
        this.orderSubmit.next(hasOrder);
    }
}



