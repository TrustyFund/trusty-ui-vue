<template lang="pug">
.manual_trading_market_asset Market {{ getAssetById(market).symbol }} : {{ getAssetById(asset).symbol }}
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['market', 'asset'],
  data() {
    console.log('Market Asset', this.market, this.asset);
    return {};
  },
  computed: {
    ...mapGetters({
      getAssetById: 'assets/getAssetById'
    })
  }
};
</script>