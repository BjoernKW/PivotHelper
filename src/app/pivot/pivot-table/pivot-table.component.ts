import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Column } from '../../model/column';
import { ChangeNotificationService } from '../change-notification.service';
import { Subscription } from 'rxjs';

declare const $: any;

@Component({
  selector: 'app-pivot-table',
  templateUrl: './pivot-table.component.html',
  styleUrls: ['./pivot-table.component.scss']
})
export class PivotTableComponent implements OnInit, OnDestroy {

  @Input() data: {}[];
  @Input() rows: Array<Column>;
  @Input() columns: Array<Column>;

  private _selectionChangedSubscription: Subscription;

  constructor(
    private _elementRef: ElementRef,
    private _changeNotificationService: ChangeNotificationService
  ) {
  }

  ngOnInit() {
    this._changeNotificationService.selectionChanged$.subscribe((data) => {
      if (data && data.length > 0) {
        this.data = data;
        this.buildPivotTableAndChart();
      }
    });

    this.buildPivotTableAndChart();
  }

  ngOnDestroy(): void {
    if (this._selectionChangedSubscription) {
      this._selectionChangedSubscription.unsubscribe();
    }
  }

  private buildPivotTableAndChart() {
    if (!this._elementRef ||
      !this._elementRef.nativeElement ||
      !this._elementRef.nativeElement.children) {
      return;
    }

    const container = this._elementRef.nativeElement;
    const targetElement = $(container).find('#pivot-table');

    if (!targetElement) {
      return;
    }

    const rows = this.rows.map((row) => row.field );
    const columns = this.columns.map((column) => column.field );

    const renderers = $.extend(
      $.pivotUtilities.renderers,
      $.pivotUtilities.c3_renderers
    );

    targetElement.pivotUI(
      this.data,
      {
        rows: rows,
        cols: columns,
        renderers: renderers,
        rendererName: 'Bar Chart',
        aggregatorName: 'Sum'
      }
    );
  }
}
