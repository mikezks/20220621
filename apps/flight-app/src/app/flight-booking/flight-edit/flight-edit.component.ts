import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '../../+state';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
})
export class FlightEditComponent implements OnInit {
  id: string | undefined;
  showDetails: string | undefined;
  showWarning = false;
  editForm: FormGroup = this.getFormGroupMetadata();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });

    this.store.select(selectRouteParams)
      .subscribe(console.log);

    this.editForm.valueChanges.subscribe(console.log);
  }

  getFormGroupMetadata(): FormGroup {
    return this.fb.group({
      id: [0],
      from: ['Graz', [
        Validators.required
      ]],
      to: ['Hamburg', [
        Validators.required
      ]],
      date: [new Date().toISOString()],
      address: [{
        street: 'Hauptstraße',
        no: '100/1/3',
        zip: '8020',
        city: 'Graz',
        country: 'Austria'
      }]
    });
  }

  decide(answer: boolean) {
    console.log('decide', answer);
  }

  save(): void {
    console.log('value', this.editForm.value);
    console.log('valid', this.editForm.valid);
    console.log('dirty', this.editForm.dirty);
    console.log('touched', this.editForm.touched);
  }
}
