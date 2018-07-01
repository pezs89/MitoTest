import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ticketing } from './ticketing.component';
import { FlightSearch } from './components/flightSearch.component';
import { FlightsList } from './components/flightsList.component';
import { FlightDetailsCard } from './components/flightDetailsCard.component';
import { FormSelect } from '../../shared/FormSelect/formSelect.component';
import { FormInput } from '../../shared/FormInput/formInput.component';
import { FormButton } from '../../shared/FormButton/formButton.component';
import { FormError } from '../../shared/FormError/formError.component';

import { TicketingService } from './services/ticketing.service';
import { FlightsService } from './services/flights.service';

import { TicketingRoutingModule } from './ticketing-routing.module';

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TicketingRoutingModule
    ],
    declarations: [
        Ticketing,
        FlightSearch,
        FlightsList,
        FlightDetailsCard,
        FormSelect,
        FormInput,
        FormButton, 
        FormError
    ],
    providers: [
        TicketingService,
        FlightsService
    ]
})

export class TicketingModule { }

