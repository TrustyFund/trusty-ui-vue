<template lang="pug">
#rub_withdraw
  TrustyInput(
    type="tel",
    label="ENTER CARDHOLDER'S NAME",
    v-model="name")
  p
  TrustyInput(
    type="tel",
    label="Enter card number",
    v-model="address")
  p
  .withdraw_rate
    alpha-input(:isOpen="true" label="exchange rate RUB/BTC")
      template(slot="input"): div._simple_text_left.rate {{ rate }}
      template(slot="right")
        label.trusty_place_holder You will pay BTC
        div._right_slash {{ reqBtcText }}
  p
  .trusty_inline_buttons
    button(@click="withdraw") Confirm
    button(@click="$router.push({ name: 'entry'})") Cancel
  p.trusty_ps_text
    | Payment gateway service is provided by users of #[br] Localbitcoins.com
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
      address: '',
      name: ''
    };
  },
  methods: {
    ...mapActions({
      setTransaction: 'transactions/setPendingTransfer'
    }),
    withdraw() {
      const trustyWithdrawAccount = '1.2.852336';

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
    },
    rate() {
      return Math.floor(this.btcPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
  }
};
</script>

<style>
.withdraw_rate {

  ._input_space {
    border: none!important;
  }

  ._right_space {
    width: 40vw;


    text-align: right;
  }

  label.trusty_place_holder {
    position: relative;
    bottom: 0;
  }
}
</style>