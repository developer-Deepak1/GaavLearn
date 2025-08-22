import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {
private dialogVisible = new BehaviorSubject<boolean>(false);
  visible$ = this.dialogVisible.asObservable();

  show() {
    this.dialogVisible.next(true);
  }

  hide() {
    this.dialogVisible.next(false);
  }
}
