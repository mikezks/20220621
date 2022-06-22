import { Injectable } from '@angular/core';
import { FlightService } from '@flight-workspace/flight-lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as FlightBookingActions from './flight-booking.actions';


@Injectable()
export class FlightBookingEffects {

  loadFlights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlightBookingActions.flightsLoad),
      switchMap(action => this.flightService.find(
        action.from,
        action.to,
        action.urgent
      ).pipe(
        map(flights => FlightBookingActions.flightsLoaded({ flights })),
        catchError(err => of(FlightBookingActions.flightsLoadedError({ error: err })))
      ))
    )
  );


  constructor(
    private actions$: Actions,
    private flightService: FlightService) {}
}
