import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { provideClientHydration } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter([]), provideClientHydration(), importProvidersFrom([HttpClientModule])] // Add HttpClientModule to providers
};