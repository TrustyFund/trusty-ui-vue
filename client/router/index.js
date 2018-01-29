import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home/Home.vue';
import User from '../views/User/User.vue';
import Auth from '../views/Auth/Auth.vue';

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
      name: 'user',
      path: '/user/:name',
      component: User,
      props: true
    },
    {
      name: 'login',
      path: '/login',
      component: Auth
    }
  ]
});

