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
  computed: {
    ...mapGetters({
      address: 'openledger/getDepositAddress',
      coinsData: 'openledger/getCoinsData'
    })
  },
  methods: {
    ...mapActions({
      connect: 'cryptobot/connectToCryptobot',
      getorder: 'cryptobot/fetchCurrentOrder'
    }),
    test() {
      this.getorder();
    }
  }
};
</script>

<style>
</style>