import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Message } from './message';

describe('Message', () => {
  let component: Message;
  let fixture: ComponentFixture<Message>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Message],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Message);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
