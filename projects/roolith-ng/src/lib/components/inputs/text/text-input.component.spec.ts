import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { TextInputType } from './data-access/text-input.interface';
import { TextInputComponent } from './text-input.component';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should initialize form value state', () => {
      expect(component.value()).toBe('');
      expect(component.touched()).toBe(false);
      expect(component.disabled()).toBe(false);
      expect(component.readonly()).toBe(false);
      expect(component.required()).toBe(false);
    });

    it('should initialize text input configuration', () => {
      expect(component.name()).toBe('');
      expect(component.label()).toBeNull();
      expect(component.placeholder()).toBeNull();
      expect(component.hint()).toBeNull();
      expect(component.type()).toBe('text');
    });

    it('should initialize validation inputs', () => {
      expect(component.minLength()).toBeUndefined();
      expect(component.maxLength()).toBeUndefined();
      expect(component.pattern()).toEqual([]);
      expect(component.invalid()).toBe(false);
      expect(component.errors()).toEqual([]);
    });
  });

  describe('inputs', () => {
    it('should update value model', () => {
      component.value.set('Search term');

      expect(component.value()).toBe('Search term');
    });

    it('should update touched model', () => {
      component.touched.set(true);

      expect(component.touched()).toBe(true);
    });

    it.each([
      ['text'],
      ['password'],
      ['email'],
      ['hidden'],
    ] as [TextInputType][])('should use %s type input', async (type) => {
      fixture.componentRef.setInput('type', type);
      await fixture.whenStable();

      expect(component.type()).toBe(type);
    });

    it('should use text metadata inputs', async () => {
      fixture.componentRef.setInput('name', 'email');
      fixture.componentRef.setInput('label', 'Email');
      fixture.componentRef.setInput('placeholder', 'Enter email');
      await fixture.whenStable();

      expect(component.name()).toBe('email');
      expect(component.label()).toBe('Email');
      expect(component.placeholder()).toBe('Enter email');
    });
  });

  describe('hintMessage', () => {
    it('should return error message when error and error message are provided', async () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('errorMessage', 'Email is required');
      fixture.componentRef.setInput('hint', 'Enter email');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Email is required');
    });

    it('should return hint when error message is not provided', async () => {
      fixture.componentRef.setInput('hint', 'Enter email');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Enter email');
    });

    it('should return null when neither error message nor hint exists', () => {
      expect(component.hintMessage()).toBeNull();
    });

    it('should return hint when error is true but error message is missing', async () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('hint', 'Enter email');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Enter email');
    });
  });
});
