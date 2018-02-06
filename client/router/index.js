import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home/Home.vue';
import User from '@/views/User/User.vue';
import Signup from '@/views/Auth/signup.vue';
import Auth from '@/views/Auth/Auth.vue';
import ManagePortfolio from '@/views/Portfolio/ManagePortfolio.vue';

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
      path: '/user/:name',
      component: User,
      props: true
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
    },
    {
      name: 'manage',
      path: '/manage',
      component: ManagePortfolio
    }
  ]
});

