import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';
import { AccordionItemComponent } from './item/accordion-item.component';
import { IAccordionEvent } from './data-access/accordion.interface';

@Component({
  template: `
    <rng-accordion [allowMultiple]="allowMultiple">
      <rng-accordion-item header="Item 1" />
      <rng-accordion-item header="Item 2" />
      <rng-accordion-item header="Item 3" />
    </rng-accordion>
  `,
  imports: [AccordionComponent, AccordionItemComponent],
})
class TestHostComponent {
  public allowMultiple = false;
}

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.children[0].componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('_init', () => {
    it('should expand the first item on init when no item is expanded', () => {
      const firstItem = component.items()[0];

      expect(firstItem.expanded()).toBe(true);
    });

    it('should not expand the first item when an item is already expanded', async () => {
      component.items()[0].expanded.set(false);
      component.items()[1].expanded.set(true);
      component['_init']();

      expect(component.items()[0].expanded()).toBe(false);
    });

    it('should mark the last item as lastChild', () => {
      const lastItem = component.items()[component.items().length - 1];

      expect(lastItem.lastChild()).toBe(true);
    });
  });

  describe('_hasExpandedItem', () => {
    it('should return true when at least one item is expanded', () => {
      component.items()[0].expanded.set(true);

      expect(component['_hasExpandedItem']()).toBe(true);
    });

    it('should return false when no item is expanded', () => {
      component.items().forEach((item) => item.expanded.set(false));

      expect(component['_hasExpandedItem']()).toBe(false);
    });
  });

  describe('_collapseAllItemsExcept', () => {
    it('should collapse all items except the provided one', () => {
      const [first, second, third] = component.items();
      first.expanded.set(true);
      second.expanded.set(true);
      third.expanded.set(true);

      component['_collapseAllItemsExcept'](second);

      expect(first.expanded()).toBe(false);
      expect(second.expanded()).toBe(true);
      expect(third.expanded()).toBe(false);
    });
  });

  describe('_updateLastChild', () => {
    it('should set lastChild to true only on the last item', () => {
      component.items().forEach((item) => item.lastChild.set(false));
      component['_updateLastChild']();

      const items = component.items();
      expect(items[0].lastChild()).toBe(false);
      expect(items[1].lastChild()).toBe(false);
      expect(items[2].lastChild()).toBe(true);
    });
  });

  describe('_watchExpandedItem effect', () => {
    it('should emit changeEvent when an item emits changeEvent', async () => {
      const emitted: IAccordionEvent[] = [];
      component.changeEvent.subscribe((event) => emitted.push(event));

      component.items()[1].changeEvent.emit(true);

      expect(emitted).toHaveLength(1);
      expect(emitted[0]).toEqual({ expanded: true, itemIndex: 1, itemHeader: 'Item 2' });
    });

    it('should collapse other items when an item expands and allowMultiple is false', async () => {
      const [first, second] = component.items();
      first.expanded.set(true);

      second.changeEvent.emit(true);

      expect(first.expanded()).toBe(false);
    });

    describe('when allowMultiple is true', () => {
      let multiFixture: ComponentFixture<TestHostComponent>;
      let multiComponent: AccordionComponent;

      beforeEach(async () => {
        multiFixture = TestBed.createComponent(TestHostComponent);
        multiFixture.componentInstance.allowMultiple = true;
        multiComponent = multiFixture.debugElement.children[0].componentInstance;
        await multiFixture.whenStable();
      });

      it('should not collapse other items when allowMultiple is true', () => {
        const [first, second] = multiComponent.items();
        first.expanded.set(true);
        second.changeEvent.emit(true);

        expect(first.expanded()).toBe(true);
      });
    });
  });
});
