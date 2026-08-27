import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableCheckboxComponent } from './table-checkbox.component';

describe('TableCheckboxComponent', () => {
  let component: TableCheckboxComponent;
  let fixture: ComponentFixture<TableCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableCheckboxComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
