import { InjectionToken } from "@angular/core";

export const SIGNALS_INIT = new InjectionToken<Record<PropertyKey, any>>('SIGNALS_INIT', {
  providedIn: 'root',
  factory: () => ({}),
});
