import Vue from 'vue';
import Cookies from 'js-cookie';
import Router from 'vue-router';
import Deposit from '@/components/DepositWithdraw/Deposit.vue';
import Profile from '@/components/DepositWithdraw/Withdraw.vue';
import User from '@/components/User/User.vue';
import Signup from '@/components/Signup/Signup.vue';
import Login from '@/components/Login/Login.vue';
import ManagePortfolio from '@/components/Portfolio/ManagePortfolio.vue';
import Transactions from '@/components/Transactions/Transactions';
import Backup from '@/components/Backup/Backup';
import BackupDone from '@/components/Backup/BackupDone';
import BackupFirst from '@/components/Backup/BackupFirst';
import BackupPhrase from '@/components/Backup/BackupPhrase';
import BackupVerify from '@/components/Backup/BackupVerify';
import PortfolioApprove from '@/components/Portfolio/PortfolioApprove';
import Landing from '@/components/Landing/Landing';
import TermsOfUse from '@/components/TermsOfUse/TermsOfUse';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'landing',
      path: '/home',
      component: Landing,
      meta: {
        requiredAuth: false
      }
    },
    {
      name: 'profile',
      path: '/profile',
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
      name: 'deposit',
      path: '/',
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
      name: 'manage-approve',
      path: '/manage/approve',
      component: PortfolioApprove
    },
    {
      name: 'transactions',
      path: '/transactions',
      component: Transactions
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
        path: '/home'
      });
    }
  }
  next();
});

export default router;
