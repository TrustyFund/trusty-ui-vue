import './promise-polyfill';
import { app } from './app';
import config from '../config';

// Enable progressive web app support (with offline-plugin)
if (process.env.NODE_ENV === 'production') {
  require('./pwa'); // eslint-disable-line global-require
}

document.addEventListener('touchmove', (event) => {
  event = event.originalEvent || event; // eslint-disable-line 
  if (event.scale > 1) {
    event.preventDefault();
  }
}, false);

if (config.pixel && process.env.NODE_ENV === 'development') {
  require('./style/pixel-glass.js'); // eslint-disable-line global-require
  require('./style/pixel-glass.scss'); // eslint-disable-line global-require
}

app.$mount('#app');
