import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotComponent } from './pivot.component';
import { TableModule } from 'primeng/table';
import { PivotTableComponent } from "./pivot-table/pivot-table.component";
import {
  DialogModule,
  DropdownModule,
  InputTextModule,
  MultiSelectModule,
  ProgressSpinnerModule
} from "primeng";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

describe('PivotComponent', () => {
  let component: PivotComponent;
  let fixture: ComponentFixture<PivotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PivotComponent,
        PivotTableComponent
      ],
      imports: [
        FormsModule,
        TableModule,
        DropdownModule,
        InputTextModule,
        MultiSelectModule,
        ProgressSpinnerModule,
        RouterTestingModule,
        DialogModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              pivotUIRendererName: 'Stacked Bar Chart',
              pivotUIAggregatorName: 'Median'
            })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly initialise column data types', () => {
    expect(component.selectedColumns).toEqual([
      {
        "field": "brand",
        "header": "brand",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": false
      }, {
        "field": "lastYearSale",
        "header": "lastYearSale",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": false
      }, {
        "field": "thisYearSale",
        "header": "thisYearSale",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": false
      }, {
        "field": "lastYearProfit",
        "header": "lastYearProfit",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": false
      }, {
        "field": "thisYearProfit",
        "header": "thisYearProfit",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": false
      }, {
        "field": "salesperson",
        "header": "salesperson",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": false
      }, {
        "field": "eligible",
        "header": "eligible",
        "filterMatchMode": "equals",
        "isBoolean": true,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": false
      }, {
        "field": "accountEmailAddress",
        "header": "accountEmailAddress",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": true,
        "isHttpUrl": false
      }, {
        "field": "accountUrl",
        "header": "accountUrl",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": true
      }, {
        "field": "numberOfRetailOutlets",
        "header": "numberOfRetailOutlets",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": true,
        "isEmailAddress": false,
        "isHttpUrl": false
      }
    ]);

    expect(component.selectedColumns).toEqual([
      {
        "field": "brand",
        "header": "brand",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": false
      }, {
        "field": "lastYearSale",
        "header": "lastYearSale",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": false
      }, {
        "field": "thisYearSale",
        "header": "thisYearSale",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": false
      }, {
        "field": "lastYearProfit",
        "header": "lastYearProfit",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": false
      }, {
        "field": "thisYearProfit",
        "header": "thisYearProfit",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": false
      }, {
        "field": "salesperson",
        "header": "salesperson",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": false
      }, {
        "field": "eligible",
        "header": "eligible",
        "filterMatchMode": "equals",
        "isBoolean": true,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": false
      }, {
        "field": "accountEmailAddress",
        "header": "accountEmailAddress",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": true,
        "isHttpUrl": false
      }, {
        "field": "accountUrl",
        "header": "accountUrl",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": false,
        "isEmailAddress": false,
        "isHttpUrl": true
      }, {
        "field": "numberOfRetailOutlets",
        "header": "numberOfRetailOutlets",
        "filterMatchMode": "contains",
        "isBoolean": false,
        "isNumeric": true,
        "isEmailAddress": false,
        "isHttpUrl": false
      }
    ]);
  });

  it('should have pivot table settings from URL query parameters', () => {
    expect(localStorage.getItem('pivotUIRendererName')).toBe('Stacked Bar Chart');
    expect(localStorage.getItem('pivotUIAggregatorName')).toBe('Median');
  });
});
