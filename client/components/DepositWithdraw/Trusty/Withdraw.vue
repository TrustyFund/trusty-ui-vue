<template lang="pug">
#rub_withdraw
  TrustyInput(
    label="Enter your card number",
    v-model="address")
  ._yellow.trusty_ps_text
    | IMPORTANT: Please send 
    br
    | BitShares account using this payment method
  .trusty_inline_buttons
    button(@click="withdraw") Confirm
    button(@click="$router.push({ name: 'entry'})") Cancel
</template>

<script>
// Здесь мы примем на вход сумму рублей, сколько битков,
// Номер карты получаем из инпута и
// отправляем транзакцию:
// 44500:Master card:42760023145112
import TrustyInput from '@/components/UI/form/input';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    TrustyInput
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
      const reqBtc = Math.floor((this.amount / this.btcPrice) * (10 ** 8));
      const trustyWithdrawAccount = '1.2.383374';

      const memo = this.amount + ':' + this.address;
      const transaction = {
        withdraw: true,
        assetId: '1.3.861',
        amount: reqBtc,
        to: trustyWithdrawAccount,
        address: this.address,
        fee: 0,
        memo
      };
      console.log('goto transactions', transaction);
      this.setTransaction({ transaction });
      this.$router.push({ name: 'confirm-transactions' });
      console.log('withdraw', this.amount, this.coin, this.address, this.btcBalance, reqBtc);
    }
  },
  computed: {
    ...mapGetters({
      userBalances: 'account/getCurrentUserBalances',
      btcPrice: 'cryptobot/getBtcPrice'
    }),
    btcBalance() {
      return this.userBalances['1.3.861'].balance;
    }
  }
};
</script>