import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CityPipe } from './pipes/city.pipe';
import { AddressComponent } from './form-controls/address/address.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [CityPipe, AddressComponent],
  exports: [CityPipe, AddressComponent],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }

  static forChild(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
