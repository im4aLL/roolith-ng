import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { FileInputComponent } from './file-input.component';

describe('FileInputComponent', () => {
  let component: FileInputComponent;
  let fixture: ComponentFixture<FileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should initialize form value state', () => {
      expect(component.value()).toEqual([]);
      expect(component.touched()).toBe(false);
      expect(component.disabled()).toBe(false);
      expect(component.readonly()).toBe(false);
      expect(component.required()).toBe(false);
    });

    it('should initialize file input configuration', () => {
      expect(component.label()).toBeNull();
      expect(component.hint()).toBeNull();
      expect(component.name()).toBe('');
      expect(component.accept()).toBe('');
      expect(component.multiple()).toBe(false);
    });

    it('should initialize validation inputs', () => {
      expect(component.invalid()).toBe(false);
      expect(component.errors()).toEqual([]);
      expect(component.pending()).toBe(false);
      expect(component.dirty()).toBe(false);
    });
  });

  describe('inputs', () => {
    it('should use metadata input values', async () => {
      fixture.componentRef.setInput('label', 'Upload file');
      fixture.componentRef.setInput('hint', 'PDF only');
      fixture.componentRef.setInput('name', 'attachment');
      fixture.componentRef.setInput('accept', '.pdf');
      fixture.componentRef.setInput('multiple', true);
      await fixture.whenStable();

      expect(component.label()).toBe('Upload file');
      expect(component.hint()).toBe('PDF only');
      expect(component.name()).toBe('attachment');
      expect(component.accept()).toBe('.pdf');
      expect(component.multiple()).toBe(true);
    });

    it('should use state input values', async () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('readonly', true);
      fixture.componentRef.setInput('required', true);
      fixture.componentRef.setInput('invalid', true);
      await fixture.whenStable();

      expect(component.disabled()).toBe(true);
      expect(component.readonly()).toBe(true);
      expect(component.required()).toBe(true);
      expect(component.invalid()).toBe(true);
    });
  });

  describe('hintMessage', () => {
    it('should return error message when error and error message are provided', async () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('errorMessage', 'File is required');
      fixture.componentRef.setInput('hint', 'Upload file');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('File is required');
    });

    it('should return hint when error message is not provided', async () => {
      fixture.componentRef.setInput('hint', 'Upload file');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Upload file');
    });

    it('should return null when neither error message nor hint exists', () => {
      expect(component.hintMessage()).toBeNull();
    });

    it('should return hint when error is true but error message is missing', async () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('hint', 'Upload file');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Upload file');
    });
  });

  describe('onFileChange', () => {
    it('should set selected files, mark touched, and emit files', () => {
      const files = [createMockFile('first.pdf'), createMockFile('second.pdf')];
      const emitSpy = vi.spyOn(component.fileChange, 'emit');

      component.onFileChange(createFileChangeEvent(files));

      expect(component.value()).toEqual(files);
      expect(component.touched()).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith(files);
    });

    it('should set empty files when input files are missing', () => {
      const emitSpy = vi.spyOn(component.fileChange, 'emit');

      component.onFileChange(createFileChangeEvent(null));

      expect(component.value()).toEqual([]);
      expect(component.touched()).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith([]);
    });
  });
});

/**
 * Creates a mock file.
 *
 * @param name string
 * @returns File
 */
function createMockFile(name: string): File {
  return new File(['content'], name, { type: 'application/pdf' });
}

/**
 * Creates a file input change event.
 *
 * @param files File[] | null
 * @returns Event
 */
function createFileChangeEvent(files: File[] | null): Event {
  return { target: { files: files ? createMockFileList(files) : null } } as unknown as Event;
}

/**
 * Creates a mock FileList-like object.
 *
 * @param files File[]
 * @returns FileList
 */
function createMockFileList(files: File[]): FileList {
  return {
    ...files,
    length: files.length,
    item: (index: number) => files[index] ?? null,
  } as unknown as FileList;
}
