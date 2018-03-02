<template lang="pug">
  p._value(v-if="isBuying") Placed an order to buy {{ receive.amount }} {{ receive.assetName }} at {{ sell.amount }} {{ sell.assetName }}
  p._value(v-else) Placed an order to sell {{ sell.amount }} {{ sell.assetName }} at {{ receive.amount }} {{ receive.assetName }}
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getAssetById: 'assets/getAssetById'
    }),
    assetSell() {
      return this.getAssetById(this.item.payload.amount_to_sell.asset_id);
    },
    assetReceive() {
      return this.getAssetById(this.item.payload.min_to_receive.asset_id);
    },
    sell() {
      const amount = this.item.payload.amount_to_sell.amount / (10 ** this.assetSell.precision);
      return {
        amount: amount.toFixed(8).replace(/\.?0+$/, ''),
        assetName: this.assetSell && this.assetSell.symbol
      };
    },
    receive() {
      const amount = this.item.payload.min_to_receive.amount / (10 ** this.assetReceive.precision);
      return {
        amount: amount.toFixed(8).replace(/\.?0+$/, ''),
        assetName: this.assetReceive && this.assetReceive.symbol
      };
    },
    isBuying() {
      return this.item.buyer;
    }
  }
};
</script>

<style lang="scss">
</style>
