<template lang="pug">
  div
    p._value Bought {{ receives.amount }} {{ receives.assetName }} at {{ pays.amount }} {{ pays.assetName }}
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
    assetPays() {
      return this.assets[this.item.payload.pays.asset_id];
    },

    assetReceives() {
      return this.assets[this.item.payload.receives.asset_id];
    },
    pays() {
      return {
        amount: this.item.payload.pays.amount / (10 ** this.assetPays.precision),
        assetName: this.assetPays.symbol
      };
    },
    receives() {
      return {
        amount: this.item.payload.receives.amount / (10 ** this.assetReceives.precision),
        assetName: this.assetReceives.symbol
      };
    }
  }
};
</script>

<style lang="scss">
</style>
