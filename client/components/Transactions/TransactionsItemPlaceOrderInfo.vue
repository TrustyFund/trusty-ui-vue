<template lang="pug">
  div
    p._value Placed an order to sell {{ sell.amount }} {{ sell.assetName }} at {{ receive.amount }} {{ receive.assetName }}
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    assets: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    assetSell() {
      return this.assets[this.item.payload.amount_to_sell.asset_id];
    },
    assetReceive() {
      return this.assets[this.item.payload.min_to_receive.asset_id];
    },
    sell() {
      return {
        amount: this.item.payload.amount_to_sell.amount * (10 ** this.assetSell.precision),
        assetName: this.assetSell && this.assetSell.symbol
      };
    },
    receive() {
      return {
        amount: this.item.payload.min_to_receive.amount * (10 ** this.assetReceive.precision),
        assetName: this.assetReceive && this.assetReceive.symbol
      };
    }

  }
};
</script>

<style lang="scss">
</style>
