import Observer from './Observer.ts';

export class CorporateCustomer implements Observer {
  update(info: string) {
    console.log('Stock price is now: ', info);
  }  
}

export class RegularCustomer implements Observer {
  update(info: string) {
    console.log('Product price is now: ', info);
  }  
}