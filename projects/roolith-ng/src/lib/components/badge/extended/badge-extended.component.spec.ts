import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeExtendedComponent } from './badge-extended.component';

describe('BadgeExtendedComponent', () => {
  let component: BadgeExtendedComponent;
  let fixture: ComponentFixture<BadgeExtendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeExtendedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeExtendedComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
