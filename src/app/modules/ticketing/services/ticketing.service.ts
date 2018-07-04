import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Station } from '../../../core/models/station';
import { API_URL } from '../../../core/constants/apiUrl';
import { Flight } from '../../../core/models/Flight';

@Injectable()
export class TicketingService {
    constructor(private http: HttpClient) { }

    getAllStations(): Observable<Station[]> {
        return this.http.get<Station[]>(API_URL + '/asset/stations');
    }

    searchForOneWayFlight(departureStation: string, arrivalStation: string, departureDate: Date): Observable<Flight[]> {
        return this.http.get<Flight[]>(API_URL + `/search?departureStation=${departureStation}&arrivalStation=${arrivalStation}&date=${departureDate}`)
            .pipe(catchError(this.handleError));
    }

    searchForRetourFlight(departureStation: string, arrivalStation: string, departureDate: Date, returnDate: Date) {
        const departureRequest = this.http.get<Flight[]>(API_URL + `/search?departureStation=${departureStation}&arrivalStation=${arrivalStation}&date=${departureDate}`);
        const returnRequest = this.http.get<Flight[]>(API_URL + `/search?departureStation=${arrivalStation}&arrivalStation=${departureStation}&date=${returnDate}`);
        return forkJoin([departureRequest, returnRequest])
            .pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        return throwError(error.message);
    }
}