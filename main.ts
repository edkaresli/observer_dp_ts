import Warehouse from './Warehouse.ts';
import { CorporateCustomer, RegularCustomer } from './Customer.ts';

const happyWarehouse = new Warehouse();

const IBM = new CorporateCustomer();
const McDonalds = new CorporateCustomer();
const LocalNews = new CorporateCustomer();

const John = new RegularCustomer();
const Daniel = new RegularCustomer();
const Maria = new RegularCustomer();

happyWarehouse.attach(IBM);
happyWarehouse.attach(McDonalds);
happyWarehouse.attach(LocalNews);

happyWarehouse.attach(John);
happyWarehouse.attach(Daniel);
happyWarehouse.attach(Maria);

let counter = 0;
const id = setInterval(() => {
  const news = Math.round(Math.random());
  console.log(`${news === 0? 'Corporate' : 'Product'} news update:`);
  switch(news) {
    case 0:
      happyWarehouse.updateStockPrice();
      break;
    case 1: 
      happyWarehouse.updateProductPrice();
      break;
    default:
      console.log("impossible!");
  }
  if(counter === 2) {
    happyWarehouse.detach(IBM);
    happyWarehouse.detach(John);
    happyWarehouse.detach(Maria);
  }
  if(counter === 3) {
    happyWarehouse.detach(McDonalds);
  }
  if(counter > 4) {
    clearInterval(id);
  }
  counter += 1;
}, 3000)