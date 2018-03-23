import Vue from 'vue';
import Cookies from 'js-cookie';
import Router from 'vue-router';

import Coin from '@/components/Coin/Coin';
import Deposit from '@/components/DepositWithdraw/Deposit';
import Withdraw from '@/components/DepositWithdraw/Withdraw';
import User from '@/components/User/User.vue';
import Signup from '@/components/Signup/Signup.vue';
import Login from '@/components/Login/Login.vue';
import ManagePortfolio from '@/components/ManagePortfolio/ManagePortfolio';
import ManagePortfolioPercent from '@/components/ManagePortfolio/ManagePortfolioPercent';
import ManagePortfolioValue from '@/components/ManagePortfolio/ManagePortfolioValue';
import Transactions from '@/components/Transactions/Transactions';
import Backup from '@/components/Backup/Backup';
import BackupDone from '@/components/Backup/BackupDone';
import BackupFirst from '@/components/Backup/BackupFirst';
import BackupPassword from '@/components/Backup/BackupPasswordCheck';
import BackupPhrase from '@/components/Backup/BackupPhrase';
import BackupVerify from '@/components/Backup/BackupVerify';
import ConfirmTransactions from '@/components/ConfirmTransactions/ConfirmTransactions';
import TermsOfUse from '@/components/TermsOfUse/TermsOfUse';
import EntryPoint from '@/components/EntryPoint/EntryPoint';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login,
      meta: {
        requiredAuth: false
      }
    },
    {
      name: 'signup',
      path: '/signup',
      component: Signup,
      meta: {
        requiredAuth: false
      }
    },
    {
      path: '/terms',
      name: 'terms-of-use',
      component: TermsOfUse,
      meta: {
        requiredAuth: false
      }
    },
    {
      name: 'entry',
      path: '/',
      component: EntryPoint,
      meta: {
        requiredAuth: false
      },
      children: [
        {
          name: 'transactions',
          path: '/transactions',
          component: Transactions
        },
        {
          name: 'user',
          path: '/user/:name',
          component: User,
          props: true
        },
        {
          path: '/manage',
          name: 'manage',
          redirect: '/manage/percent',
          component: ManagePortfolio,
          meta: { requiredBackup: true },
          beforeEnter: (to, from, next) => {
            if (from.name !== 'entry') next({ name: 'entry' });
            next();
          },
          children: [
            {
              path: 'percent',
              name: 'manage-percent',
              component: ManagePortfolioPercent,
              meta: {
                requiresConfirmScreen: true,
                requiredBackup: true
              }
            },
            {
              path: 'value',
              name: 'manage-value',
              component: ManagePortfolioValue,
              meta: {
                requiresConfirmScreen: true,
                requiredBackup: true
              }
            }
          ]
        },
        {
          name: 'confirm-transactions',
          path: '/confirm',
          component: ConfirmTransactions,
          beforeEnter: (to, from, next) => {
            if (!from.meta.requiresConfirmScreen) {
              next({ name: 'entry' });
            }
            next();
          }
        },
        {
          name: 'deposit',
          path: '/deposit',
          component: Deposit,
          meta: { requiredBackup: true }
        },
        {
          name: 'withdraw',
          path: '/withdraw',
          component: Withdraw,
          meta: {
            requiresConfirmScreen: true,
            requiredBackup: true
          }
        },
        {
          name: 'coin',
          path: '/coin/:symbol',
          component: Coin,
          props: true
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
              path: 'password',
              name: 'backup-password',
              component: BackupPassword
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
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  let userId;
  if (to.meta.requiredAuth === undefined) {
    userId = Cookies.get('BITSHARES_USER_ID');
    if (!userId) {
      next({
        path: '/'
      });
    }
  }
  if (to.meta.requiredBackup) {
    const backupDate = Cookies.get('BACKUP_DATE');
    let backupExist = true;
    if (!backupDate) {
      backupExist = false;
    } else {
      try {
        const backupDateArray = JSON.parse(backupDate);
        if (!backupDateArray.some(x => x.userId === userId)) {
          backupExist = false;
        }
      } catch (ex) {
        backupExist = false;
      }
    }
    if (!backupExist) {
      next({
        path: '/backup',
        query: { redirect: to.name }
      });
    }
  }
  next();
});

export default router;
