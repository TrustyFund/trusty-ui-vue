<template lang="pug">
  div
    p._value Bought {{ receives.amount }} {{ receives.assetName }} at {{ pays.amount }} {{ pays.assetName }}
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
    assetPays() {
      return this.getAssetById(this.item.payload.pays.asset_id);
    },
    assetReceives() {
      return this.getAssetById(this.item.payload.receives.asset_id);
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
