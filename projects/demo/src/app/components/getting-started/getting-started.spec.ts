import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GettingStarted } from './getting-started';

describe('GettingStarted', () => {
  let component: GettingStarted;
  let fixture: ComponentFixture<GettingStarted>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GettingStarted],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(GettingStarted);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
