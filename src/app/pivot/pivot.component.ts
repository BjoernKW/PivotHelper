import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import { Matrix } from '../model/matrix';

@Component({
  selector: 'app-pivot',
  templateUrl: './pivot.component.html',
  styleUrls: ['./pivot.component.scss']
})
export class PivotComponent implements OnInit {

  data: Matrix = [];
  columns = [];

  options: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'export.xlsx';

  selectedRows: [];

  constructor() { }

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

      this.data = <Matrix>(XLSX.utils.sheet_to_json(workSheet, { header: 1 }));

      this.columns = this.data[0];
      this.data = this.data.slice(1, this.data.length - 1);
    };

    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {
    const rows = this.selectedRows && this.selectedRows.length > 0 ? this.selectedRows: this.data;
    const workSheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(rows);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');

    XLSX.writeFile(workBook, this.fileName);
  }
}
