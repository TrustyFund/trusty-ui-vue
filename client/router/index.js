import Vue from 'vue';
import Router from 'vue-router';
import Deposit from '@/components/Transfer';
import Home from '@/components/Home/Home.vue';
import User from '@/components/User/User.vue';
import Signup from '@/components/Auth/signup.vue';
import Auth from '@/components/Auth/Auth.vue';
import ManagePortfolio from '@/components/Portfolio/ManagePortfolio.vue';


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
      name: 'deposit',
      path: '/deposit',
      component: Deposit
    },
    {
      name: 'withdraw',
      path: '/withdraw',
      component: Deposit
    },
    {
      name: 'manage',
      path: '/manage',
      component: ManagePortfolio
    }
  ]
});

