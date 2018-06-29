import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import '../src/assets/scss/main.scss';

if (process.env.ENV === 'production') {
  enableProdMode();
}

declare const module: any;

if (module.hot) {
  module.hot.accept();
}

platformBrowserDynamic().bootstrapModule(AppModule);