import { Component, OnInit } from '@angular/core';
import { Flight } from '@flight-workspace/flight-lib';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable, of, tap } from 'rxjs';
import * as fromFlightBooking from '../+state';


interface Filter {
  from: string;
  to: string;
  urgent: boolean;
}

interface LocalState {
  filters: Filter[];
}

const initialLocalState: LocalState = {
  filters: []
};


@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  providers: [ComponentStore]
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;
  flights$ = this.globalStore.select(fromFlightBooking.selectFlights);

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  /**
   * Updater
   */

  addFilter = this.localStore.updater(
    (state, filter: Filter) => ({
      ...state,
      filters: [
        ...state.filters,
        filter
      ]
    })
  );

  /**
   * Selectors
   */

  selectFilters$ = this.localStore.select(
    // Selectors
    // Projector
    state => state.filters
  );

  /**
   * Effects
   */

  searchFlights = this.localStore.effect(
    (trigger$: Observable<void>) => trigger$.pipe(
      tap(() => this.addFilter(of({
        from: this.from,
        to: this.to,
        urgent: this.urgent
      }))),
      tap(() => this.globalStore.dispatch(
        fromFlightBooking.flightsLoad({
          from: this.from,
          to: this.to,
          urgent: this.urgent
        })
      ))
    )
  );

  constructor(
    private globalStore: Store,
    private localStore: ComponentStore<LocalState>) {

    this.localStore.setState(initialLocalState);
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  delay(flight: Flight): void {
    this.globalStore.dispatch(
      fromFlightBooking.flightUpdate({
        flight: {
          ...flight,
          date: addMinutesToDate(flight.date, 15).toISOString(),
          delayed: true
        }
      })
    )
  }
}


export const addMinutesToDate = (date: Date | string, minutes: number): Date => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Date(dateObj.getTime() + minutes * 60 * 1_000);
};

