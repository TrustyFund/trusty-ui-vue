import Vue from 'vue';
import Cookies from 'js-cookie';
import Router from 'vue-router';
import Deposit from '@/components/Transfer';
// import Profile from '@/components/Profile/Profile.vue';
import User from '@/components/User/User.vue';
import Signup from '@/components/Signup/Signup.vue';
import Login from '@/components/Login/Login.vue';
import ManagePortfolio from '@/components/ManagePortfolio/ManagePortfolio';
import Transactions from '@/components/Transactions/Transactions';
import Backup from '@/components/Backup/Backup';
import BackupDone from '@/components/Backup/BackupDone';
import BackupFirst from '@/components/Backup/BackupFirst';
import BackupPhrase from '@/components/Backup/BackupPhrase';
import BackupVerify from '@/components/Backup/BackupVerify';
import PortfolioApprove from '@/components/Portfolio/PortfolioApprove';
// import Landing from '@/components/Landing/Landing';
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
          component: ManagePortfolio,
          beforeEnter: (to, from, next) => {
            if (from.name !== 'entry') next({ name: 'entry' });
            next();
          }
        },
        {
          name: 'manage-approve',
          path: '/manage/approve',
          component: PortfolioApprove
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
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth === undefined) {
    const userId = Cookies.get('BITSHARES_USER_ID');
    if (userId === undefined) {
      next({
        path: '/'
      });
    }
  }
  next();
});

export default router;
