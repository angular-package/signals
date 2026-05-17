// @angular
import { Inject, Injectable, Optional, WritableSignal } from "@angular/core";
// rxjs
import { filter, Observable, Subject } from "rxjs";
// @angular-package
import { Signals } from "./signals.class";
// Token
import { SIGNALS_EMITTER } from "./token/signals-emitter.token";
import { SIGNALS_INIT } from "./token/signals-init.token";
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
   * @description
   * @type {SignalsSettings<EK, EV>}
   */
  #configuration: SignalsSettings<EK, EV>;

  /**
   * @description
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
   * @description
   * @public
   * @param {SignalsSettings<EK, EV>} settings
   * @returns {this}
   */
  public configure(settings: SignalsSettings<EK, EV>) {
    return (this.#configuration = settings), this;
  }

  public onSet<K extends keyof T>(key: K): Observable<{[Key in EK]: K} & {[Value in EV]: T[K]}> {
    return this.$onSet.pipe(
      filter(payload => payload[this.#configuration.emitter!.key] === key)
    ) as Observable<{[Key in EK]: K} & {[Value in EV]: T[K]}>;
  }

  public override set<K extends keyof T>(key: K, value: T[K] | WritableSignal<T[K]>): boolean {
    return super.set(key, value),
      this.#emit(key, value as T[K]),
      true;
  }

  #emit<S extends keyof T>(key: S, value: T[S]): this {
    return this.#onSet.next({
      [this.#configuration.emitter!.key]: key,
      [this.#configuration.emitter!.value]: value,
    } as EmitPayload<T, EK, EV>), this;
  }
}
