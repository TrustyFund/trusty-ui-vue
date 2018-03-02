<template lang="pug">
  p._value(v-if="isBuying") Bought {{ receives.amount }} {{ receives.assetName }} at {{ pays.amount }} {{ pays.assetName }}
  p._value(v-else) Sold {{ pays.amount }} {{ pays.assetName }} at {{ receives.amount }} {{ receives.assetName }}
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
      const amount = this.item.payload.pays.amount / (10 ** this.assetPays.precision);
      return {
        amount: amount.toFixed(8).replace(/\.?0+$/, ''), // to display really small numbers
        assetName: this.assetPays.symbol
      };
    },
    receives() {
      const amount = this.item.payload.receives.amount / (10 ** this.assetReceives.precision);
      return {
        amount: amount.toFixed(8).replace(/\.?0+$/, ''),
        assetName: this.assetReceives.symbol
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
