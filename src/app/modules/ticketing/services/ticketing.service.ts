import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../../../core/models/station';

@Injectable()
export class TicketingService {
    constructor(private http: HttpClient) { }

    getAllStations(): Observable<Station[]> {
        return this.http.get<Station[]>('https://mock-air.herokuapp.com/asset/stations')
    }

    searchForFlight(departureStation: string, arrivalStation: string, date: Date): Observable<any[]> {
        return this.http.get<any[]>(`https://mock-air.herokuapp.com/search?departureStation=${departureStation}&arrivalStation=${arrivalStation}&date=${date}`)
    }
}