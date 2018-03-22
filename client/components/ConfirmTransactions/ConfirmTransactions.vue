<template lang="pug">
#approve_update_portfolio.main_padding

  .transaction_info
    p._value(v-for="item in items") 
      PlaceOrderInfo(:item="item", :min="true", :fiat-multiplier="fiatMultiplier.last")

  TrustyInput(label="ENTER PIN TO CONFIRM" v-show="isLocked")
    template(slot="input")
      input(v-model="pin" type="tel")


  .trusty_inline_buttons._one_button
    button(v-show="!pending" @click="confirm") CONFIRM
    button(v-show="pending") PROCESSING...

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
      pendingOrders: 'transactions/getPendingOrders',
      isLocked: 'account/isLocked',
      pending: 'transactions/areTransactionsProcessing',
      isValidPassword: 'account/isValidPassword',
      getAssetMultiplier: 'market/getAssetMultiplier'
    }),
    fiatMultiplier() {
      return this.getAssetMultiplier('1.3.121');
    },
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
      processPendingOrders: 'transactions/processPendingOrders',
      removePendingDistribution: 'transactions/removePendingDistribution',
      unlockWallet: 'account/unlockWallet'
    }),
    async confirm() {
      if (this.isLocked) {
        if (!this.pin) {
          this.$notify({
            group: 'auth',
            type: 'success',
            title: 'error',
            text: 'Enter PIN'
          });
          return;
        }
        if (this.isValidPassword(this.pin)) {
          this.unlockWallet(this.pin);
          if (this.isLocked) return;
        } else {
          this.$notify({
            group: 'auth',
            type: 'error',
            title: 'error',
            text: 'Invalid PIN'
          });
          return;
        }
      }

      const result = await this.processPendingOrders();
      if (result.success) {
        this.$notify({
          group: 'auth',
          type: 'success',
          title: 'Success',
          text: 'Orders placed'
        });
        this.$router.push({ name: 'entry' });
      } else {
        this.$notify({
          group: 'auth',
          type: 'error',
          title: 'Transactions error',
          text: result.error
        });
      }
    }
  },
  beforeDestroy() {
    this.removePendingDistribution();
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
