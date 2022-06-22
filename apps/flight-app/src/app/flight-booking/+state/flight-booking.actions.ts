import { createAction, props } from '@ngrx/store';

export const loadFlightBookings = createAction(
  '[FlightBooking] Load FlightBookings'
);

export const loadFlightBookingsSuccess = createAction(
  '[FlightBooking] Load FlightBookings Success',
  props<{ data: any }>()
);

export const loadFlightBookingsFailure = createAction(
  '[FlightBooking] Load FlightBookings Failure',
  props<{ error: any }>()
);
