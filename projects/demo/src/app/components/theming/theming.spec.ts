import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Theming } from './theming';

describe('Theming', () => {
  let component: Theming;
  let fixture: ComponentFixture<Theming>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Theming],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Theming);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
