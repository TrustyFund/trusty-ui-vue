<template lang="pug">
  p._value(v-if="isBuying")
    span(v-show="!min") Placed an order to buy 
    span(v-show="min") Buy 
    span {{ receive.amount }} {{ receive.assetName }} at {{ ratio }} 
    span.ratio-assets {{ sell.assetName }}/{{ receive.assetName }} 
    span(v-show="fiatMultiplier")  ({{ sell.amountFiat }}$)
  p._value(v-else) 
    span(v-show="!min") Placed an order to sell 
    span(v-show="min") Sell 
    span {{ sell.amount }} {{ sell.assetName }} at {{ ratio }} 
    span.ratio-assets {{ receive.assetName }}/{{ sell.assetName }}
    span(v-show="fiatMultiplier")  ({{ receive.amountFiat }}$)
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    min: {
      type: Boolean,
      required: false,
      default: false
    },
    fiatMultiplier: {
      type: Number,
      required: false,
      default: 0
    },
    fiatId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      getAssetById: 'assets/getAssetById'
    }),
    assetSell() {
      return this.getAssetById(this.item.payload.amount_to_sell.asset_id);
    },
    fiatPrecision() {
      return this.getAssetById(this.fiatId).precision;
    },
    assetReceive() {
      return this.getAssetById(this.item.payload.min_to_receive.asset_id);
    },
    sell() {
      const amount = this.item.payload.amount_to_sell.amount / (10 ** this.assetSell.precision);
      const amountFiat = (this.item.payload.amount_to_sell.amount * this.fiatMultiplier) /
        (10 ** this.fiatPrecision);
      return {
        amount: amount.toFixed(8).replace(/\.?0+$/, ''),
        amountFiat: amountFiat.toFixed(2),
        assetName: this.assetSell && this.assetSell.symbol
      };
    },
    receive() {
      const amount = this.item.payload.min_to_receive.amount / (10 ** this.assetReceive.precision);
      const amountFiat = (this.item.payload.min_to_receive.amount * this.fiatMultiplier) /
        (10 ** this.fiatPrecision);
      return {
        amount: amount.toFixed(8).replace(/\.?0+$/, ''),
        amountFiat: amountFiat.toFixed(2),
        assetName: this.assetReceive && this.assetReceive.symbol
      };
    },
    isBuying() {
      return this.item.buyer;
    },
    ratio() {
      const ratio = this.isBuying ? this.sell.amount / this.receive.amount :
        this.receive.amount / this.sell.amount;
      return ratio.toFixed(5);
    }
  }
};
</script>

<style lang="scss">
.ratio-assets {
  color: inherit;
  border-bottom: 1px dashed white;
}
</style>
