import { Component, Input, OnChanges, SimpleChange, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Station } from '../../../core/models/station';
import { StationConnection } from '../../../core/models/stationConnection';
import { FLIGHT_FORM } from '../../../core/constants/flightForm';

@Component({
    selector: 'flight-search',
    templateUrl: 'flightSearch.component.html'
})

export class FlightSearch implements OnInit, OnChanges {
    @Input('allStations') stations: Station[];
    isSubmitted: boolean = false;
    flightSearchForm: FormGroup;
    configs = FLIGHT_FORM;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.onFormValueChange();
    }

    ngOnChanges(change: SimpleChanges) {
        const stations: SimpleChange = change.stations;
        if (stations.currentValue !== stations.previousValue) {
            this.configs = this.updateConfig(stations.currentValue, undefined, 'origin');
            this.flightSearchForm = this.createGroup();
        }
        this.onFormValueChange();

    }

    onFormValueChange() {
        this.flightSearchForm.valueChanges.subscribe(formValue => this.configs = this.updateConfig(undefined, formValue.origin, 'destination'))
    }

    updateConfig(newStationList: Station[], origin: Station, configType: string): any {
        const newConfig = [...this.configs];
        const index = newConfig.findIndex(config => config.controlName === configType);

        if (!origin) {
            newConfig[index].options = newStationList;
        } else {
            newConfig[index].options = this.getDestinations(origin);
        }

        return newConfig;
    }

    getDestinations(origin: Station): Station[] {
        return origin.connections.map((connection: StationConnection) =>
            this.stations.find((station: Station) => station.iata === connection.iata))
    }

    createGroup(): FormGroup {
        const group = this.fb.group({});
        const formControls = this.configs.filter(config => config.type !== 'button');
        formControls.forEach(control => group.addControl(control.controlName, this.fb.control('', Validators.required)));
        return group;
    }

    submitForm(form: any) {
        console.log(form)
    }
}