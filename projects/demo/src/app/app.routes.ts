import { Routes } from '@angular/router';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', component: Home, title: 'Roolith Docs' },
  {
    path: 'guide/getting-started',
    loadComponent: () => import('./components/getting-started/getting-started').then((mod) => mod.GettingStarted),
    title: 'Getting Started',
  },
  {
    path: 'guide/theming',
    loadComponent: () => import('./components/theming/theming').then((mod) => mod.Theming),
    title: 'Theming',
  },
  {
    path: 'guide/ai-ready',
    loadComponent: () => import('./components/ai-ready/ai-ready').then((mod) => mod.AiReady),
    title: 'AI Ready',
  },
  {
    path: 'guide/components',
    loadComponent: () => import('./components/components/components').then((mod) => mod.Components),
    title: 'Components',
  },
  {
    path: 'components/accordion',
    loadComponent: () => import('./components/accordion/accordion').then((mod) => mod.Accordion),
    title: 'Accordion',
  },
  {
    path: 'components/badge',
    loadComponent: () => import('./components/badge/badge').then((mod) => mod.Badge),
    title: 'Badge',
  },
  {
    path: 'components/block-message',
    loadComponent: () => import('./components/block-message/block-message').then((mod) => mod.BlockMessage),
    title: 'Block Message',
  },
  {
    path: 'components/breadcrumb',
    loadComponent: () => import('./components/breadcrumb/breadcrumb').then((mod) => mod.Breadcrumb),
    title: 'Breadcrumb',
  },
  {
    path: 'components/button',
    loadComponent: () => import('./components/button/button').then((mod) => mod.Button),
    title: 'Button',
  },
  {
    path: 'components/button-group',
    loadComponent: () => import('./components/button-group/button-group').then((mod) => mod.ButtonGroup),
    title: 'Button Group',
  },
  {
    path: 'components/button-split',
    loadComponent: () => import('./components/button-split/button-split').then((mod) => mod.ButtonSplit),
    title: 'Button Split',
  },
  {
    path: 'components/card',
    loadComponent: () => import('./components/card/card').then((mod) => mod.Card),
    title: 'Card',
  },
  {
    path: 'components/checkbox',
    loadComponent: () => import('./components/checkbox/checkbox').then((mod) => mod.Checkbox),
    title: 'Checkbox',
  },
  {
    path: 'components/dialog',
    loadComponent: () => import('./components/dialog/dialog').then((mod) => mod.Dialog),
    title: 'Dialog',
  },
  {
    path: 'components/drawer',
    loadComponent: () => import('./components/drawer/drawer').then((mod) => mod.Drawer),
    title: 'Drawer',
  },
  {
    path: 'components/dropdown',
    loadComponent: () => import('./components/dropdown/dropdown').then((mod) => mod.Dropdown),
    title: 'Dropdown',
  },
  {
    path: 'components/date-picker',
    loadComponent: () => import('./components/date-picker/date-picker').then((mod) => mod.DatePicker),
    title: 'Date Picker',
  },
  {
    path: 'components/date-time-picker',
    loadComponent: () => import('./components/date-time-picker/date-time-picker').then((mod) => mod.DateTimePicker),
    title: 'Date Time Picker',
  },
  {
    path: 'components/time-picker',
    loadComponent: () => import('./components/time-picker/time-picker').then((mod) => mod.TimePicker),
    title: 'Time Picker',
  },
  {
    path: 'components/toast',
    loadComponent: () => import('./components/toast/toast').then((mod) => mod.Toast),
    title: 'Toast',
  },
  {
    path: 'components/toggle-group',
    loadComponent: () => import('./components/toggle-group/toggle-group').then((mod) => mod.ToggleGroup),
    title: 'Toggle Group',
  },
  {
    path: 'components/file-input',
    loadComponent: () => import('./components/file-input/file-input').then((mod) => mod.FileInput),
    title: 'File Input',
  },
  {
    path: 'components/filter',
    loadComponent: () => import('./components/filter/filter').then((mod) => mod.Filter),
    title: 'Filter',
  },
  {
    path: 'components/filter-button',
    loadComponent: () => import('./components/filter-button/filter-button').then((mod) => mod.FilterButton),
    title: 'Filter Button',
  },
  {
    path: 'components/icon',
    loadComponent: () => import('./components/icon/icon').then((mod) => mod.Icon),
    title: 'Icon',
  },
  {
    path: 'components/list',
    loadComponent: () => import('./components/list/list').then((mod) => mod.List),
    title: 'List',
  },
  {
    path: 'components/loader',
    loadComponent: () => import('./components/loader/loader').then((mod) => mod.Loader),
    title: 'Loader',
  },
  {
    path: 'components/message',
    loadComponent: () => import('./components/message/message').then((mod) => mod.Message),
    title: 'Message',
  },
  {
    path: 'components/multi-select',
    loadComponent: () => import('./components/multi-select/multi-select').then((mod) => mod.MultiSelect),
    title: 'Multi Select',
  },
  {
    path: 'components/nav',
    loadComponent: () => import('./components/nav/nav').then((mod) => mod.Nav),
    title: 'Nav',
  },
  {
    path: 'components/number-input',
    loadComponent: () => import('./components/number-input/number-input').then((mod) => mod.NumberInput),
    title: 'Number Input',
  },
  {
    path: 'components/pagination',
    loadComponent: () => import('./components/pagination/pagination').then((mod) => mod.Pagination),
    title: 'Pagination',
  },
  {
    path: 'components/popover',
    loadComponent: () => import('./components/popover/popover').then((mod) => mod.Popover),
    title: 'Popover',
  },
  {
    path: 'components/progress',
    loadComponent: () => import('./components/progress/progress').then((mod) => mod.Progress),
    title: 'Progress',
  },
  {
    path: 'components/radio',
    loadComponent: () => import('./components/radio/radio').then((mod) => mod.Radio),
    title: 'Radio',
  },
  {
    path: 'components/search-input',
    loadComponent: () => import('./components/search-input/search-input').then((mod) => mod.SearchInput),
    title: 'Search Input',
  },
  {
    path: 'components/select-input',
    loadComponent: () => import('./components/select-input/select-input').then((mod) => mod.SelectInput),
    title: 'Select',
  },
  {
    path: 'components/select',
    loadComponent: () => import('./components/select-input/select-input').then((mod) => mod.SelectInput),
    title: 'Select',
  },
  {
    path: 'components/select-plain',
    loadComponent: () => import('./components/select-plain/select-plain').then((mod) => mod.SelectPlain),
    title: 'Select Plain',
  },
  {
    path: 'components/switch',
    loadComponent: () => import('./components/switch/switch').then((mod) => mod.Switch),
    title: 'Switch',
  },
  {
    path: 'components/text-input',
    loadComponent: () => import('./components/text-input/text-input').then((mod) => mod.TextInput),
    title: 'Text Input',
  },
  {
    path: 'components/textarea',
    loadComponent: () => import('./components/textarea/textarea').then((mod) => mod.Textarea),
    title: 'Textarea',
  },
  {
    path: 'components/textarea-input',
    loadComponent: () => import('./components/textarea/textarea').then((mod) => mod.Textarea),
    title: 'Textarea',
  },
  {
    path: 'components/tab',
    loadComponent: () => import('./components/tab/tab').then((mod) => mod.Tab),
    title: 'Tab',
  },
  {
    path: 'components/table',
    loadComponent: () => import('./components/table/table').then((mod) => mod.Table),
    title: 'Table',
  },
  {
    path: 'components/tooltip',
    loadComponent: () => import('./components/tooltip/tooltip').then((mod) => mod.Tooltip),
    title: 'Tooltip',
  },
  { path: '**', redirectTo: '' },
];
