import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import { Matrix } from '../model/matrix';

@Component({
  selector: 'app-pivot',
  templateUrl: './pivot.component.html',
  styleUrls: ['./pivot.component.scss']
})
export class PivotComponent implements OnInit {

  data: Matrix = [ ];
  options: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'export.xlsx';

  constructor() { }

  ngOnInit() {
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);

    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const workBook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const workSheetName: string = workBook.SheetNames[0];
      const workSheet: XLSX.WorkSheet = workBook.Sheets[workSheetName];

      this.data = <Matrix>(XLSX.utils.sheet_to_json(workSheet, { header: 1 }));
    };

    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {
    const workSheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');

    XLSX.writeFile(workBook, this.fileName);
  }
}
