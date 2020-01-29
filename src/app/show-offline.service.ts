import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowOfflineService {
  private subject = new Subject<any>();

  sendMessage(showOffline: boolean){
    this.subject.next({boolean: showOffline})
  }
  clearMessage() {
    this.subject.next();
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
