import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp(
      {"projectId":"trackit-health",
      "appId":"1:977533599383:web:9b9515a0b6a5653924b3d2",
      "storageBucket":"trackit-health.appspot.com",
      "apiKey":"AIzaSyDRv7bI6YAUlVFD6iMgwgIf8jIQSPKeAaw",
      "authDomain":"trackit-health.firebaseapp.com",
      "messagingSenderId":"977533599383"})),
      provideAuth(() => getAuth()),
      provideAnimationsAsync(),
      { provide: FIREBASE_OPTIONS, useValue:
      {"projectId":"trackit-health",
      "appId":"1:977533599383:web:9b9515a0b6a5653924b3d2",
      "storageBucket":"trackit-health.appspot.com",
      "apiKey":"AIzaSyDRv7bI6YAUlVFD6iMgwgIf8jIQSPKeAaw",
      "authDomain":"trackit-health.firebaseapp.com",
      "messagingSenderId":"977533599383"}}, provideClientHydration()
    ]
};
