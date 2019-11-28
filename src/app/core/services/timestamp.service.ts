import { Injectable } from '@angular/core';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Injectable({
  providedIn: 'root'
})
export class TimestampService {

  constructor() { }

  public timestampToDate(date: Timestamp<Date>): string {
    console.log(date.toDate());
    return 'it works!';
  }
}
