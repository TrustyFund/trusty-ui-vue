<template lang="pug">
  p._value Placed an order to sell {{ sell.amount }} {{ sell.assetName }} at {{ receive.amount }} {{ receive.assetName }}
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
      return {
        amount: this.item.payload.amount_to_sell.amount / (10 ** this.assetSell.precision),
        assetName: this.assetSell && this.assetSell.symbol
      };
    },
    receive() {
      return {
        amount: this.item.payload.min_to_receive.amount / (10 ** this.assetReceive.precision),
        assetName: this.assetReceive && this.assetReceive.symbol
      };
    }

  }
};
</script>

<style lang="scss">
</style>
