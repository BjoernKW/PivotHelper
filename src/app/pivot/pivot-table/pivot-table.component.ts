import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Column } from '../../model/column';

declare var $: any;

@Component({
  selector: 'app-pivot-table',
  templateUrl: './pivot-table.component.html',
  styleUrls: ['./pivot-table.component.scss']
})
export class PivotTableComponent implements OnInit {

  @Input() data: Array<Array<any>>;
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

    var container = this._elementRef.nativeElement;
    var targetElement = $(container).find('#pivot-table');

    if (!targetElement) {
      return;
    }

    while (targetElement.firstChild) {
      targetElement.removeChild(targetElement.firstChild);
    }

    const rows = this.columns.map((column) => column.field );

    const renderers = $.extend(
      $.pivotUtilities.renderers,
      $.pivotUtilities.c3_renderers
    );

    targetElement.pivotUI(
      this.data,
      {
        cols: rows,
        renderers: renderers,
      }
    );
  }
}
