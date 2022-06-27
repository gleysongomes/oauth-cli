import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {

  constructor() {
  }

  getMIME(extensao: string) {
    if (extensao == '.pdf') {
      return 'application/pdf';
    } else if (extensao == '.csv') {
      return 'text/csv';
    } else if (extensao == '.xls') {
      return 'application/vnd.ms-excel';
    } else if (extensao == '.xlsx') {
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else {
      return 'application/octet-stream';
    }
  }

}
