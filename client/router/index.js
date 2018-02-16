import Vue from 'vue';
import Router from 'vue-router';
import Deposit from '@/components/Transfer';
import Home from '@/components/Home/Home.vue';
import User from '@/components/User/User.vue';
import Signup from '@/components/Auth/signup.vue';
import Auth from '@/components/Auth/Auth.vue';
import ManagePortfolio from '@/components/Portfolio/ManagePortfolio.vue';


import Backup from '@/components/Backup';
import done from '@/components/Backup/done';
import first from '@/components/Backup/first';
import phrase from '@/components/Backup/phrase';
import verify from '@/components/Backup/verify';

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
    },


    {
      name: 'backup',
      path: '/backup',
      component: Backup,
      children: [
        {
          path: 'info',
          name: 'backup-info',
          component: first
        },
        {
          path: 'phrase',
          name: 'backup-phrase',
          component: phrase
        },
        {
          path: 'done',
          name: 'backup-done',
          component: done
        },
        {
          name: 'backup-verify',
          path: 'verify',
          component: verify
        },
      ]
    }
  ]
});

