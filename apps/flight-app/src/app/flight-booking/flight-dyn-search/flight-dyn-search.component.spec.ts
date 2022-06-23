import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDynSearchComponent } from './flight-dyn-search.component';

describe('FlightDynSearchComponent', () => {
  let component: FlightDynSearchComponent;
  let fixture: ComponentFixture<FlightDynSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightDynSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightDynSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
