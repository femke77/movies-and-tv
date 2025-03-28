/// <reference types="vite/client" />

declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegistered?: (
      _registration: ServiceWorkerRegistration | undefined,
    ) => void;
    onRegisterError?: (_error: Error) => void;
  }
  export function registerSW(
    _options?: RegisterSWOptions,
  ): (_reloadPage?: boolean) => Promise<void>;
}
