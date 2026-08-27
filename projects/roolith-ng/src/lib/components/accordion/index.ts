import { AccordionComponent } from './accordion.component';
import { AccordionItemComponent } from './item/accordion-item.component';

export * from './accordion.component';
export * from './item/accordion-item.component';
export * from './data-access/accordion.interface';

export const IMPORT_ACCORDION = [AccordionComponent, AccordionItemComponent] as const;
