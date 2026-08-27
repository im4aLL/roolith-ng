import { Component, signal } from '@angular/core';
import { FileInputComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-file-input',
  imports: [CodeBlock, DocPager, FileInputComponent],
  templateUrl: './file-input.html',
  styleUrl: './file-input.scss',
})
export class FileInput {
  /**
   * Snippet for importing `FileInputComponent`.
   */
  protected readonly importSnippet = `import { FileInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [FileInputComponent]
})`;

  /**
   * Basic usage markup - label, hint, accept and `fileChange` handler.
   */
  protected readonly basicSnippet = `<rng-file-input
  label="Upload document"
  hint="Accepted formats: PDF, DOCX"
  accept=".pdf,.docx"
  (fileChange)="onFileChange($event)" />`;

  /**
   * Basic handler snippet for `fileChange`.
   */
  protected readonly basicTsSnippet = `import { signal } from '@angular/core';

files = signal<File[]>([]);

onFileChange(files: File[]): void {
  this.files.set(files);
  console.log('selected:', files.map((file) => file.name));
}`;

  /**
   * Accept filter markup - restricts selectable file types.
   */
  protected readonly acceptSnippet = `<!-- Only PDFs -->
<rng-file-input
  label="Upload PDF"
  accept=".pdf"
  [(value)]="pdfFiles" />

<!-- Images only -->
<rng-file-input
  label="Upload image"
  accept=".jpg,.png,.webp"
  [(value)]="imageFiles" />

<!-- Any image MIME type -->
<rng-file-input
  label="Upload image"
  accept="image/*"
  [(value)]="imageFiles" />

<!-- Multiple MIME types and extensions -->
<rng-file-input
  label="Upload document"
  accept=".pdf,.docx,application/msword"
  [(value)]="docFiles" />`;

  /**
   * Accept variants explained.
   */
  protected readonly acceptVariantsSnippet = `// accept takes a comma-separated list of MIME types or extensions
accept=".pdf"                          // single extension
accept=".jpg,.png,.webp"                // multiple extensions
accept="image/*"                        // any image MIME type
accept=".pdf,.docx,application/msword"  // mixed extensions and MIME types`;

  /**
   * Multiple files markup - allows selecting several files at once.
   */
  protected readonly multipleSnippet = `<rng-file-input
  label="Upload images"
  accept=".jpg,.png,.webp"
  [multiple]="true"
  [(value)]="selectedFiles" />`;

  /**
   * Handler for multiple files.
   */
  protected readonly multipleTsSnippet = `import { signal } from '@angular/core';

selectedFiles = signal<File[]>([]);

onFilesChange(files: File[]): void {
  this.selectedFiles.set(files);
  console.log(files.length + ' files selected');
}`;

  /**
   * Hint markup - helper text below the input.
   */
  protected readonly hintSnippet = `<rng-file-input
  label="Attachment"
  hint="Accepted formats: PDF, DOCX - Max 5MB"
  [(value)]="files" />`;

  /**
   * Error state markup - `error` + `errorMessage` overrides `hint`.
   */
  protected readonly errorSnippet = `<rng-file-input
  label="Upload document"
  [error]="true"
  errorMessage="Please select a file" />`;

  /**
   * Hint vs errorMessage markup.
   */
  protected readonly hintVsErrorSnippet = `<!-- hint only -->
<rng-file-input
  label="Upload document"
  hint="Accepted formats: PDF, DOCX"
  [(value)]="files" />

<!-- error overrides hint -->
<rng-file-input
  label="Upload document"
  hint="Accepted formats: PDF, DOCX"
  [error]="true"
  errorMessage="File is required" />`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-file-input
  label="Upload document"
  [disabled]="true" />

<rng-file-input
  label="Disabled with value"
  [disabled]="true"
  [value]="selectedFiles" />`;

  /**
   * Required state markup.
   */
  protected readonly requiredSnippet = `<rng-file-input
  label="Upload document"
  [required]="true"
  [(value)]="files" />`;

  /**
   * Name attribute markup.
   */
  protected readonly nameSnippet = `<rng-file-input
  label="Upload document"
  name="attachment"
  [(value)]="files" />`;

  /**
   * States combined snippet for reference.
   */
  protected readonly statesSnippet = `<rng-file-input [disabled]="true" label="Disabled" />
<rng-file-input [error]="true" errorMessage="File is required" label="Error" />
<rng-file-input [required]="true" label="Required" />
<rng-file-input name="attachment" label="With name attribute" />`;

  /**
   * Two-way binding and `fileChange` output markup.
   */
  protected readonly twoWaySnippet = `<rng-file-input [(value)]="files" label="Two-way binding" />

<!-- Explicit output handling -->
<rng-file-input
  [value]="files()"
  (fileChange)="onFileChange($event)"
  label="With fileChange handler" />`;

  /**
   * Handler for `fileChange`.
   */
  protected readonly fileChangeTsSnippet = `import { signal } from '@angular/core';

files = signal<File[]>([]);

onFileChange(files: File[]): void {
  this.files.set(files);
  console.log('files:', files);
}`;

  /**
   * With `FormField` (signals forms) markup.
   */
  protected readonly formFieldSnippet = `import { form } from '@angular/forms/signals';
import { FileInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [FileInputComponent]
})
export class ExampleComponent {
  form = form({
    attachment: [] as File[],
  });
}`;

  /**
   * Template for signals form integration.
   */
  protected readonly formFieldTemplateSnippet = `<rng-file-input
  label="Attachment"
  [formField]="form.controls.attachment" />`;

  /**
   * Full example combining label, hint, accept, multiple and error handling.
   */
  protected readonly fullSnippet = `<rng-file-input
  label="Upload documents"
  hint="Accepted formats: PDF, DOCX - Max 10MB"
  accept=".pdf,.docx"
  [multiple]="true"
  [(value)]="documents" />

@if (documents().length > 0) {
  <ul>
    @for (file of documents(); track file.name) {
      <li>{{ file.name }} ({{ file.size }} bytes)</li>
    }
  </ul>
}`;

  /**
   * Full component snippet for the combined example.
   */
  protected readonly fullComponentSnippet = `import { FileInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [FileInputComponent]
})
export class ExampleComponent {
  documents = signal<File[]>([]);
  singleFile = signal<File[]>([]);
  imageFiles = signal<File[]>([]);

  onFileChange(files: File[]): void {
    this.documents.set(files);
  }
}`;

  protected basicFiles = signal<File[]>([]);
  protected acceptPdfFiles = signal<File[]>([]);
  protected acceptImageFiles = signal<File[]>([]);
  protected multipleFiles = signal<File[]>([]);
  protected hintFiles = signal<File[]>([]);
  protected errorFiles = signal<File[]>([]);
  protected disabledFiles = signal<File[]>([]);
  protected requiredFiles = signal<File[]>([]);
  protected nameFiles = signal<File[]>([]);
  protected twoWayFiles = signal<File[]>([]);
  protected fullDocuments = signal<File[]>([]);
  protected fullSingleFile = signal<File[]>([]);
  protected statesErrorFiles = signal<File[]>([]);

  /**
   * Handles `fileChange` from the basic demo.
   *
   * @param files The newly selected files.
   *
   * @returns void
   */
  protected onBasicFileChange(files: File[]): void {
    this.basicFiles.set(files);
  }

  /**
   * Handles `fileChange` from the accept PDF demo.
   *
   * @param files The newly selected files.
   *
   * @returns void
   */
  protected onAcceptPdfChange(files: File[]): void {
    this.acceptPdfFiles.set(files);
  }

  /**
   * Handles `fileChange` from the accept image demo.
   *
   * @param files The newly selected files.
   *
   * @returns void
   */
  protected onAcceptImageChange(files: File[]): void {
    this.acceptImageFiles.set(files);
  }

  /**
   * Handles `fileChange` from the multiple files demo.
   *
   * @param files The newly selected files.
   *
   * @returns void
   */
  protected onMultipleFileChange(files: File[]): void {
    this.multipleFiles.set(files);
  }

  /**
   * Handles `fileChange` from the two-way binding demo.
   *
   * @param files The newly selected files.
   *
   * @returns void
   */
  protected onTwoWayFileChange(files: File[]): void {
    this.twoWayFiles.set(files);
  }

  /**
   * Handles `fileChange` from the full example.
   *
   * @param files The newly selected files.
   *
   * @returns void
   */
  protected onFullFileChange(files: File[]): void {
    this.fullDocuments.set(files);
  }

  /**
   * Handles `fileChange` from the full single file demo.
   *
   * @param files The newly selected files.
   *
   * @returns void
   */
  protected onFullSingleFileChange(files: File[]): void {
    this.fullSingleFile.set(files);
  }

  /**
   * Clears all files in the full example.
   *
   * @returns void
   */
  protected clearFullFiles(): void {
    this.fullDocuments.set([]);
    this.fullSingleFile.set([]);
  }

  /**
   * Formats file size for display.
   *
   * @param bytes File size in bytes.
   *
   * @returns Formatted size string.
   */
  protected formatFileSize(bytes: number): string {
    if (bytes === 0) {
      return '0 B';
    }

    const units = ['B', 'KB', 'MB', 'GB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = bytes / Math.pow(1024, index);

    return `${size.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
  }
}
