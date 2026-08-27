import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AiReady } from './ai-ready';

describe('AiReady', () => {
  let component: AiReady;
  let fixture: ComponentFixture<AiReady>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiReady],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AiReady);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
