import Observer from './Observer.ts';
import EventType from './EventType.ts'

export default interface Observable {
  attach(customer: Observer): void;
  detach(customer: Observer): void;
  notify(eventType: EventType, info: string): void;
}