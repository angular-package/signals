import { InjectionToken } from "@angular/core";
import { SignalsSettings } from "@typedly/signals";

export const SIGNALS_EMITTER = new InjectionToken<SignalsSettings>('SIGNALS_EMITTER', {
  providedIn: 'root',
  factory: () => ({
    emitter: {key: 'key', value: 'value'},
  }),
});
