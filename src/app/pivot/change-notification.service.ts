import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeNotificationService {

  private _selectionChanged = new BehaviorSubject<{}[]>([]);
  public selectionChanged$ = this._selectionChanged.asObservable();

  constructor() { }

  onSelectionChanged(data: {}[] | undefined) {
    if (data) {
      this._selectionChanged.next(data);
    }
  }
}
