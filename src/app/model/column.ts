export class Column {
  field: string;
  header: string;
  filterMatchMode: string;
  isBoolean: boolean;
  isNumeric: boolean;
  isEmailAddress: boolean;
  isHttpUrl: boolean;


  constructor(
    field: string,
    header: string,
    filterMatchMode: string,
    isBoolean: boolean,
    isNumeric: boolean,
    isEmailAddress: boolean,
    isHttpUrl: boolean
  ) {
    this.field = field;
    this.header = header;
    this.filterMatchMode = filterMatchMode;
    this.isBoolean = isBoolean;
    this.isNumeric = isNumeric;
    this.isEmailAddress = isEmailAddress;
    this.isHttpUrl = isHttpUrl;
  }
}
