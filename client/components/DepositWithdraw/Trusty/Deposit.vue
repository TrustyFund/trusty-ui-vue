<template lang="pug">
.trusty_deposit_fiat_fullscreen Trusty deposit
  br
  br
  br
  br
  br
  br
  .trusty_inline_buttons
      button(@click="test") TEST
</template>

<script>
import Header from '@/components/Header/Header';
import { mapGetters, mapActions } from 'vuex';

import './style.css';

export default {
  components: {
    Header
  },
  data() {
    return {};
  },
  beforeMount() {
    this.connect();
  },
  beforeDestroy() {
    this.disconnect();
  },
  computed: {
    ...mapGetters({
      address: 'openledger/getDepositAddress',
      coinsData: 'openledger/getCoinsData'
    })
  },
  methods: {
    ...mapActions({
      connect: 'cryptobot/connect',
      disconnect: 'cryptobot/disconnect',
      getorder: 'cryptobot/fetchOrder'
    }),
    test() {
      this.getorder({ orderId: 1 });
    }
  }
};
</script>

<style>
</style>