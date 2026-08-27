import { PAGINATION_PAGE_SIZE_OPTIONS } from './pagination.const';

export interface IPaginationEvent {
  page?: number;
  rowsPerPage?: number;
  type: 'pageChange' | 'pageSizeChange' | 'nextPage' | 'previousPage';
}

export type PageSizeOptionType = (typeof PAGINATION_PAGE_SIZE_OPTIONS)[number];
