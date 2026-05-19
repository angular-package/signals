// @angular
import { Inject, Injectable, Optional, WritableSignal } from "@angular/core";
// rxjs
import { filter, Observable, Subject } from "rxjs";
// @angular-package
import { Signals } from "./signals.class";
// Token
import { SIGNALS_EMITTER } from "../token/signals-emitter.token";
import { SIGNALS_INIT } from "../token/signals-init.token";
// Types
import type { EmitPayload, SignalsSettings } from '@typedly/signals';
/**
 * @description An injectable Angular service that extends the `Signals` class to provide a channel for managing signals with additional configuration and event emission capabilities.
 * The `SignalsChannel` class allows you to create a signal collection that can emit events whenever a signal is set, providing a way to react to changes in the signals.
 * It uses RxJS to manage the emission of events and allows for customizable configuration through dependency injection.
 * @export
 * @class SignalsChannel
 * @template {Record<PropertyKey, any>} T
 * @template {SignalsSettings<EK, EV>} C
 * @template {PropertyKey} [EK=C extends SignalsSettings<infer EK, any> ? EK : PropertyKey]
 * @template {PropertyKey} [EV=C extends SignalsSettings<any, infer EV> ? EV : PropertyKey]
 * @extends {Signals<T>}
 */
@Injectable()
export class SignalsChannel<
  T extends Record<PropertyKey, any>,
  C extends SignalsSettings<EK, EV>,
  EK extends PropertyKey = C extends SignalsSettings<infer EK, any> ? EK : PropertyKey,
  EV extends PropertyKey = C extends SignalsSettings<any, infer EV> ? EV : PropertyKey
> extends Signals<T> {
  public static create<T extends Record<PropertyKey, any>>() {
    return <
      C extends SignalsSettings<EK, EV>,
      EK extends PropertyKey = C extends SignalsSettings<infer EK, any> ? EK : PropertyKey,
      EV extends PropertyKey = C extends SignalsSettings<any, infer EV> ? EV : PropertyKey
    >(signals: T, settings: C) => new SignalsChannel<T, C, EK, EV>(signals, settings);
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {SignalsSettings<EK, EV>}
   */
  public get configuration() {
    return this.#configuration;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {*}
   */
  public get $onSet() {
    return this.#onSet.asObservable();
  }

  /**
   * @description Privately holds the configuration settings for the `SignalsChannel`, including the emitter keys for events.
   * @type {SignalsSettings<EK, EV>}
   */
  #configuration: SignalsSettings<EK, EV>;

  /**
   * @description Privately holds the subject for the `SignalsChannel`, which emits events whenever a signal is set.
   * @type {*}
   */
  #onSet  = new Subject<EmitPayload<T, EK, EV>>();

  /**
   * Creates an instance of `SignalsChannel`.
   * @constructor
   * @param {T} [signals={} as T]
   * @param {SignalsSettings<EK, EV>} [settings={emitter: {key: 'key' as EK, value: 'value' as EV}}]
   */
  constructor(
    @Optional() @Inject(SIGNALS_INIT) signals: T = {} as T,
    @Optional() @Inject(SIGNALS_EMITTER) settings: SignalsSettings<EK, EV> = {emitter: {key: 'key' as EK, value: 'value' as EV}}
  ) {
    super(signals);
    this.#configuration = settings;
  }

  /**
   * @description Configures the `SignalsChannel` with the provided settings, allowing for customization of the emitter keys and other configuration options. This method can be used to update the configuration after the `SignalsChannel` has been instantiated.
   * @public
   * @param {SignalsSettings<EK, EV>} settings
   * @returns {this}
   */
  public configure(settings: SignalsSettings<EK, EV>) {
    return (this.#configuration = settings), this;
  }

  /**
   * @description Returns an observable that emits events whenever a signal with the specified key is set. The emitted event includes the key and value of the signal, using the configured emitter keys.
   * @public
   * @template {keyof T} K
   * @param {K} key
   * @returns {Observable<{[Key in EK]: K} & {[Value in EV]: T[K]}>}
   */
  public onSet<K extends keyof T>(key: K): Observable<{[Key in EK]: K} & {[Value in EV]: T[K]}> {
    return this.$onSet.pipe(
      filter(payload => payload[this.#configuration.emitter!.key] === key)
    ) as Observable<{[Key in EK]: K} & {[Value in EV]: T[K]}>;
  }

  /**
   * @inheritdoc
   * @public
   * @template {keyof T} K
   * @param {K} key
   * @param {(T[K] | WritableSignal<T[K]>)} value
   * @returns {boolean}
   */
  public override set<K extends keyof T>(key: K, value: T[K] | WritableSignal<T[K]>): boolean {
    return super.set(key, value),
      this.#emit(key, value as T[K]),
      true;
  }

  /**
   * @description Emits an event with the specified key and value using the configured emitter keys.
   * @private
   * @template {keyof T} S
   * @param {S} key
   * @param {T[S]} value
   * @returns {this}
   */
  #emit<S extends keyof T>(key: S, value: T[S]): this {
    return this.#onSet.next({
      [this.#configuration.emitter!.key]: key,
      [this.#configuration.emitter!.value]: value,
    } as EmitPayload<T, EK, EV>), this;
  }
}
