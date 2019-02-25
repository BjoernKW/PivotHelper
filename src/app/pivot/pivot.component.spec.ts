import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotComponent } from './pivot.component';

describe('PivotComponent', () => {
  let component: PivotComponent;
  let fixture: ComponentFixture<PivotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PivotComponent
      ],
      imports: [
        PivotComponent
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
