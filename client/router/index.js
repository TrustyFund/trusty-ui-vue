import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import User from '@/views/User';
import Auth from '@/views/Auth/login';
import Signup from '@/views/Auth/signup';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },

    {
      path: '/home',
      component: Home
    },

    {
      name: 'user',
      path: '/user/:nickname',
      component: User
    },
    {
      name: 'login',
      path: '/login',
      component: Auth
    },
    {
      name: 'signup',
      path: '/signup',
      component: Signup
    }
  ]
});

