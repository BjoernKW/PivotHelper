import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import { Matrix } from '../model/matrix';
import { Column } from '../model/column';
import { ChangeNotificationService } from './change-notification.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-pivot',
  templateUrl: './pivot.component.html',
  styleUrls: ['./pivot.component.scss']
})
export class PivotComponent implements OnInit {

  columns: Column[] = [];
  selectedColumns: Column[];
  columnsToRemoveFromData: Column[] = [];
  outputData: {}[] = [];
  originalOutputData: {}[];
  selectedRows: [];
  filteredRows: {}[];

  filterMatchModes = [
    { label: 'contains', value: 'contains' },
    { label: 'starts with', value: 'startsWith' },
    { label: 'ends with', value: 'endsWith' },
    { label: 'equals', value: 'equals' },
    { label: 'doesn\'t equal', value: 'notEquals' },
    { label: 'less than', value: 'lt' },
    { label: 'greater than', value: 'gt' }
  ];

  limitElements: number;

  constructor(
    private _changeNotificationService: ChangeNotificationService,
    private _activatedRoute: ActivatedRoute
  ) { }

  private readonly _selectedRows = 'selectedRows';
  private readonly _selectedColumns = 'selectedColumns';
  private readonly _columns = 'columns';
  private readonly _outputData = 'outputData';
  private readonly _originalOutputData = 'originalOutputData';
  private readonly _filters = 'filters';
  private readonly _filteredRows = 'filteredRows';
  private readonly _limitElements = 'limitElements';

  private readonly _pivotUIRows = 'pivotUIRows';
  private readonly _pivotUICols = 'pivotUICols';
  private readonly _pivotUIVals = 'pivotUIVals';
  private readonly _pivotUIRendererName = 'pivotUIRendererName';
  private readonly _pivotUIAggregatorName = 'pivotUIAggregatorName';

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams[this._selectedRows]) {
        localStorage.setItem(this._selectedRows, JSON.stringify(JSON.parse(queryParams[this._selectedRows])));
      }

      if (queryParams[this._selectedColumns]) {
        localStorage.setItem(this._selectedColumns, JSON.stringify(JSON.parse(queryParams[this._selectedColumns])));
      }
      if (queryParams[this._columns]) {
        localStorage.setItem(this._columns, JSON.stringify(JSON.parse(queryParams[this._columns])));
      }

      if (queryParams[this._outputData]) {
        localStorage.setItem(this._outputData, JSON.stringify(JSON.parse(queryParams[this._outputData])));
      }
      if (queryParams[this._originalOutputData]) {
        localStorage.setItem(this._originalOutputData, JSON.stringify(JSON.parse(queryParams[this._originalOutputData])));
      }

      if (queryParams[this._filters]) {
        localStorage.setItem(this._filters, JSON.stringify(JSON.parse(queryParams[this._filters])));
      }
      if (queryParams[this._filteredRows]) {
        localStorage.setItem(this._filteredRows, JSON.stringify(JSON.parse(queryParams[this._filteredRows])));
      }

      if (queryParams[this._limitElements]) {
        localStorage.setItem(this._limitElements, parseInt(queryParams[this._limitElements]).toString());
      }

      if (queryParams[this._pivotUIRows]) {
        localStorage.setItem(this._pivotUIRows, JSON.stringify(JSON.parse(queryParams[this._pivotUIRows])));
      }
      if (queryParams[this._pivotUICols]) {
        localStorage.setItem(this._pivotUICols, JSON.stringify(JSON.parse(queryParams[this._pivotUICols])));
      }
      if (queryParams[this._pivotUIVals]) {
        localStorage.setItem(this._pivotUIVals, JSON.stringify(JSON.parse(queryParams[this._pivotUIVals])));
      }
      if (queryParams[this._pivotUIRendererName]) {
        localStorage.setItem(this._pivotUIRendererName, queryParams[this._pivotUIRendererName]);
      }
      if (queryParams[this._pivotUIAggregatorName]) {
        localStorage.setItem(this._pivotUIAggregatorName, queryParams[this._pivotUIAggregatorName]);
      }
    });
    const columnHeaders = [
      'brand',
      'lastYearSale',
      'thisYearSale',
      'lastYearProfit',
      'thisYearProfit',
      'salesperson'
    ];
    for (const column of columnHeaders) {
      this.columns.push(
        {
          field: column,
          header: column,
          filterMatchMode: 'contains'
        }
      );
    }
    this.selectedColumns = this.columns;

    localStorage.setItem(this._selectedColumns, JSON.stringify(this.selectedColumns));
    localStorage.setItem(this._columns, JSON.stringify(this.columns));

    this.outputData = [
      {
        brand: 'Apple',
        lastYearSale: '51%',
        thisYearSale: '40%',
        lastYearProfit: '$54,406.00',
        thisYearProfit: '$43,342',
        salesperson: 'Smith'
      },
      {
        brand: 'Samsung',
        lastYearSale: '83%',
        thisYearSale: '96%',
        lastYearProfit: '$423,132',
        thisYearProfit: '$312,122',
        salesperson: 'Johnson'
      },
      {
        brand: 'Microsoft',
        lastYearSale: '38%',
        thisYearSale: '5%',
        lastYearProfit: '$12,321',
        thisYearProfit: '$8,500',
        salesperson: 'Smith'
      },
      {
        brand: 'Philips',
        lastYearSale: '49%',
        thisYearSale: '22%',
        lastYearProfit: '$745,232',
        thisYearProfit: '$650,323',
        salesperson: 'Johnson'
      },
      {
        brand: 'Song',
        lastYearSale: '17%',
        thisYearSale: '79%',
        lastYearProfit: '$643,242',
        thisYearProfit: '500,332',
        salesperson: 'Smith'
      },
      {
        brand: 'LG',
        lastYearSale: '52%',
        thisYearSale: ' 65%',
        lastYearProfit: '$421,132',
        thisYearProfit: '$150,005',
        salesperson: 'Jones'
      },
      {
        brand: 'Sharp',
        lastYearSale: '82%',
        thisYearSale: '12%',
        lastYearProfit: '$131,211',
        thisYearProfit: '$100,214',
        salesperson: 'Jones'
      },
      {
        brand: 'Panasonic',
        lastYearSale: '44%',
        thisYearSale: '45%',
        lastYearProfit: '$66,442',
        thisYearProfit: '$53,322',
        salesperson: 'Williams'
      },
      {
        brand: 'HTC',
        lastYearSale: '90%',
        thisYearSale: '56%',
        lastYearProfit: '$765,442',
        thisYearProfit: '$296,232',
        salesperson: 'Davis'
      },
      {
        brand: 'Toshiba',
        lastYearSale: '75%',
        thisYearSale: '54%',
        lastYearProfit: '$21,212',
        thisYearProfit: '$12,533',
        salesperson: 'Davis'
      }
    ];

    this.limitElements = this.outputData.length;

    localStorage.setItem(this._limitElements, this.limitElements.toString());
    localStorage.setItem(this._outputData, JSON.stringify(this.outputData));
  }

  onFileChange(fileChangeEvent: any) {
    this.outputData = [];
    this.selectedRows = [];

    localStorage.setItem(this._selectedRows, JSON.stringify(this.selectedRows));

    const target: DataTransfer = <DataTransfer>(fileChangeEvent.target);

    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();

    reader.onload = (onLoadEvent: any) => {
      const inputData: string = onLoadEvent.target.result;
      const workBook: XLSX.WorkBook = XLSX.read(inputData, { type: 'binary' });

      const workSheetName: string = workBook.SheetNames[0];
      const workSheet: XLSX.WorkSheet = workBook.Sheets[workSheetName];

      let data: Matrix = <Matrix>(XLSX.utils.sheet_to_json(workSheet, { header: 1 }));

      this.columns = [];
      for (const column of data[0]) {
        this.columns.push(
          {
            field: column,
            header: column,
            filterMatchMode: 'contains'
          }
        );
      }
      this.selectedColumns = this.columns;

      localStorage.setItem(this._selectedColumns, JSON.stringify(this.selectedColumns));
      localStorage.setItem(this._columns, JSON.stringify(this.columns));

      data = data.slice(1, data.length);

      for (const row of data) {
        const outputRow = {};

        let i = 0;
        for (const column of this.columns) {
          outputRow[column.field] = row[i];

          i++;
        }

        this.outputData.push(outputRow);
      }

      this.limitElements = this.outputData.length;

      localStorage.setItem(this._limitElements, this.limitElements.toString());
      localStorage.setItem(this._outputData, JSON.stringify(this.outputData));
    };

    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {
    const targetRows = this.getRowsWithDeselectedColumnsRemoved();
    const outputRows = this.convertSelectedRows(targetRows);

    const workSheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(outputRows);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');

    XLSX.writeFile(workBook, 'export.xlsx');
  }

  onRowSelectionChanged() {
    localStorage.setItem(this._selectedRows, JSON.stringify(this.selectedRows));

    this._changeNotificationService.onSelectionChanged(this.selectedRows);
  }

  onFilterChanged($event: { filters: {}, filteredValue: {}[] }) {
    if (Object.keys($event.filters).length > 0) {
      this.filteredRows = $event.filteredValue;
    } else {
      this.filteredRows = null;
    }

    localStorage.setItem(this._filters, JSON.stringify($event.filters));
    localStorage.setItem(this._filteredRows, JSON.stringify(this.filteredRows));

    this._changeNotificationService.onSelectionChanged($event.filteredValue);
  }

  onColumnSelectionChanged() {
    this.columnsToRemoveFromData = [];
    for (const column of this.columns) {
      if (!this.selectedColumns.includes(column)) {
        this.columnsToRemoveFromData.push(column);
      }
    }

    localStorage.setItem(this._selectedColumns, JSON.stringify(this.selectedColumns));

    const targetRows = this.getRowsWithDeselectedColumnsRemoved();

    this._changeNotificationService.onSelectionChanged(targetRows);
  }

  showTopElements(value: number) {
    if (!this.originalOutputData) {
      this.originalOutputData = this.outputData;
    }
    if (this.outputData.length < this.originalOutputData.length) {
      this.outputData = this.originalOutputData;
    }

    const limit = value ? value : this.outputData.length;

    this.outputData = this.outputData.slice(0, limit);

    localStorage.setItem(this._originalOutputData, JSON.stringify(this.originalOutputData));
    localStorage.setItem(this._outputData, JSON.stringify(this.outputData));
  }

  loadFilterConfiguration() {
    const storedSelectedRows = localStorage.getItem(this._selectedRows);
    if (storedSelectedRows) {
      this.selectedRows = JSON.parse(storedSelectedRows);

      this.onRowSelectionChanged();
    }

    const storedSelectedColumns = localStorage.getItem(this._selectedColumns);
    if (storedSelectedColumns) {
      this.selectedColumns = JSON.parse(storedSelectedColumns);
    }
    const storedColumns = localStorage.getItem(this._columns);
    if (storedColumns) {
      this.columns = JSON.parse(storedColumns);
    }
    if (storedSelectedColumns || storedColumns) {
      this.onColumnSelectionChanged();
    }

    const storedOutputData = localStorage.getItem(this._outputData);
    if (storedOutputData) {
      this.outputData = JSON.parse(storedOutputData);
    }
    const storedOriginalOutputData = localStorage.getItem(this._originalOutputData);
    if (storedOriginalOutputData) {
      this.originalOutputData = JSON.parse(storedOriginalOutputData);
    }

    let filters: {};
    const storedFilters = localStorage.getItem(this._filters);
    if (storedFilters) {
      filters = JSON.parse(storedFilters);
    }
    const storedFilteredRows = localStorage.getItem(this._filteredRows);
    if (storedFilteredRows) {
      this.filteredRows = JSON.parse(storedFilteredRows);
    }
    if (filters && this.filteredRows) {
      this.onFilterChanged({ filters: filters, filteredValue: this.filteredRows });
    }

    const storedLimitElements = localStorage.getItem(this._limitElements);
    if (storedLimitElements) {
      this.limitElements = parseInt(storedLimitElements);

      this.showTopElements(this.limitElements);
    }
  }

  resetConfiguration() {
    localStorage.clear();
    location.reload();
  }

  private convertSelectedRows(rows: {}[]): [][] {
    const outputRows = [];

    let outputRow = [];
    for (const column of this.selectedColumns) {
      outputRow.push(column.field);
    }
    outputRows.push(outputRow);

    for (const row of rows) {
      outputRow = [];
      for (const column in row) {
        outputRow.push(row[column]);
      }
      outputRows.push(outputRow);
    }

    return outputRows;
  }

  private getRowsWithDeselectedColumnsRemoved() {
    let sourceRows = this.outputData;
    if (this.selectedRows && this.selectedRows.length > 0) {
      sourceRows = this.selectedRows;
    }
    if (this.filteredRows && this.filteredRows.length > 0) {
      sourceRows = this.filteredRows;
    }

    let targetRows: {}[] = JSON.parse(JSON.stringify(sourceRows));

    for (const row of targetRows) {
      for (const column of this.columnsToRemoveFromData) {
        if (row.hasOwnProperty(column.field)) {
          delete row[column.field];
        }
      }
    }

    return targetRows;
  }
}
