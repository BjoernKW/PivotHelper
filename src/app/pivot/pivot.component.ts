import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import { Matrix } from '../model/matrix';
import { Column } from '../model/column';
import { ChangeNotificationService } from './change-notification.service';

@Component({
  selector: 'app-pivot',
  templateUrl: './pivot.component.html',
  styleUrls: ['./pivot.component.scss']
})
export class PivotComponent implements OnInit {

  columns: Column[] = [];
  outputData: {}[] = [];
  selectedRows: [];

  constructor(
    private _changeNotificationService: ChangeNotificationService
  ) { }

  ngOnInit() {
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
  }

  onFileChange(fileChangeEvent: any) {
    this.columns = [];
    this.outputData = [];
    this.selectedRows = [];

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

      for (const column of data[0]) {
        this.columns.push(
          {
            field: column,
            header: column,
            filterMatchMode: 'contains'
          }
        );
      }

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
    };

    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {
    const rows = this.selectedRows && this.selectedRows.length > 0 ? this.selectedRows: this.outputData;
    const outputRows = this.convertSelectedRows(rows);

    const workSheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(outputRows);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');

    XLSX.writeFile(workBook, 'export.xlsx');
  }

  onRowSelectionChanged() {
    this._changeNotificationService.onSelectionChanged(this.selectedRows);
  }

  onFilterChanged($event: { filters: {}, filteredValue: {}[] }) {
    this._changeNotificationService.onSelectionChanged($event.filteredValue);
  }

  private convertSelectedRows(rows: {}[]): [][] {
    const outputRows = [];

    let outputRow = [];
    for (const column of this.columns) {
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
}
