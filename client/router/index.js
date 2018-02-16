import Vue from 'vue';
import Router from 'vue-router';
import Deposit from '@/views/Transfer';
import Home from '@/views/Home/Home.vue';
import User from '@/views/User/User.vue';
import Signup from '@/views/Auth/signup.vue';
import Auth from '@/views/Auth/Auth.vue';
import ManagePortfolio from '@/views/Portfolio/ManagePortfolio.vue';


import Backup from '@/views/Backup';
import done from '@/views/Backup/done';
import first from '@/views/Backup/first';
import index from '@/views/Backup/index';
import verify from '@/view/Backup/verify';

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
      path: '/backup/:step',
      component: Backup,
      children: [
	      {
	      	path: '',
	      	component: first
	      },
	      {
      		name: 'backup-phrase',
	      	path: 'phrase',
	      	component: phrase
	      },
	     	{
      		name: 'backup-done',
	      	path: 'done',
	      	component: verify
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

