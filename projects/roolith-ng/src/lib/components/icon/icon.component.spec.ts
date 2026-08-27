import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    fixture.componentRef.setInput('name', 'settings');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('iconClassName', () => {
    it('should return rng-icon-- prefixed with the icon name', () => {
      expect(component.iconClassName()).toBe('rng-icon--settings');
    });
  });

  describe('iconSizeClassName', () => {
    it('should return empty string for default size', () => {
      expect(component.iconSizeClassName()).toBe('');
    });

    it('should return rng-icon-- prefixed with the size for non-default sizes', async () => {
      fixture.componentRef.setInput('size', 'small');
      await fixture.whenStable();

      expect(component.iconSizeClassName()).toBe('rng-icon--small');
    });
  });

  describe('classNames', () => {
    it('should combine iconClassName and iconSizeClassName when size is not default', async () => {
      fixture.componentRef.setInput('size', 'large');
      await fixture.whenStable();

      expect(component.classNames()).toBe('rng-icon rng-icon--settings rng-icon--large');
    });

    it('should exclude empty iconSizeClassName when size is default', () => {
      expect(component.classNames()).toBe('rng-icon rng-icon--settings');
    });

    it('should include styleClass when provided', async () => {
      fixture.componentRef.setInput('styleClass', 'custom-class');
      await fixture.whenStable();

      expect(component.classNames()).toBe('rng-icon rng-icon--settings custom-class');
    });

    it('should omit styleClass when not provided', () => {
      expect(component.classNames()).not.toContain('undefined');
    });
  });
});
