<template lang="pug">
#approve_update_portfolio.main_padding

  .transaction_info
    p._value(v-for="order in orders") 
      PlaceOrderInfo(:item="order", :min="true")

    p._value(v-if="hasPendingTransfer") Send {{ transfer.realamount }} {{ transfer.asset.symbol }} to {{ transfer.to }}

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
  mounted() {
    console.log(this.pendingTransfer);
  },
  data() {
    return {
      pin: ''
    };
  },
  computed: {
    ...mapGetters({
      pendingOrders: 'transactions/getPendingOrders',
      pendingTransfer: 'transactions/getPendingTransfer',
      hasPendingTransfer: 'transactions/hasPendingTransfer',
      isLocked: 'account/isLocked',
      pending: 'transactions/areTransactionsProcessing',
      isValidPassword: 'account/isValidPassword',
      getAssetById: 'assets/getAssetById',
      hasOrders: 'transactions/hasPendingOrders'
    }),
    sellOrders() {
      return this.pendingOrders.sellOrders;
    },
    buyOrders() {
      return this.pendingOrders.buyOrders;
    },
    transfer() {
      const { assetId, amount, to } = this.pendingTransfer;
      const asset = this.getAssetById(assetId);
      const realamount = (amount * (10 ** -asset.precision)).toFixed(asset.precision);
      return { asset, realamount, to };
    },
    orders() {
      const orders = [];
      if (!this.hasOrders) return [];
      this.sellOrders.forEach(order => {
        orders.push({
          payload: order,
          buyer: false
        });
      });
      this.buyOrders.forEach(order => {
        orders.push({
          payload: order,
          buyer: true
        });
      });
      return orders;
    }
  },
  methods: {
    ...mapActions({
      processPendingOrders: 'transactions/processPendingOrders',
      removePendingDistribution: 'transactions/removePendingDistribution',
      unlockWallet: 'account/unlockWallet',
      transferAsset: 'transactions/transferAsset'
    }),
    checkLocked() {
      if (this.isLocked) {
        if (!this.pin) {
          this.$notify({
            type: 'warn',
            text: 'Enter PIN'
          });
          return false;
        }
        if (this.isValidPassword(this.pin)) {
          this.unlockWallet(this.pin);
          if (this.isLocked) return false;
        } else {
          this.$notify({
            type: 'error',
            text: 'Invalid PIN'
          });
          return false;
        }
      }
      return true;
    },
    async confirm() {
      if (!this.checkLocked()) return;
      if (this.hasOrders) this.processOrders();
      if (this.hasPendingTransfer) this.processTransfer();
    },
    async processOrders() {
      const result = await this.processPendingOrders();
      if (result.success) {
        this.$notify({
          type: 'success',
          text: 'Orders filled'
        });
        this.$router.push({ name: 'entry' });
      } else {
        this.$notify({
          type: 'error',
          title: 'Transactions error',
          text: result.error
        });
      }
    },
    async processTransfer() {
      console.log('TRANSFER!');
      console.log(this.pendingTransfer.to);
      const params = {
        to: this.pendingTransfer.to,
        assetId: this.pendingTransfer.assetId,
        amount: this.pendingTransfer.amount
      };
      const result = await this.transferAsset(params);
      if (result.success) {
        this.$notify({
          type: 'success',
          text: 'Transaction completed'
        });
        this.$router.push({ name: 'entry' });
      } else {
        this.$notify({
          type: 'error',
          title: 'Transaction error',
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
