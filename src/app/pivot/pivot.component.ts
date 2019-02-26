import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import { Matrix } from '../model/matrix';
import { Column } from '../model/column';
import { BehaviorSubject } from 'rxjs';
import { ChangeNotificationService } from './change-notification.service';
import { $e } from 'codelyzer/angular/styles/chars';

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
  }

  onFileChange(fileChangeEvent: any) {
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

      data = data.slice(1, data.length - 1);

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
