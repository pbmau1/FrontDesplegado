import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './app/interceptors/token.Interceptor';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
});
