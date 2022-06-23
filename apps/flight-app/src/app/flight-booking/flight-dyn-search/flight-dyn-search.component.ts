import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Flight, FlightService } from '@flight-workspace/flight-lib';


interface FormControlMetadata {
  name: string;
  label: string;
  initValue: string;
}


@Component({
  selector: 'app-flight-dyn-search',
  templateUrl: './flight-dyn-search.component.html',
  styleUrls: ['./flight-dyn-search.component.css'],
})
export class FlightDynSearchComponent implements OnInit {
  dynFilter = new UntypedFormGroup({});
  flights: Flight[] = [];
  formMetadata: FormControlMetadata[] = [
    {
      name: 'from',
      label: 'Airport of departure',
      initValue: 'Graz'
    },
    {
      name: 'via',
      label: 'Transfer airport',
      initValue: 'Frankfurt'
    },
    {
      name: 'to',
      label: 'Airport of destination',
      initValue: 'Hamburg'
    },
    {
      name: 'final destination',
      label: 'My vacation',
      initValue: 'Hawaii'
    }
  ];

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.formMetadata.forEach(
      controlMeta => {
        this.dynFilter.addControl(
          controlMeta.name,
          new FormControl(
            controlMeta.initValue,
            [
              // Validators.required
            ]
          )
        )
      }
    );
  }

  search(): void {
    this.flightService.find(
      this.dynFilter.controls[this.formMetadata[0].name].value,
      this.dynFilter.controls[this.formMetadata[2].name].value
    ).subscribe({
      next: (flights: Flight[]) => {
        this.flights = flights;
        console.log(flights);
      },
      error: errResp => console.error('Error loading flights', errResp)
    });
  }
}
