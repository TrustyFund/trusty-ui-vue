<template lang="pug">
#rub_withdraw
  TrustyInput(
    label="Enter your card number",
    v-model="address")
  p
  .withdraw_rate
    alpha-input(:isOpen="true" label="exchange rate RUB/BTC")
      template(slot="input"): div._simple_text_left.rate {{ this.btcPrice }}
      template(slot="right")
        label.trusty_place_holder You will pay BTC
        div._right_slash {{ reqBtcText }}
  p
  .trusty_inline_buttons
    button(@click="withdraw") Confirm
    button(@click="$router.push({ name: 'entry'})") Cancel
</template>

<script>
import AlphaInput from '@/components/UI/form/alpha';
import TrustyInput from '@/components/UI/form/input';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    TrustyInput, AlphaInput
  },
  props: ['amount', 'coin'],
  data() {
    return {
      address: ''
    };
  },
  methods: {
    ...mapActions({
      setTransaction: 'transactions/setPendingTransfer'
    }),
    withdraw() {
      const trustyWithdrawAccount = '1.2.383374';

      const memo = this.amount + ':' + this.address;
      const transaction = {
        withdraw: true,
        assetId: '1.3.861',
        amount: this.reqBtc,
        to: trustyWithdrawAccount,
        address: this.address,
        fee: 0,
        memo
      };
      console.log('goto transactions', transaction);
      this.setTransaction({ transaction });
      this.$router.push({ name: 'confirm-transactions' });
      console.log('withdraw', this.amount, this.coin, this.address, this.btcBalance, this.reqBtc);
    }
  },
  computed: {
    ...mapGetters({
      userBalances: 'account/getCurrentUserBalances',
      btcPrice: 'cryptobot/getBtcPrice'
    }),
    btcBalance() {
      return this.userBalances['1.3.861'].balance;
    },
    reqBtc() {
      return Math.floor((this.amount / this.btcPrice) * (10 ** 8));
    },
    reqBtcText() {
      return (this.reqBtc / (10 ** 8)).toFixed(8);
    }
  }
};
</script>

<style>
.withdraw_rate {
  ._right_space {
    width: 40vw;

    text-align: right;

    label {
      position: relative;
    }
  }
}
</style>