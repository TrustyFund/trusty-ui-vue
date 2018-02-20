import Vue from 'vue';
import Router from 'vue-router';
import Deposit from '@/components/Transfer';
import Profile from '@/components/Profile/Profile.vue';
import User from '@/components/User/User.vue';
import Signup from '@/components/Auth/signup.vue';
import Auth from '@/components/Auth/Auth.vue';
import ManagePortfolio from '@/components/Portfolio/ManagePortfolio.vue';

import Backup from '@/components/Backup/Backup';
import BackupDone from '@/components/Backup/BackupDone';
import BackupFirst from '@/components/Backup/BackupFirst';
import BackupPhrase from '@/components/Backup/BackupPhrase';
import BackupVerify from '@/components/Backup/BackupVerify';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'profile',
      path: '/',
      component: Profile
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
      path: '/backup',
      component: Backup,
      children: [
        {
          path: '',
          name: 'backup',
          component: BackupFirst
        },
        {
          path: 'phrase',
          name: 'backup-phrase',
          component: BackupPhrase
        },
        {
          path: 'done',
          name: 'backup-done',
          component: BackupDone
        },
        {
          name: 'backup-verify',
          path: 'verify',
          component: BackupVerify
        },
      ]
    }
  ]
});

