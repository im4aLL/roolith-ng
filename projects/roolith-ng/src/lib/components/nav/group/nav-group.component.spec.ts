import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavGroupComponent } from './nav-group.component';
import { INav, INavClickEvent, INavGroup } from '../data-access/nav.interface';

const mockNav: INav = {
  id: 'item-1',
  name: 'Dashboard',
  link: '/dashboard',
  isActive: false,
};

const mockNavGroup: INavGroup = {
  id: 'group-1',
  name: 'Main',
  items: [mockNav],
};

describe('NavGroupComponent', () => {
  let component: NavGroupComponent;
  let fixture: ComponentFixture<NavGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavGroupComponent);
    fixture.componentRef.setInput('data', [mockNavGroup]);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onNavClick', () => {
    it('should emit clickEvent with the item and groupId', () => {
      const emitted: INavClickEvent[] = [];
      component.clickEvent.subscribe((event) => emitted.push(event));

      component.onNavClick(mockNav, 'group-1');

      expect(emitted).toHaveLength(1);
      expect(emitted[0]).toEqual({ item: mockNav, groupId: 'group-1' });
    });

    it('should emit a new event for each call', () => {
      const emitted: INavClickEvent[] = [];
      component.clickEvent.subscribe((event) => emitted.push(event));

      component.onNavClick(mockNav, 'group-1');
      component.onNavClick(mockNav, 'group-2');

      expect(emitted).toHaveLength(2);
      expect(emitted[1].groupId).toBe('group-2');
    });
  });
});
