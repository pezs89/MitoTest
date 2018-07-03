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
            console.log(this.summary);
        })
    }

    ngOnDestroy() {
        this.summarySubscription.unsubscribe();
    }
}
