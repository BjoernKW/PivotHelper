import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Column } from '../../model/column';

declare const $: any;

@Component({
  selector: 'app-pivot-table',
  templateUrl: './pivot-table.component.html',
  styleUrls: ['./pivot-table.component.scss']
})
export class PivotTableComponent implements OnInit {

  @Input() data: Array<Array<any>>;
  @Input() rows: Array<Column>;
  @Input() columns: Array<Column>;

  constructor(
    private _elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    this.buildPivot();
  }

  private buildPivot() {
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

    while (targetElement[0].firstChild) {
      targetElement[0].removeChild(targetElement[0].firstChild);
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
