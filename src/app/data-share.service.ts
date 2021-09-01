import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable()
export class DataShareService {

  private name = new BehaviorSubject<string>('name');
  currentName = this.name.asObservable();

  private message = new BehaviorSubject<string>('message');
  currentMessage = this.message.asObservable();

  private amount = new BehaviorSubject(0);
  currentAmount = this.amount.asObservable();


  constructor() { }

  changeName(name: string) {
    this.name.next(name);
  }

  changeMessage(message: string) {
    this.message.next(message);
  }

  changeAmount(amount: number) {
    this.amount.next(amount);
  }


}
