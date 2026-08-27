import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateTime } from 'luxon';
import {
  BadgeComponent,
  ButtonComponent,
  DatePickerInputComponent,
  IMPORT_CARD,
  ISelectInput,
  ITableColumn,
  ITableData,
  SelectInputComponent,
  TableCellDirective,
  TableComponent,
  TextInputComponent,
} from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';

interface IFeature {
  icon: string;
  title: string;
  text: string;
  code: string;
  codeLang: string;
}

interface IStat {
  value: string;
  label: string;
}

interface ICatalogueCard {
  icon: string;
  title: string;
  text: string;
  pills: string[];
}

@Component({
  selector: 'rng-doc-home',
  imports: [
    RouterLink,
    ...IMPORT_CARD,
    ButtonComponent,
    BadgeComponent,
    TextInputComponent,
    SelectInputComponent,
    DatePickerInputComponent,
    TableComponent,
    TableCellDirective,
    CodeBlock,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly installCmd = 'npm install @im4all/roolith-ng';
  protected readonly peerCmd = 'npm install @angular/common @angular/core @angular/forms';
  protected readonly scssSnippet = `@use '@im4all/roolith-ng/sass/rng-scss' as rng;
@include rng.rng-everything();`;
  protected readonly formsSnippet = `import { FormsModule, ReactiveFormsModule } from '@angular/forms';`;
  protected readonly heroHint = 'Peer deps: @angular/core, @angular/common, @angular/forms - Works with ReactiveForms & FormsModule';
  protected readonly exampleCode = `import { Component } from '@angular/core';
import { ButtonComponent, CardComponent } from '@im4all/roolith-ng';

@Component({
  selector: 'app-example',
  imports: [ButtonComponent, CardComponent],
  template: \`
    <rng-card>
      <rng-button variant="primary">Get started</rng-button>
    </rng-card>
  \`,
})
export class ExampleComponent {}`;

  // Preview - real library components demo data
  protected previewCustomer = 'Acme Corp.';
  protected previewAmount = '4,250.00';
  protected previewDueDate: DateTime | null = DateTime.now().plus({ days: 14 });
  protected previewStatusOptions: ISelectInput[] = [
    { label: 'Paid', value: 'paid' },
    { label: 'Pending', value: 'pending' },
    { label: 'Draft', value: 'draft' },
  ];
  protected previewStatus: ISelectInput | undefined = this.previewStatusOptions[1];

  protected previewTableColumns: ITableColumn[] = [
    { field: 'customer', label: 'Customer' },
    { field: 'status', label: 'Status' },
    { field: 'amount', label: 'Amount', align: 'right' },
  ];

  protected previewTableData: ITableData[] = [
    { customer: 'Acme Corp.', status: 'Paid', amount: '$4,250' },
    { customer: 'Stark Ltd.', status: 'Pending', amount: '$1,800' },
    { customer: 'Wayne Ent.', status: 'Draft', amount: '$9,400' },
  ];

  protected readonly toastMessage = signal<string | null>(null);
  protected readonly ctaCopied = signal(false);

  private toastTimer: ReturnType<typeof setTimeout> | undefined;
  private ctaCopyTimer: ReturnType<typeof setTimeout> | undefined;

  protected readonly stats: IStat[] = [
    { value: '26+', label: 'Components & primitives' },
    { value: 'Angular 21+', label: 'Standalone, no NgModule' },
    { value: '100%', label: 'SCSS token theming' },
    { value: '0', label: 'Global side effects' },
  ];

  protected readonly features: IFeature[] = [
    {
      icon: 'iconoir-code',
      title: 'Standalone first',
      text: 'Import what you need directly. No NgModule ceremony, fully tree-shakable and lazy-load friendly.',
      code: "import { ButtonComponent } from '@im4all/roolith-ng'",
      codeLang: 'typescript',
    },
    {
      icon: 'iconoir-input-field',
      title: 'Forms-ready',
      text: 'All inputs work with ReactiveForms and ngModel out of the box. Validation, disabled and error states included.',
      code: '<rng-text-input formControlName="email" />',
      codeLang: 'html',
    },
    {
      icon: 'iconoir-table',
      title: 'Data-heavy building blocks',
      text: 'Table with sorting, selection and pagination. Filters with FilterEngine, plus export helpers.',
      code: '<rng-table [data]="rows" sortable />',
      codeLang: 'html',
    },
    {
      icon: 'iconoir-multi-window',
      title: 'Overlay primitives',
      text: 'Dialog, Drawer, Dropdown, Popover, Tooltip and Toast - focus trapping, stacking and a11y handled.',
      code: 'DialogService.open(ConfirmDialog)',
      codeLang: 'typescript',
    },
    {
      icon: 'iconoir-palette',
      title: 'Token-driven theming',
      text: 'Design tokens via SCSS. Override variables or CSS custom properties without forking components.',
      code: '@include rng.rng-everything();',
      codeLang: 'scss',
    },
    {
      icon: 'iconoir-flash',
      title: 'Zero side effects',
      text: 'Ships with sideEffects: false. Minimal deps - only lodash-es, luxon and tslib.',
      code: '"sideEffects": false',
      codeLang: 'json',
    },
  ];

  protected readonly catalogue: ICatalogueCard[] = [
    {
      icon: 'iconoir-view-grid',
      title: 'Layout',
      text: 'Structure pages without custom CSS.',
      pills: ['Card', 'Accordion', 'Tab', 'Drawer', 'Nav', 'List'],
    },
    {
      icon: 'iconoir-flash',
      title: 'Buttons',
      text: 'All states, variants and a11y baked in.',
      pills: ['Button', 'ButtonGroup', 'ButtonSplit', 'ToggleGroup', 'Badge', 'Icon'],
    },
    {
      icon: 'iconoir-input-field',
      title: 'Inputs',
      text: '14 inputs that play nice with Angular forms.',
      pills: [
        'Text',
        'Number',
        'Textarea',
        'Select',
        'MultiSelect',
        'File',
        'DatePicker',
        'TimePicker',
        'Switch',
        'Checkbox',
        'Radio',
      ],
    },
    {
      icon: 'iconoir-table',
      title: 'Data display',
      text: 'From tables to progress and loaders.',
      pills: ['Table', 'Pagination', 'Breadcrumb', 'Progress', 'Tooltip', 'Popover', 'Loader'],
    },
    {
      icon: 'iconoir-multi-window',
      title: 'Overlay',
      text: 'Floating UI without the headache.',
      pills: ['Dialog', 'Drawer', 'Dropdown', 'Popover', 'Toast'],
    },
    {
      icon: 'iconoir-filter',
      title: 'Filtering',
      text: 'Declarative filters + client-side engine.',
      pills: ['Filter', 'FilterButton', 'FilterEngine', 'FilterField'],
    },
  ];

  /**
   * Formats a zero-based index as a two-digit string.
   *
   * @param index The zero-based index.
   *
   * @returns The padded index string.
   */
  protected formatIndex(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  /**
   * Handles a successful copy from a code block and shows a toast.
   *
   * @returns void
   */
  protected onCopied(): void {
    this.showToast('Copied to clipboard');
  }

  /**
   * Copies plain text for the CTA button and shows feedback.
   *
   * @param text The text to copy.
   *
   * @returns void
   */
  protected async copyText(text: string): Promise<void> {
    const isCopied = await this.writeClipboard(text);

    if (isCopied) {
      this.ctaCopied.set(true);
      this.showToast('Copied to clipboard');
      clearTimeout(this.ctaCopyTimer);
      this.ctaCopyTimer = setTimeout(() => this.ctaCopied.set(false), 1600);
    } else {
      this.showToast('Copy failed - please copy manually');
    }
  }

  /**
   * Shows a transient toast message.
   *
   * @param message The message to display.
   *
   * @returns void
   */
  private showToast(message: string): void {
    this.toastMessage.set(message);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastMessage.set(null), 1800);
  }

  /**
   * Writes text to clipboard with fallback for insecure contexts.
   *
   * @param text The text to write.
   *
   * @returns Whether the write succeeded.
   */
  private async writeClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fall through to execCommand fallback
    }

    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const isSuccess = document.execCommand('copy');
    area.remove();
    return isSuccess;
  }
}
