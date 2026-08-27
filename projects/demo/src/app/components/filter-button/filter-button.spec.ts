import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FilterButton } from './filter-button';

describe('FilterButton', () => {
  let component: FilterButton;
  let fixture: ComponentFixture<FilterButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterButton],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
