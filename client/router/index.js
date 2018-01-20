import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import User from '../views/User';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'user',
      path: '/user/:nickname',
      component: User
    }
  ]
});

