import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors  } from '@angular/common/http';
import { HttpClientInterceptor } from './components/httpclient.interceptor';
import { LoadingInterceptor } from './components/loading.interceptor';




import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()), 
    provideHttpClient(withInterceptors([HttpClientInterceptor, LoadingInterceptor]))]
};
