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
import ManagePortfolioManager from '@/components/ManagePortfolio/ManagePortfolioManager';
import Transactions from '@/components/Transactions/Transactions';
import Backup from '@/components/Backup/Backup';
import BackupDone from '@/components/Backup/BackupDone';
import BackupFirst from '@/components/Backup/BackupFirst';
import BackupPassword from '@/components/Backup/BackupPasswordCheck';
import BackupPhrase from '@/components/Backup/BackupPhrase';
import BackupVerify from '@/components/Backup/BackupVerify';
import Faq from '@/components/Faq/Faq';
import ConfirmTransactions from '@/components/ConfirmTransactions/ConfirmTransactions';
import EntryPoint from '@/components/EntryPoint/EntryPoint';
import TermsOfUse from '@/components/TermsOfUse/TermsOfUse';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
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
      path: '/faq',
      name: 'faq',
      component: Faq,
      meta: {
        requiredAuth: false
      }
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsOfUse,
      meta: {
        requiredAuth: false,
        adaptiveBack: true
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
          path: '/faq',
          name: 'faq2',
          component: Faq,
        },
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
            if (from.name !== 'entry' && from.name !== 'coin'
             && from.name !== 'confirm-transactions') {
              next({ name: 'entry' });
            }
            next();
          },
          children: [
            {
              path: 'percent',
              name: 'manage-percent',
              component: ManagePortfolioManager,
              meta: {
                requiresConfirmScreen: true,
                requiredBackup: true
              }
            },
            {
              path: 'value',
              name: 'manage-value',
              component: ManagePortfolioManager,
              meta: {
                requiresConfirmScreen: true,
                requiredBackup: true
              },
              props: {
                type: 'fiat'
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
          },
          meta: {
            adaptiveBack: true
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
          props: true,
          meta: {
            requiresConfirmScreen: true,
            requiredBackup: true
          }
        },
        {
          name: 'coin',
          path: '/coin/:symbol',
          component: Coin,
          props: true,
          meta: {
            adaptiveBack: true
          }
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
