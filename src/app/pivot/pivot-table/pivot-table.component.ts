import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Column } from '../../model/column';
import { ChangeNotificationService } from '../change-notification.service';
import { Subscription } from 'rxjs';

declare const $: any;
declare const saveSvgAsPng: any;

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

  private readonly _pivotUIRows = 'pivotUIRows';
  private readonly _pivotUICols = 'pivotUICols';
  private readonly _pivotUIVals = 'pivotUIVals';
  private readonly _pivotUIRendererName = 'pivotUIRendererName';
  private readonly _pivotUIAggregatorName = 'pivotUIAggregatorName';

  private static serializeSVGContent(svgElement) {
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElement);

    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
      source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
  }

  private static getSvgElement() {
    const svgElements: HTMLCollectionOf<SVGSVGElement> = document.getElementsByTagName('svg');
    let svgElement: SVGSVGElement;

    if (svgElements && svgElements.length > 0) {
      svgElement = svgElements[0];
    }
    return svgElement;
  }

  private static triggerDownload(dataURL: string, chartFilename: string) {
    const a = window.document.createElement('a');
    a.href = dataURL;
    a.download = chartFilename;
    document.body.appendChild(a);
    a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
    document.body.removeChild(a);
  }

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

  exportCurrentChartAsSVGFile(): void {
    const svgElement = PivotTableComponent.getSvgElement();

    if (svgElement) {
      const dataURL = PivotTableComponent.serializeSVGContent(svgElement);
      const chartFilename = 'chart.svg';

      PivotTableComponent.triggerDownload(dataURL, chartFilename);
    }
  }

  exportCurrentChartAsPNGFile(): void {
    const svgElement = PivotTableComponent.getSvgElement();
    saveSvgAsPng(svgElement, 'chart.png');
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

    let rows = this.rows.map((row) => row.field );
    let columns = this.columns.map((column) => column.field );
    let vals: string[] = [];

    const renderers = $.extend(
      $.pivotUtilities.renderers,
      $.pivotUtilities.c3_renderers
    );

    let rendererName = 'Bar Chart';
    let aggregatorName = 'Sum';

    const storedRows = localStorage.getItem(this._pivotUIRows);
    if (storedRows) {
      rows = JSON.parse(storedRows);
    }
    const storedColumns = localStorage.getItem(this._pivotUICols);
    if (storedColumns) {
      columns = JSON.parse(storedColumns);
    }
    const storedVals = localStorage.getItem(this._pivotUIVals);
    if (storedVals) {
      vals = JSON.parse(storedVals);
    }
    const storedRendererName = localStorage.getItem(this._pivotUIRendererName);
    if (storedRendererName) {
      rendererName = storedRendererName;
    }
    const storedAggregatorName = localStorage.getItem(this._pivotUIAggregatorName);
    if (storedAggregatorName) {
      aggregatorName = storedAggregatorName;
    }

    const pivotUIRows = this._pivotUIRows;
    const pivotUICols = this._pivotUICols;
    const pivotUIVals = this._pivotUIVals;
    const pivotUIRendererName = this._pivotUIRendererName;
    const pivotUIAggregatorName = this._pivotUIAggregatorName;

    let pivotUIConfig = {
      rows: rows,
      cols: columns,
      vals: vals,
      renderers: renderers,
      rendererName: rendererName,
      aggregatorName: aggregatorName,
      onRefresh: function(config) {
        localStorage.setItem(pivotUIRows, JSON.stringify(config.rows));
        localStorage.setItem(pivotUICols, JSON.stringify(config.cols));
        localStorage.setItem(pivotUIVals, JSON.stringify(config.vals));
        localStorage.setItem(pivotUIRendererName, config.rendererName);
        localStorage.setItem(pivotUIAggregatorName, config.aggregatorName);
      }
    };

    targetElement.pivotUI(
      this.data,
      pivotUIConfig
    );

    const scrollToElement: Element = document.querySelector('#pivot-table-buttons');
    if (scrollToElement) {
      scrollToElement
        .scrollIntoView();
    }
  }
}
