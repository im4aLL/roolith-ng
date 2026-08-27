import { IFilterData, IFilterItem } from "../components/filter/data-access/filter.interface";


export class FilterEngine<T extends Record<string, unknown>> {
  constructor(private filters: IFilterData[]) {}

  /**
   * Applies the defined filters to the provided collection of data.
   *
   * @param collection T[]
   * @returns T[]
   */
  apply(collection: T[]): T[] {
    return collection.filter((row) => this.filters.every((filterGroup) => this.evaluateGroup(row, filterGroup)));
  }

  /**
   * Evaluates a filter group against a single row of data.
   *
   * @param row T
   * @param filterGroup IFilterData
   * @returns boolean
   */
  private evaluateGroup(row: T, filterGroup: IFilterData): boolean {
    if (filterGroup.field === '*') {
      return Object.values(row).some((fieldValue) =>
        filterGroup.items.some((filterItem) => this.evaluateCondition(fieldValue, filterItem)),
      );
    }

    const fieldValue = row[filterGroup.field];

    return filterGroup.items.reduce<boolean>((result, filterItem, index) => {
      const isMatches = this.evaluateCondition(fieldValue, filterItem);

      if (index === 0) {
        return isMatches;
      }

      return filterItem.operator === 'and' ? result && isMatches : result || isMatches;
    }, true);
  }

  /**
   * Evaluates a single filter condition against the provided field value.
   *
   * @param fieldValue unknown
   * @param filterItem IFilterItem
   * @returns boolean
   */
  private evaluateCondition(fieldValue: unknown, filterItem: IFilterItem): boolean {
    const { filterType, value } = filterItem;

    switch (filterType) {
      case 'equals':
        return fieldValue === value;

      case 'contains':
        return `${fieldValue}`.toLowerCase().includes(`${value}`.toLowerCase());

      default:
        return false;
    }
  }
}
