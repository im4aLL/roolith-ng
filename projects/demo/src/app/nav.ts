export interface IDocNavLink {
  label: string;
  route: string;
  fragment?: string;
}

export interface IDocNavGroup {
  title: string;
  links: IDocNavLink[];
}

export interface IComponentMeta {
  label: string;
  slug: string;
  description: string;
  route?: string;
}

/**
 * Catalog of all Roolith NG components.
 *
 * Slugs are hash fragments for the overview page (`/guide/components#<slug>`).
 * They are placeholder links until dedicated per-component pages are built,
 * at which point they can be updated to real routes (e.g. `/components/<slug>`).
 */
export const componentCatalog: IComponentMeta[] = [
  {
    label: 'Accordion',
    slug: 'accordion',
    description: 'A vertically stacked set of interactive headings that each reveal a section of content.',
    route: '/components/accordion',
  },
  {
    label: 'Badge',
    slug: 'badge',
    description: 'Displays a badge or a component that looks like a badge.',
    route: '/components/badge',
  },
  {
    label: 'Block Message',
    slug: 'block-message',
    description: 'A block-level alert for contextual feedback and notices.',
    route: '/components/block-message',
  },
  {
    label: 'Breadcrumb',
    slug: 'breadcrumb',
    description: 'Displays the path to the current resource using a hierarchy of links.',
    route: '/components/breadcrumb',
  },
  {
    label: 'Button',
    slug: 'button',
    description: 'Displays a button or a component that looks like a button.',
    route: '/components/button',
  },
  {
    label: 'Button Group',
    slug: 'button-group',
    description: 'Groups multiple buttons together in a single control.',
    route: '/components/button-group',
  },
  {
    label: 'Button Split',
    slug: 'button-split',
    description: 'A split button combining a content area with a separate action icon button.',
    route: '/components/button-split',
  },
  {
    label: 'Card',
    slug: 'card',
    description: 'Displays a card with header, content, and footer.',
    route: '/components/card',
  },
  {
    label: 'Checkbox',
    slug: 'checkbox',
    description: 'A control that allows the user to toggle between checked and not checked.',
    route: '/components/checkbox',
  },
  {
    label: 'Date Picker',
    slug: 'date-picker',
    description: 'An input for picking a date from a calendar.',
    route: '/components/date-picker',
  },
  {
    label: 'Date Time Picker',
    slug: 'date-time-picker',
    description: 'Combines date and time selection in a single control.',
    route: '/components/date-time-picker',
  },
  {
    label: 'Dialog',
    slug: 'dialog',
    description: 'A window overlaid on the primary window, rendering the content underneath inert.',
    route: '/components/dialog',
  },
  {
    label: 'Drawer',
    slug: 'drawer',
    description: 'A panel that slides out from the edge of the screen.',
    route: '/components/drawer',
  },
  {
    label: 'Dropdown',
    slug: 'dropdown',
    description: 'Displays a menu to the user - such as a set of actions or functions - triggered by a button.',
    route: '/components/dropdown',
  },
  {
    label: 'File Input',
    slug: 'file-input',
    description: 'An input field for uploading files.',
    route: '/components/file-input',
  },
  {
    label: 'Filter',
    slug: 'filter',
    description: 'Declarative filter UI with fields and a client-side engine.',
    route: '/components/filter',
  },
  {
    label: 'Filter Button',
    slug: 'filter-button',
    description: 'A popover-driven filter control with searchable list, badges and clear action.',
    route: '/components/filter-button',
  },
  {
    label: 'Icon',
    slug: 'icon',
    description: 'Renders an icon from the library set.',
    route: '/components/icon',
  },
  {
    label: 'List',
    slug: 'list',
    description: 'Displays a list of items with consistent spacing and dividers.',
    route: '/components/list',
  },
  {
    label: 'Loader',
    slug: 'loader',
    description: 'Shows a loading indicator for async operations.',
    route: '/components/loader',
  },
  {
    label: 'Message',
    slug: 'message',
    description: 'Inline feedback for form fields and contextual alerts.',
    route: '/components/message',
  },
  {
    label: 'Multi Select',
    slug: 'multi-select',
    description: 'Select multiple values from a list of options.',
    route: '/components/multi-select',
  },
  {
    label: 'Nav',
    slug: 'nav',
    description: 'An accessible navigation menu with grouping and routing.',
    route: '/components/nav',
  },
  {
    label: 'Number Input',
    slug: 'number-input',
    description: 'An input field for numeric values with step controls.',
    route: '/components/number-input',
  },
  {
    label: 'Pagination',
    slug: 'pagination',
    description: 'Navigation for paged data with page size and controls.',
    route: '/components/pagination',
  },
  {
    label: 'Popover',
    slug: 'popover',
    description: 'Displays rich content in a portal, triggered by a button.',
    route: '/components/popover',
  },
  {
    label: 'Progress',
    slug: 'progress',
    description: 'Displays an indicator showing completion progress of a task.',
    route: '/components/progress',
  },
  {
    label: 'Radio',
    slug: 'radio',
    description: 'A set of checkable buttons where no more than one can be checked at a time.',
    route: '/components/radio',
  },
  {
    label: 'Search Input',
    slug: 'search-input',
    description: 'A text input optimized for search queries.',
    route: '/components/search-input',
  },
  {
    label: 'Select',
    slug: 'select',
    description: 'Displays a list of options for the user to pick from - triggered by a button.',
    route: '/components/select-input',
  },
  {
    label: 'Select Plain',
    slug: 'select-plain',
    description: 'A native-styled select without overlay styling.',
    route: '/components/select-plain',
  },
  {
    label: 'Switch',
    slug: 'switch',
    description: 'A control that allows the user to toggle between checked and not checked.',
    route: '/components/switch',
  },
  {
    label: 'Tab',
    slug: 'tab',
    description: 'A set of layered sections of content - known as tab panels - displayed one at a time.',
    route: '/components/tab',
  },
  {
    label: 'Table',
    slug: 'table',
    description: 'A responsive data table with sorting, selection and pagination.',
    route: '/components/table',
  },
  {
    label: 'Text Input',
    slug: 'text-input',
    description: 'A single-line text field for short-form entries.',
    route: '/components/text-input',
  },
  {
    label: 'Textarea',
    slug: 'textarea',
    description: 'A multi-line text input for longer content.',
    route: '/components/textarea',
  },
  {
    label: 'Time Picker',
    slug: 'time-picker',
    description: 'An input for picking a time value.',
    route: '/components/time-picker',
  },
  {
    label: 'Toast',
    slug: 'toast',
    description: 'A succinct message that is displayed temporarily.',
    route: '/components/toast',
  },
  {
    label: 'Toggle Group',
    slug: 'toggle-group',
    description: 'A segmented control that renders a list of buttons where one item can be active at a time.',
    route: '/components/toggle-group',
  },
  {
    label: 'Tooltip',
    slug: 'tooltip',
    description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    route: '/components/tooltip',
  },
];

export const docNav: IDocNavGroup[] = [
  {
    title: 'Getting Started',
    links: [{ label: 'Introduction', route: '/guide/getting-started' }],
  },
  {
    title: 'Guides',
    links: [{ label: 'Theming', route: '/guide/theming' }],
  },
  {
    title: 'Components',
    links: [
      { label: 'Overview', route: '/guide/components' },
      ...componentCatalog.map((component) => ({
        label: component.label,
        route: component.route ?? '/guide/components',
        ...(component.route ? {} : { fragment: component.slug }),
      })),
    ],
  },
];

export const topNavLinks: IDocNavLink[] = [
  { label: 'Getting Started', route: '/guide/getting-started' },
  { label: 'Theming', route: '/guide/theming' },
  { label: 'Components', route: '/guide/components' },
];
