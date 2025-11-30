import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { provideNativeDateAdapter } from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { tokenInterceptor } from './interceptors/token.Interceptor';


registerLocaleData(localeEs, 'es');

// 🔵 tokenGetter correcto
export function tokenGetter() {
  if (typeof window === 'undefined') {
    return null;
  }

  const token = window.sessionStorage.getItem('token');
  return token && token.split('.').length === 3 ? token : null;
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },

    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),

    provideClientHydration(withEventReplay()),

    // 🔵 AQUÍ VIENE LA CORRECCIÓN REAL
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
      withInterceptors([
        tokenInterceptor      // 👈🔥 REGISTRA EL INTERCEPTOR (lo que faltaba)
      ])
    ),

    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:8080'],
          disallowedRoutes: ['http://localhost:8080/login'],
        },
      })
    ),

    provideNativeDateAdapter(),
  ]
};
