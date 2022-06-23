import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl } from '@angular/forms';


export interface Address {
  street: string;
  no: string;
  zip: string;
  city: string;
  country: string;
}


@Component({
  selector: 'address-control',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit, ControlValueAccessor {
  addressForm = this.getFormMetadata();
  onChanged: ((address: Address) => void) | undefined;

  constructor(
    private control: NgControl,
    private fb: FormBuilder) {

    control.valueAccessor = this;
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  getFormMetadata(): FormGroup {
    return this.fb.group({
      street: [''],
      no: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }

  writeValue(address: Address): void {
    this.addressForm.setValue(address);
  }

  registerOnChange(fn: (address: Address) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  updateAddress(): void {
    this.onChanged?.(this.addressForm.value);
  }
}
