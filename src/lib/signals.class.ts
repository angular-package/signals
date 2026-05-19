// @angular
import { effect, Inject, Injectable, Optional, signal, WritableSignal } from "@angular/core";
// Token
import { SIGNALS_INIT } from "../token";
// Type.
import { StoreShape } from '@typedly/store';
/**
 * @description The `Signals` class provides a structured way to manage a collection of signals, which are reactive data sources that can be observed for changes. It allows you to add, remove, update, and retrieve signals based on keys, as well as create effects that run when specific signals change. The class is designed to be flexible and type-safe, making it easier to work with reactive data in Angular applications.
 * @export
 * @class Signals
 * @template {Record<PropertyKey, any>} T The type of the signals collection, where each key corresponds to a signal and its value is the type of that signal.
 * @implements {StoreShape<T>} The `Signals` class implements the `StoreShape<T>` interface, which defines the shape of a store that manages a collection of signals. This interface includes methods for adding, removing, updating, and retrieving signals, as well as creating effects and managing the state of the signal collection. By implementing this interface, the `Signals` class provides a consistent API for working with reactive data in Angular applications.
 */
@Injectable()
export class Signals<T extends Record<PropertyKey, any>>
  implements StoreShape<T> {
  public get async(): false {
    return false;
  }

  /**
   * @description Size of the signals collection.
   * @public
   * @readonly
   * @type {*}
   */
  public get size() {
    return this.#signals.size;
  }

  /**
   * @description Gets the current values of all signals in the collection as an object, where each key corresponds to a signal and its value is the current value of that signal.
   * @public
   * @readonly
   * @type {*}
   */
  public get value(): T {
    return this.entries().reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as T);
  }

  /**
   * @description Privately stores the signals.
   * @type {*}
   */
  #signals = new Map<keyof T, WritableSignal<T[keyof T]>>();

  /**
   * Creates an instance of `Signals`.
   * @constructor
   * @param {T} [signals={} as T] Initial signals to populate the collection with, where each key corresponds to a signal and its value is the initial value of that signal. If not provided, the collection will start empty.
   * @remarks The constructor iterates over the provided initial signals and adds them to the collection using the `add` method, which ensures that each signal is properly initialized as a writable signal.
   * If no initial signals are provided, the collection will be initialized as empty.
   */
  constructor(@Optional() @Inject(SIGNALS_INIT) signals: T = {} as T) {
    Object.entries(signals).forEach(([key, value]) => this.add(key as keyof T, value));
  }

  /**
   * @description Adds a signal to the collection.
   * @public
   * @template {keyof T} K
   * @param {K} key The key of the signal to add.
   * @param {?(T[K] | WritableSignal<T[K]>)} [initial] The initial value of the signal.
   * @returns {boolean} `true` if the signal was added, `false`  if it already exists.
   */
  public add<K extends keyof T>(key: K, initial?: T[K] | WritableSignal<T[K]>) {
    return this.has(key)
      ? false
      : this.#data(key)
        .set(
          key,
          typeof initial === 'function' && typeof (initial as any).set === 'function'
            ? initial as WritableSignal<T[K]>
            : signal(initial as T[K])
        ),
      true;
  }

  /**
   * @description Adds multiple signals to the collection.
   * @public
   * @template {keyof T} K
   * @param {[K, (T[K] | WritableSignal<T[K]>)?][]} entries The entries to add.
   * @returns {this} The current instance.
   */
  public addMultiple<K extends keyof T>(entries: [K, (T[K] | WritableSignal<T[K]>)?][]): this {
    return entries.forEach(([key, initial]) => this.add(key, initial)),
      this;
  }

  /**
   * @description Clears all signals from the collection.
   * @public
   * @returns {this} The current instance of the signal collection after it has been cleared. After calling this method, the collection will have no signals, and its size will be zero.
   * @remarks The `clear` method is used to remove all signals from the collection, effectively resetting it to an empty state. This can be useful in scenarios where you want to clean up resources or reset the state of the signal collection without needing to create a new instance. After calling this method, any attempt to access signals will indicate that they do not exist until new signals are added to the collection.
   */
  public clear(): this {
    return this.#signals.clear(), this;
  }

  /**
   * @description
   * @public
   * @returns {boolean}
   */
  public delete(): boolean {
    return this.#signals.clear(), true;
  }

  /**
   * @description Destroys the signals collection.
   * @public
   * @returns {this} The current instance of the signal collection after it has been cleared. This method is essentially an alias for the `clear` method, provided for semantic clarity when you want to indicate that the collection is being destroyed or reset to an empty state.
   * @remarks The `destroy` method is a convenient way to clear all signals from the collection, effectively resetting it to an empty state. It can be used in scenarios where you want to clean up resources or reset the state of the signal collection without needing to create a new instance. After calling this method, the collection will have no signals, and its size will be zero.
   */
  public destroy(): this {
    return this.clear(), this;
  }

  /**
   * @description Creates an effect that runs when the specified signals change.
   * @public
   * @template {keyof T} K
   * @param {(key: K, value?: T[K]) => void} callbackfn The callback function to run when any of the specified signals change, receiving the signal's key and its current value as arguments.
   * @param {K[]} [keys=this.keys() as K[]] The keys of the signals to effect on. If not provided, the effect will run for all signals in the collection.
   * @returns {void, keys?: {}) => void}
   */
  public effect<K extends keyof T>(callbackfn: (key: K, value?: T[K]) => void, keys: K[] = this.keys() as K[]) {
    keys.forEach(key => {
      effect(() => {
        const value = this.get(key);
        callbackfn(key, value);
      });
    });
  }

  /**
   * @description Creates an effect that runs when the specified signal changes.
   * @public
   * @template {keyof T} K
   * @param {K} key The key of the signal to effect on.
   * @param {(value: T[K]) => void} callbackfn The function to run when the signal changes.
   * @returns {void) => void}
   */
  public effectForKey<K extends keyof T>(key: K, callbackfn: (value: T[K]) => void) {
    effect(() => callbackfn(this.get(key) as T[K]));
  }

  /**
   * @description Gets the entries of all signals.
   * @public
   * @returns {[keyof T, T[keyof T]][]}
   */
  public entries(): { [Key in keyof T]: [Key, T[Key]] }[keyof T][] {
    return this.keys().map(
      key => [key, this.get(key) as T[typeof key]]
    ) as { [Key in keyof T]: [Key, T[Key]] }[keyof T][];
  }

  /**
   * @description Iterates over each signal in the collection and runs the provided callback function.
   * @public
   * @template {keyof T} K
   * @param {(value: T[K], key: K) => void} callbackfn The callback function to run for each signal, receiving the signal's value and key as arguments.
   * @returns {void) => this} The current instance of the signal collection.
   */
  public forEach<K extends keyof T>(callbackfn: (value: T[K], key: K) => void) {
    return this.keys().forEach(
      key => callbackfn(this.get(key) as T[K], key as K)
    ), this;
  }

  /**
   * @description Gets the signal associated with the specified key.
   * @public
   * @template {keyof T} K
   * @param {K} key The key of the signal to retrieve.
   * @returns {(T[K] | undefined)} The returned value is the current value of the signal. If the specified key does not correspond to an existing signal in the collection, this method will return undefined.
   */
  public get<K extends keyof T>(key: K): T[K] | undefined {
    return this.#data(key).get(key)?.() as T[K] | undefined;
  }

  /**
   * @description Gets the current value of all signals as an object.
   * @public
   * @returns {T} The current value of all signals.
   */
  public getValue(): T {
    return this.value;
  }

  /**
   * @description Checks if a signal with the specified key exists in the collection.
   * @public
   * @template {keyof T} K
   * @param {K} key The key of the signal to check for existence.
   * @returns {*}
   */
  public has<K extends keyof T>(key: K) {
    return this.#data(key).has(key);
  }

  /**
   * @description Gets the keys of all signals in the collection.
   * @public
   * @returns {(keyof T)[]}
   */
  public keys(): (keyof T)[] {
    return Array.from(this.#signals.keys());
  }

  /**
   * @description Removes the signal with the specified key from the collection.
   * @public
   * @template {keyof T} K
   * @param {K} key The key of the signal to remove.
   * @returns {boolean} The result of the delete operation, true if the signal was removed, false if it did not exist.
   */
  public remove<K extends keyof T>(key: K): boolean {
    return this.#data(key).delete(key)
  }

  public load(): this {
    return this;
  }

  public lock(): this {
    return this;
  }

  public save(): this {
    return this;
  }

  /**
   * @description Sets the value of all signals in the collection based on the provided object, where each key corresponds to a signal and its value is the new value for that signal. If a key in the provided object does not correspond to an existing signal, it will be added to the collection.
   * @public
   * @param {T} value The object containing the new values for the signals.
   * @returns {this} The instance of the signal collection.
   */
  public setValue(value: T): this {
    return value && this.clear().addMultiple(Object.entries(value) as [keyof T, T[keyof T]][]), this;
  }

  /**
   * @description Sets the value of a specific signal in the collection.
   * If the provided value is a writable signal, it will be unwrapped to get its current value before setting it to the target signal. If the target signal does not exist, this method will return true without performing any operation.
   * @public
   * @template {keyof T} K
   * @param {K} key The key of the signal to set.
   * @param {(T[K] | WritableSignal<T[K]>)} value The value to set for the signal.
   * @returns {boolean} True if the value was set, false otherwise.
   */
  public set<K extends keyof T>(key: K, value: T[K] | WritableSignal<T[K]>): boolean {
    const signal = this.signal(key);
    if (!signal) return false;

    signal.set(
      typeof value === 'function' && typeof (value as any).set === 'function'
        ? (value as WritableSignal<T[K]>)()
        : value as T[K]
    );
    return true;
  }

  /**
   * @description Gets the signal associated with the specified key. This method is an alias for the `get` method, provided for semantic clarity when retrieving a signal.
   * @public
   * @template {keyof T} K
   * @param {K} key The key of the signal to retrieve.
   * @returns {(WritableSignal<T[K]> | undefined)} The signal associated with the specified key, or undefined if it does not exist.
   */
  public signal<K extends keyof T>(key: K): WritableSignal<T[K]> | undefined {
    return this.#data(key).get(key);
  }

  /**
   * @description The `signalsEntries` method retrieves the entries of all signals in the collection, where each entry is a tuple containing a key and its corresponding writable signal. This method provides a convenient way to access both the keys and their associated signals, allowing you to work with the signals directly while still having access to their keys for reference.
   * @public
   * @returns {{ [Key in keyof T]: [Key, WritableSignal<T[Key]>] }[keyof T][]}
   */
  public signalsEntries(): { [Key in keyof T]: [Key, WritableSignal<T[Key]>] }[keyof T][] {
    return this.keys().map(
      key => [key, this.signal(key) as WritableSignal<T[typeof key]>]
    ) as { [Key in keyof T]: [Key, WritableSignal<T[Key]>] }[keyof T][];
  }

  /**
   * @description Iterates over each signal in the collection and runs the provided callback function, passing the writable signal and its key as arguments. This method allows you to work directly with the signals themselves, enabling you to set or update their values within the callback function while still having access to their keys for reference.
   * @public
   * @template {keyof T} K
   * @param {(signal: WritableSignal<T[K]>, key: K) => void} callbackfn
   * @returns {void) => this}
   */
  public signalsForEach<K extends keyof T>(
    callbackfn: (signal: WritableSignal<T[K]>, key: K) => void
  ) {
    return this.keys().forEach(
      key => callbackfn(this.signal(key) as WritableSignal<T[K]>, key as K)
    ), this;
  }

  /**
   * @description Updates the value of a specific signal in the collection. If the signal with the specified key does not exist, this method will return false and will not perform any operation. If the signal exists, it will set the new value (unwrapping it if it's a writable signal) and return true.
   * @public
   * @template {keyof T} K
   * @param {K} key The key of the signal to update.
   * @param {(T[K] | WritableSignal<T[K]>)} value The new value to set for the signal.
   * @returns {boolean}
   */
  public update<K extends keyof T>(key: K, value: T[K] | WritableSignal<T[K]>): boolean {
    return this.has(key) ? this.set(key, value) : false;
  }

  /**
   * @description Updates the values of multiple signals in the collection based on the provided object, where each key corresponds to a signal and its value is the new value for that signal. For each key in the provided object, if it corresponds to an existing signal in the collection, its value will be updated to the new value (unwrapping it if it's a writable signal). If a key does not correspond to an existing signal, it will be added to the collection. This method returns the instance of the signal collection after attempting to update all provided values.
   * @public
   * @param {Partial<T>} value
   * @returns {this}
   */
  public updateValue(value: Partial<T>): this {
    return Object.entries(value).forEach(([key, val]) => {
      const typedKey = key as keyof T;
      if (this.has(typedKey)) {
        this.set(typedKey, val as T[keyof T]);
      }
    }), this;
  }

  /**
   * @description Updates the values of multiple signals in the collection based on the provided entries, where each entry is a tuple containing a key and a value. For each entry, if the key corresponds to an existing signal, its value will be updated to the new value (unwrapping it if it's a writable signal). If a key does not correspond to an existing signal, it will be ignored. This method returns the instance of the signal collection after attempting to update all provided entries.
   * @public
   * @template {keyof T} K
   * @param {([K, T[K] | WritableSignal<T[K]>][])} entries
   * @returns {this} The instance of the signal collection after attempting to update all provided entries.
   */
  public updateEntries<K extends keyof T>(entries: [K, T[K] | WritableSignal<T[K]>][]): this {
    return entries.forEach(([key, value]) => this.set(key, value)), this;
  }

  /**
   * @description Gets the current values of all signals in the collection as an array. The order of the values in the array corresponds to the order of the signals as returned by the `entries` method. This method provides a convenient way to retrieve just the values of the signals without their associated keys.
   * @public
   * @returns {T[keyof T][]} An array containing the current values of all signals in the collection.
   */
  public values(): T[keyof T][] {
    return this.entries().map(([_, value]) => value);
  }

  /**
   * @description A private helper method that retrieves the internal Map object that stores the signals for a specific key. This method is used internally to manage the signals and their associated keys, providing a type-safe way to access the underlying data structure.
   * @template {keyof T} K
   * @param {K} key The key for which to retrieve the signals Map.
   * @returns {Map<K, WritableSignal<T[K]>>} The Map object that stores the signals for the specified key.
   */
  #data<K extends keyof T>(key: K): Map<K, WritableSignal<T[K]>> {
    return this.#signals as Map<K, WritableSignal<T[K]>>;
  }
}
