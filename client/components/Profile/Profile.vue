<template lang="pug">

#trusty_profile

  .useful_wrap

    .trusty_inline_buttons._mob
      button(@click='deposit') DEPOSIT
      button(@click='withdraw') WITHDRAW


    TotalFunds(
    	:class="{ _not_transactions: !operations.length }",
      v-if="userData"
     :name="userName"
     :balances="userBalances"
     base-id="1.3.0"
     fiat-id="1.3.121")

    ._wrap_desk_buttons._desk
      .trusty_inline_buttons
        button(@click='deposit') DEPOSIT
        button(@click='withdraw') WITHDRAW

    div.transactions-wrap
      Transactions(v-if="userId"
                  :limit="5"
                  :min-mode="true")



  .table_wrap(:class="{ _not_transactions: !operations.length }")
    Portfolio(
     v-if="userData"
     :balances="userBalances"
      base-id="1.3.0"
      fiat-id="1.3.121"
     :days="7")



</template>

<script>
import Portfolio from '@/components/Portfolio/Portfolio';
import Transactions from '@/components/Transactions/Transactions';
import { mapGetters, mapActions } from 'vuex';
import TotalFunds from './ProfileTotalFunds';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      userId: 'account/getAccountUserId',
      ready: 'connection/isReady',
      userBalances: 'account/getCurrentUserBalances',
      userName: 'account/getCurrentUserName',
      userData: 'account/getCurrentUserData',
      operations: 'operations/getOperations'
    })
  },
  components: {
    Portfolio, Transactions, TotalFunds
  },
  methods: {
    ...mapActions({
      fetchCurrentUser: 'account/fetchCurrentUser'
    }),
    deposit() {
      this.$router.push({ name: 'deposit' });
    },
    withdraw() {
      const balancesAsssets = Object.keys(this.userBalances);
      if (balancesAsssets.length) {
        const [balanceAsset] = balancesAsssets;
        if (this.userBalances[balanceAsset].balance > 0) {
          this.$router.push({
            name: 'withdraw',
            params: {
              coin: balanceAsset,
            }
          });
          return;
        }
      }
      this.$toast.info('YOU HAVE NO FUNDS');
    }
  },
  mounted() {
    if (this.ready) this.fetchCurrentUser();
  }
};
</script>

<style lang="scss">

@import "~@/style/mixins";

#trusty_profile {

  padding-right: 3.6vw;
  padding-left: 3.6vw;
  padding-bottom: 10vw;
  @media screen and (min-width: 769px) {
    max-width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row-reverse;
    > div {
      flex: 1;
    }
  }

  .table_wrap {
    width: 100%;


    &._not_transactions {
	    .trusty_inline_buttons {
				padding-top: 0;
	    }
    }
  }
}


@media screen and (max-width: 768px){
  #trusty_profile .trusty_total_funds {
    margin-top: 4.3vw;
    margin-bottom: 3.3vw;

    &._not_transactions {
    	margin-bottom: 3.2vw;
    }
    h3 { font-size: 13.4vw; }
    .trusty_profile_info { padding: 0 3.6vw; }
    p { font-size: 4.2vw; }
  }
}

@media screen and (min-width: 769px) {

  #trusty_profile {
    ._wrap_desk_buttons, .trusty_table {
      width: 80%;
      margin: 0 auto;
    }

    .trusty_table {
      margin-top: 1vw;
    }

  }
}




</style>
