<template lang="pug">
.trusty_deposit_fiat_fullscreen Trusty deposit
  br
  br
  br
  br
  br
  br
  div.debug
    div(v-if="hasorder") 
      | Id -> {{ currentorder.ID }}
      br
      | Status -> {{ currentorder.Status }}
    .trusty_inline_buttons
      button(@click="newOrder", v-if="!hasorder") CREATE ORDER
    .trusty_inline_buttons
      button(@click="cancelOrder", v-if="hasorder") CANCEL ORDER
    .trusty_inline_buttons
      button(@click="connect", v-if="!connected") CONNECT
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
      hasorder: 'cryptobot/hasCurrentOrder',
      currentorder: 'cryptobot/getCurrentOrder',
      connected: 'cryptobot/isConnected'
    })
  },
  methods: {
    ...mapActions({
      connect: 'cryptobot/connect',
      disconnect: 'cryptobot/disconnect',
      getorder: 'cryptobot/fetchOrder',
      createOrder: 'cryptobot/createOrder',
      cancelOrder: 'cryptobot/cancelOrder'
    }),
    newOrder() {
      this.createOrder({
        currency: 'RUB',
        amount: '10000',
        method: 'SBERBANK',
        name: 'Anton Lopan'
      });
    }
  }
};
</script>

<style>
.debug {
  background-color: grey;
  width: 100%;
  height: 100%;
  color: white;
  padding: 5vw;
}
</style>