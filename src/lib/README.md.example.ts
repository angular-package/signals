import { signal } from "@angular/core";
import { Signals } from "./signals.class";

interface UserSignals {
  firstName: string;
  age: number;
}

const signals = new Signals<UserSignals>();

signals.add('firstName', 'Mark');
signals.add('age', signal(27));

console.log(signals.get('firstName')); // Output: 'Mark'
console.log(signals.get('age')); // Output: 27

signals.update('age', 37);
console.log(signals.signal('age')?.()); // Output: 37

signals.setValue({
  firstName: 'John',
  age: 47
});

console.log(signals.getValue()); // Output: { firstName: 'John', age: 47 }

signals.clear();
console.log(signals.get('firstName'));
console.log(signals.get('age'));
