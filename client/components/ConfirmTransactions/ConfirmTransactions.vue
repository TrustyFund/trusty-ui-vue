<template lang="pug">
#approve_update_portfolio.main_padding

  .transaction_info
    template(v-if="hasOrders")
      p._value(v-for="order in orders") 
        PlaceOrderInfo(:item="order", :min="true" :fiat-id="fiatId")
      p._value
      p._value Transaction fee: {{ totalOrderFees.base }} BTS ({{ totalOrderFees.fiat }}$)

    template(v-if="hasPendingTransfer")
      template(v-if="isWithdraw")
        p._value(v-if="isWithdraw") Withdraw {{ withdraw.amount}} {{ transfer.asset.symbol }} to {{ withdraw.address }}
        p
        p._value Withdrawal fee {{ withdraw.fee }} {{ transfer.asset.symbol }}
        p._value Transaction fee {{ withdrawFee }} BTS
      template(v-else)
        p._value Send {{ transfer.realamount }} {{ transfer.asset.symbol }} to {{ transfer.to }}
        p
        p._value Transaction fee {{ transferFee.base }} BTS ({{ transferFee.fiat }}$)

  TrustyInput(label="ENTER PIN TO CONFIRM" v-show="isLocked")
    template(slot="input")
      input(v-model="pin" type="tel")


  .trusty_inline_buttons._one_button(:class="{'_disabled': pending}")
    button(v-show="!pending" @click="confirm") CONFIRM
    button(v-show="pending") 
      Spinner(size="small" :absolute="false")
      div Processing...

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TrustyInput from '@/components/UI/form/input';
import PlaceOrderInfo from '@/components/Transactions/TransactionsItemPlaceOrderInfo.vue';
import Spinner from '@/components/UI/Spinner';

export default {
  components: {
    PlaceOrderInfo,
    TrustyInput,
    Spinner
  },
  data() {
    return {
      pin: '',
      fiatId: '1.3.121'
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
      hasOrders: 'transactions/hasPendingOrders',
      getAssetMultiplier: 'market/getAssetMultiplier',
      getMemoFee: 'transactions/getMemoPrice',
      transferPrice: 'transactions/getTransferFee',
      orderFee: 'transactions/getOrderFee'
    }),
    fiatMultiplier() {
      return this.getAssetMultiplier(this.fiatId);
    },
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
    withdrawFee() {
      const fee = this.getMemoFee(this.withdraw.memo);
      return (fee * (10 ** -5)).toFixed(5);
    },
    withdraw() {
      const { fee, address, memo } = this.pendingTransfer;
      const { realamount, asset } = this.transfer;
      const finalamount = realamount - fee;
      const amount = finalamount.toFixed(asset.precision);
      return { amount, address, fee, memo };
    },
    isWithdraw() {
      const { withdraw } = this.pendingTransfer;
      if (withdraw) {
        return true;
      }
      return false;
    },
    orders() {
      if (!this.hasOrders) return [];
      return [...this.sellOrders.map(order => ({ payload: order, buyer: false })),
        ...this.buyOrders.map(order => ({ payload: order, buyer: true }))];
    },
    transferFee() {
      const transferFeeBase = (this.transferPrice * (10 ** -5));
      const transferFeeFiat = transferFeeBase * this.fiatMultiplier;
      return {
        base: transferFeeBase.toFixed(5),
        fiat: transferFeeFiat.toFixed(5)
      };
    },
    totalOrderFees() {
      const baseValue = (this.orders.length * this.orderFee) / (10 ** 5);
      const fiatValue = baseValue * this.fiatMultiplier;
      return {
        base: baseValue.toFixed(5),
        fiat: fiatValue.toFixed(5)
      };
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
          this.$toast.warning('Enter PIN');
          return false;
        }
        if (this.isValidPassword(this.pin)) {
          this.unlockWallet(this.pin);
          if (this.isLocked) return false;
        } else {
          this.$toast.error('Invalid PIN');
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
        this.$toast.success('Orders filled');
        this.$router.push({ name: 'entry' });
      } else {
        this.$toast.error(`Try again: Transactions error (${result.error})`);
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

      if (this.pendingTransfer.memo) {
        params.memo = this.pendingTransfer.memo;
      }

      const result = await this.transferAsset(params);
      if (result.success) {
        this.$toast.success('Transaction completed');
        this.$router.push({ name: 'entry' });
      } else {
        this.$toast.error('Transaction error: ' + result.error);
      }
    }
  },
  beforeDestroy() {
    this.removePendingDistribution();
  },
  created() {
    if (!this.hasOrders && !this.hasPendingTransfer) {
      this.$router.go(-1);
      this.$toast.error('Unable to create orders, try again');
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
