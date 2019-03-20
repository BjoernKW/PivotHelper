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
} from "primeng/primeng";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

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
});
