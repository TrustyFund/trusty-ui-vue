import './promise-polyfill';
import { app } from './app';

// Enable progressive web app support (with offline-plugin)
if (process.env.NODE_ENV === 'production') {
  require('./pwa'); // eslint-disable-line global-require
}

app.$mount('#app');
