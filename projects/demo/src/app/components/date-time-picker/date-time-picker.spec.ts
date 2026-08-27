import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DateTimePicker } from './date-time-picker';

describe('DateTimePicker', () => {
  let component: DateTimePicker;
  let fixture: ComponentFixture<DateTimePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimePicker],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DateTimePicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
