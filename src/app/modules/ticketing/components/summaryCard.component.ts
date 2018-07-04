import { Component, Input } from '@angular/core';
import { SelectedFlightDetails } from '../../../core/models/selectedFlightDetails';

@Component({
    selector: 'summary-card',
    templateUrl: 'summaryCard.component.html'
})

export class SummaryCard {
    @Input('orderSummary') summaryItem: SelectedFlightDetails;
}