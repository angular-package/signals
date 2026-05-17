import { signal } from '@angular/core';
import { Signals } from '../lib/signals.class';

let signals = new Signals({
  firstName: 'Mark',
  age: 27
});

describe(() => {
  beforeEach(() => {
    signals = new Signals({
      firstName: 'Mark',
      age: 27
    });
  });
  it(`should add a signal`, () => {
    signals.add('age', signal(37));
    expect(signals.signal('age')?.()).toBe(37);
  });
  it(`should remove a signal`, () => {
    signals.remove('age');
    expect(signals.signal('age')).toBeUndefined();
  });
  it(`should update a signal`, () => {
    signals.add('age', signal(37));
    signals.update('age', 47);
    expect(signals.signal('age')?.()).toBe(47);
  });
  it(`should update multiple signals`, () => {
    signals.add('age', signal(37));
    signals.updateEntries([
      ['age', 47],
      ['firstName', 'John']
    ]);
    expect(signals.signal('age')?.()).toBe(47);
    expect(signals.signal('firstName')?.()).toBe('John');
  });
  it(`should clear all signals`, () => {
    signals.clear();
    expect(signals.get('age')).toBeUndefined();
    expect(signals.get('firstName')).toBeUndefined();
  });
  it(`should destroy all signals`, () => {
    signals.destroy();
    expect(signals.get('age')).toBeUndefined();
    expect(signals.get('firstName')).toBeUndefined();
  });
  it(`should get the value of all signals`, () => {
    expect(signals.getValue()).toEqual({
      firstName: 'Mark',
      age: 27
    });
  });
  it(`should set the value of all signals`, () => {
    signals.setValue({
      firstName: 'John',
      age: 37
    });
    expect(signals.getValue()).toEqual({
      firstName: 'John',
      age: 37
    });
  });
  it(`should check if a signal exists`, () => {
    expect(signals.has('age')).toBe(true);
    expect(signals.has('nonExistent' as any)).toBe(false);
  });
  it(`should get the keys of all signals`, () => {
    expect(signals.keys()).toEqual(['firstName', 'age']);
  });
  it(`should get the values of all signals`, () => {
    expect(signals.values()).toEqual(['Mark', 27]);
  });
  it(`should get the entries of all signals`, () => {
    expect(signals.entries()).toEqual([
      ['firstName', signals.get('firstName')!],
      ['age', signals.get('age')!]
    ]);
  });
  it(`should iterate over all signals`, () => {
    const entries: [string, any][] = [];
    signals.forEach((value, key) => entries.push([key, value]));
    expect(entries).toEqual([
      ['firstName', 'Mark'],
      ['age', 27]
    ]);
  });
  it(`should map over all signals`, () => {
    const entries: [string, any][] = [];
    signals.forEach((value, key) => entries.push([key, value]));
    expect(entries).toEqual([
      ['firstName', 'Mark'],
      ['age', 27]
    ]);
  });
  it(`should effect on all signals`, () => {
    const entries: [string, any][] = [];
    signals.effect((key, value) => {
      entries.push([key, value]);
    });
    expect(entries).toEqual([
      ['firstName', 'Mark'],
      ['age', 27]
    ]);
  });
  it(`should effect on a specific signal`, () => {
    const entries: [string, any][] = [];
    signals.effectForKey('age', (value) => entries.push(['age', value]));
    expect(entries).toEqual([
      ['age', 27]
    ]);
  });
  it(`should not effect on a specific signal if the key does not exist`, () => {
    const entries: [string, any][] = [];
    signals.effectForKey('nonExistent' as any, (value) => entries.push(['nonExistent', value]));
    expect(entries).toEqual([]);
  });
  it(`should effect on multiple signals`, () => {
    const entries: [string, any][] = [];
    signals.effect((key, value) => entries.push([key, value]), ['age']);
    expect(entries).toEqual([
      ['age', 27]
    ]);
  });
  it(`should not effect on multiple signals if the keys do not exist`, () => {
    const entries: [string, any][] = [];
    signals.effect((key, value) => entries.push([key, value]), ['nonExistent' as any]);
    expect(entries).toEqual([]);
  });
  it(`should add multiple signals`, () => {
    signals.addMultiple([
      ['age', signal(37)],
      ['firstName', signal('John')]
    ]);
    expect(signals.signal('age')?.()).toBe(37);
    expect(signals.signal('firstName')?.()).toBe('John');
  });
  it(`should not add multiple signals if the keys already exist`, () => {
    signals.addMultiple([
      ['age', signal(37)],
      ['firstName', signal('John')]
    ]);
    expect(signals.signal('age')?.()).toBe(27);
    expect(signals.signal('firstName')?.()).toBe('Mark');
  });
  it(`should not add a signal if the key already exists`, () => {
    signals.add('age', signal(37));
    expect(signals.signal('age')?.()).toBe(27);
  });
  it(`should not add a signal if the key already exists with a non-signal value`, () => {
    signals.add('age', 37);
    expect(signals.signal('age')?.()).toBe(27);
  });
  it(`should not add a signal if the key already exists with a non-signal value and the initial value is a signal`, () => {
    signals.add('age', 37);
    signals.add('age', signal(37));
    expect(signals.signal('age')?.()).toBe(27);
  });
});
