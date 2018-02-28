import './promise-polyfill';
import { app } from './app';
import config from '../config';

// Enable progressive web app support (with offline-plugin)
if (process.env.NODE_ENV === 'production') {
  require('./pwa'); // eslint-disable-line global-require
}


if (config.pixel && process.env.NODE_ENV === 'development') {
  require('./style/pixel-glass.js'); // eslint-disable-line global-require
  require('./style/pixel-glass.scss'); // eslint-disable-line global-require
}

app.$mount('#app');
