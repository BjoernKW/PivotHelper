import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotComponent } from './pivot.component';
import { TableModule } from 'primeng/table';
import { PivotTableComponent } from "./pivot-table/pivot-table.component";
import { DropdownModule, InputTextModule, MultiSelectModule, ProgressSpinnerModule } from "primeng/primeng";
import { FormsModule } from "@angular/forms";

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
        ProgressSpinnerModule
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
