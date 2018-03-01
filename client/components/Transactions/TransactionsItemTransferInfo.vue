<template lang="pug">
  p._value {{ transferType }} {{ amount }} {{ assetName }}
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
    transferType() {
      return (this.item.payload.from === this.userId) ? 'Sent' : 'Recieved';
    },
    amount() {
      return this.item.payload.amount.amount / (10 ** this.asset.precision);
    },
    asset() {
      return this.getAssetById(this.item.payload.amount.asset_id);
    },
    assetName() {
      return this.asset && this.asset.symbol;
    }
  }
};
</script>

<style lang="scss">
</style>
