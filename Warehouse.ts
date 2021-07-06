import Observable from './Observable.ts';
import Observer from './Observer.ts';

import { CorporateCustomer, RegularCustomer } from './Customer.ts';

import EventType from './EventType.ts';

export default class Warehouse implements Observable {
  private corporateObservers: CorporateCustomer[];
  private regularObservers: RegularCustomer[];
  private stockPrice: number;
  private productPrice: number;

  constructor() {
    this.corporateObservers = [];
    this.regularObservers = [];
    this.stockPrice = 1;
    this.productPrice = 10;
  }

  updateStockPrice() {
    this.stockPrice = Math.round(100*Math.random());
    this.notify(EventType.Corporate, `$${this.stockPrice}`);
  }

  updateProductPrice() {
    this.productPrice = Math.round(20*Math.random());
    this.notify(EventType.Regular, `$${this.productPrice}`);
  }

  private isCorporateCustomer(customer: Observer) {
    return customer instanceof CorporateCustomer; 
  }
  
  private isRegularCustomer(customer: Observer) {
    return customer instanceof RegularCustomer; 
  }

  attach(customer: Observer) {
    if(this.isCorporateCustomer(customer)) {
      this.corporateObservers.push(customer);
    }
    else if(this.isRegularCustomer(customer)) {
      this.regularObservers.push(customer);
    }
    else 
      return;
  }

  detach(customer: Observer) {
    if(this.isCorporateCustomer(customer)) {
      const index = this.corporateObservers.indexOf(customer);
      if(index === -1) {
        throw "No such corporate subscriber!";
      }
      else {
        this.corporateObservers.splice(index, 1);
      }
    }
    else if(this.isRegularCustomer(customer)) {
      const index = this.regularObservers.indexOf(customer);
      if(index === -1) {
        throw "No such regular subscriber!";
      }
      else {
        this.regularObservers.splice(index, 1);
      }
    }
    else {
      throw "Subscriber type is not supported!"
    }
  }

  notify(eventType: EventType, info: string) {
    switch(eventType) {
      case EventType.Corporate:
        this.corporateObservers.forEach(customer => {
          customer.update(info);
        });
        break;
      case EventType.Regular: 
        this.regularObservers.forEach(customer => {
          customer.update(info);
        })
        break;
      default:
    }
  }
}