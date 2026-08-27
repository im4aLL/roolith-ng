import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
    service['_activeRequests'] = 0;
    service.hide();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show', () => {
    it('should set loading state with default message', () => {
      service.show();

      expect(service.isLoading()).toBe(true);
      expect(service.isNonBlocking()).toBe(false);
      expect(service.message()).toBe('Processing...');
    });

    it('should set loading state with custom message', () => {
      service.show('Saving data');

      expect(service.isLoading()).toBe(true);
      expect(service.isNonBlocking()).toBe(false);
      expect(service.message()).toBe('Saving data');
    });
  });

  describe('showNonBlocking', () => {
    it('should set non-blocking loading state with default message', () => {
      service.showNonBlocking();

      expect(service.isLoading()).toBe(true);
      expect(service.isNonBlocking()).toBe(true);
      expect(service.message()).toBe('Processing...');
    });

    it('should set non-blocking loading state with custom message', () => {
      service.showNonBlocking('Loading records');

      expect(service.isLoading()).toBe(true);
      expect(service.isNonBlocking()).toBe(true);
      expect(service.message()).toBe('Loading records');
    });
  });

  describe('startRequest', () => {
    it('should increment active requests', () => {
      service.startRequest();

      expect(service['_activeRequests']).toBe(1);
    });

    it('should show non-blocking loader', () => {
      service.startRequest();

      expect(service.isLoading()).toBe(true);
      expect(service.isNonBlocking()).toBe(true);
      expect(service.message()).toBe('Processing...');
    });
  });

  describe('endRequest', () => {
    it('should decrement active requests', () => {
      service.startRequest();
      service.startRequest();

      service.endRequest();

      expect(service['_activeRequests']).toBe(1);
    });

    it('should not decrement active requests below zero', () => {
      service.endRequest();

      expect(service['_activeRequests']).toBe(0);
    });

    it('should keep loader visible when active requests remain', () => {
      service.startRequest();
      service.startRequest();

      service.endRequest();

      expect(service.isLoading()).toBe(true);
      expect(service.isNonBlocking()).toBe(true);
      expect(service.message()).toBe('Processing...');
    });

    it('should hide loader when no active requests remain', () => {
      service.startRequest();

      service.endRequest();

      expect(service.isLoading()).toBe(false);
      expect(service.isNonBlocking()).toBe(false);
      expect(service.message()).toBeNull();
    });
  });

  describe('hide', () => {
    it('should hide loader when there are no active requests', () => {
      service.show('Saving data');

      service.hide();

      expect(service.isLoading()).toBe(false);
      expect(service.isNonBlocking()).toBe(false);
      expect(service.message()).toBeNull();
    });

    it('should not hide loader when active requests remain', () => {
      service.startRequest();

      service.hide();

      expect(service.isLoading()).toBe(true);
      expect(service.isNonBlocking()).toBe(true);
      expect(service.message()).toBe('Processing...');
    });
  });

  describe('_hide', () => {
    it('should reset loading state', () => {
      service.showNonBlocking('Loading records');

      service['_hide']();

      expect(service.isLoading()).toBe(false);
      expect(service.isNonBlocking()).toBe(false);
      expect(service.message()).toBeNull();
    });
  });
});
