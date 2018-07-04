import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import { Subscription } from 'rxjs';
import { TicketOrder } from '../../../core/interfaces/ticketOrder';

@Component({
    selector: 'order-summary',
    templateUrl: 'orderSummary.component.html'
})

export class OrderSummary implements OnInit, OnDestroy {
    summarySubscription: Subscription;
    summary: TicketOrder;

    constructor(private flightService: FlightsService) {}

    ngOnInit() {
        this.summarySubscription = this.flightService.ticketsOrderObservable.subscribe(order => {
            this.summary = order;
        })
    }

    submitOrder() {
        this.summary = undefined;
        this.flightService.submitOrder(true);
    }

    ngOnDestroy() {
        this.summarySubscription.unsubscribe();
    }
}
