import { Component, Input, OnChanges, SimpleChange, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';
import { Station } from '../../../core/models/station';
import { FLIGHT_FORM } from '../../../core/constants/flightForm';
import { TicketingService } from '../services/ticketing.service';
import { Flights } from '../../../core/interfaces/flights';
import { FlightsService } from '../services/flights.service';
import { Subscription } from 'rxjs';
import { Flight } from '../../../core/models/Flight';

@Component({
    selector: 'flight-search',
    templateUrl: 'flightSearch.component.html'
})

export class FlightSearch implements OnInit, OnChanges, OnDestroy {
    @Input('allStations') stations: Station[];
    isSubmitted: boolean = false;
    flightSearchForm: FormGroup;
    configs = [...FLIGHT_FORM];
    flights: Flights;
    hasDepartureFlight: boolean = true;

    private returnDateSubscribtion: Subscription;
    private orderConfirmSubscription: Subscription;

    constructor(private fb: FormBuilder, private ticketingService: TicketingService, private flightsService: FlightsService) { }

    ngOnInit() {
        this.flightSearchForm = this.createGroup();
        this.onFormValueChange();

        this.returnDateSubscribtion = this.flightsService.returnDateObservable.subscribe(newReturnDate => {
            this.flightSearchForm.get('return').setValue(newReturnDate);
        })

        this.orderConfirmSubscription = this.flightsService.orderSubmitObservable.subscribe(isOrdered => {
            if (isOrdered) {
                this.flightSearchForm = this.createGroup();
                this.isSubmitted = false;
            }
        })
    }

    ngOnChanges(change: SimpleChanges) {
        const stations: SimpleChange = change.stations;
        if (stations.currentValue && stations.currentValue.length > 0) {
            this.configs = this.updateConfig(stations.currentValue, undefined);
        }
    }

    onFormValueChange() {
        this.flightSearchForm.valueChanges.subscribe(formValue => {
            this.setOriginOrDestination(formValue.origin, 'origin');
            this.setOriginOrDestination(formValue.destination, 'destination');
            this.configs = this.updateConfig(this.stations, formValue.origin)
            this.validateDates(formValue.departure, formValue.return);
        })
    }

    setOriginOrDestination(iata: string, key: string) {
        sessionStorage.setItem(key, iata);
    }

    updateConfig(newStationList: Station[], origin: string): any {
        const newConfig = [...this.configs];
        const originIndex = newConfig.findIndex(config => config.controlName === 'origin');
        const destinationIndex = newConfig.findIndex(config => config.controlName === 'destination');

        if (newConfig[originIndex].options !== newStationList) {
            newConfig[originIndex].options = newStationList;
        }

        if (!origin) {
            newConfig[destinationIndex].options = this.getDestinations(sessionStorage.getItem('origin'));
        } else {
            newConfig[destinationIndex].options = this.getDestinations(origin);
        }

        return newConfig;
    }

    getDestinations(origin: string): Station[] {
        if (origin) {
            const connections = this.stations.find(station => station.iata === origin).connections;
            return connections.map(connection => this.stations.find(station => station.iata === connection.iata));
        } else {
            return [];
        }
    }

    getDestinationShortName(iata: string): string {
        return this.stations.find((station: Station) => station.iata === iata).shortName;
    }

    createGroup(): FormGroup {
        const group = this.fb.group({});
        const formControls = this.configs.filter(config => config.type !== 'button');
        formControls.forEach(control => group.addControl(control.controlName, this.createFormControls(control.controlName)));
        return group;
    }

    createFormControls(controlName: string): FormControl {
        switch (controlName) {
            case 'origin':
            case 'destination':
                return this.fb.control(sessionStorage.getItem(controlName) || '', Validators.required)
            case 'departure':
                return this.fb.control('', Validators.required);
            default:
                return this.fb.control('');
        }
    }

    validateDates(originDate: string, returnDate: string) {
        if (Date.parse(originDate) >= Date.parse(returnDate)) {
            this.flightSearchForm.controls['departure'].setErrors({ invalidDate: 'The departure date has to be smaller than the return date!' });
            this.flightSearchForm.controls['return'].setErrors({ invalidDate: 'The departure date has to be smaller than the return date!' });
        } else if (Date.parse(originDate) < Date.parse(returnDate)) {
            this.flightSearchForm.controls['departure'].setErrors(null);
        }
    }

    searchForRetourFlight(origin: string, destination: string, departure: Date, returnDate: Date) {
        this.ticketingService.searchForRetourFlight(origin, destination, departure, returnDate).subscribe(response => {
            this.flights.departureFlights = response[0];
            this.flights.returnFlights = response[1];
            this.flightsService.sendAvailableTickets(this.flights);
            this.hasDepartureFlight = this.hasDeparture(this.flights.departureFlights);
        })
    }

    searchForOneWayFlight(origin: string, destination: string, departure: Date) {
        this.ticketingService.searchForOneWayFlight(origin, destination, departure).subscribe(response => {
            this.flights.departureFlights = response;
            this.hasDepartureFlight = this.hasDeparture(this.flights.departureFlights);
            this.flightsService.sendAvailableTickets(this.flights);
        })
    }

    hasDeparture(departureFlight: Array<Flight>): boolean {
        return departureFlight.length === 0 ? false : true
    }

    submitForm(form: any) {
        this.isSubmitted = true;
        if (form.valid) {
            this.flights = {
                departureFlights: [],
                returnFlights: [],
                origin: this.getDestinationShortName(form.value.origin),
                originIata: form.value.origin,
                destination: this.getDestinationShortName(form.value.destination),
                destinationIata: form.value.destination,
                departure: form.value.departure,
                return: form.value.return === '' ? undefined : form.value.return
            }
            if (this.flights.return) {
                this.searchForRetourFlight(form.value.origin, form.value.destination, this.flights.departure, this.flights.return);
            } else {
                this.searchForOneWayFlight(form.value.origin, form.value.destination, this.flights.departure);
            }
        }
    }

    ngOnDestroy() {
        this.returnDateSubscribtion.unsubscribe();
        this.orderConfirmSubscription.unsubscribe();
    }
}