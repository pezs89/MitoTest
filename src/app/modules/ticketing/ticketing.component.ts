import { Component, OnInit } from '@angular/core';
import { TicketingService } from './services/ticketing.service';
import { Station } from '../../core/models/station';

@Component({
    templateUrl: 'ticketing.component.html'
})

export class Ticketing implements OnInit {
    allStations: Station[] = [];

    constructor(private ticketingService: TicketingService) { }

    ngOnInit() {
        this.ticketingService.getAllStations().subscribe(response => {
            this.allStations = response;
        });
    }
}