<template lang="pug">
#approve_update_portfolio.main_padding

  .transaction_info
    p._value(v-for="item in items") 
      PlaceOrderInfo(:item="item")

  TrustyInput(label="ENTER PIN TO CONFIRM")
    template(slot="input")
      input(v-model="pin" type="pin")

  .trusty_inline_buttons._one_button(@click="confirm")
    button CONFIRM

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TrustyInput from '@/components/UI/form/input';
import PlaceOrderInfo from '@/components/Transactions/TransactionsItemPlaceOrderInfo.vue';

export default {
  components: {
    PlaceOrderInfo,
    TrustyInput
  },
  data() {
    return {
      pin: ''
    };
  },
  computed: {
    ...mapGetters({
      pendingOrders: 'transactions/getPendingOrders'
    }),
    sellOrders() {
      return this.pendingOrders.sellOrders;
    },
    buyOrders() {
      return this.pendingOrders.buyOrders;
    },
    items() {
      const items = [];
      if (!this.sellOrders || !this.buyOrders) return [];
      this.sellOrders.forEach(order => {
        items.push({
          payload: order,
          buyer: false
        });
      });
      this.buyOrders.forEach(order => {
        items.push({
          payload: order,
          buyer: true
        });
      });
      return items;
    }
  },
  methods: {
    ...mapActions({
      processPendingOrders: 'transactions/processPendingOrders'
    }),
    confirm() {
      this.processPendingOrders();
    }
  }
};
</script>

<style lang="scss">
p._value {
  padding-top: 1vw;
}
.trusty_inline_buttons._one_button {
  padding-top: 5vw;
}
#approve_update_portfolio .transaction_info {
  flex-direction: column;
}
</style>
