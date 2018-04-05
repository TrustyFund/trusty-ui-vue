<template lang="pug">
.manual_trading_market | MARKET {{ getAssetById(market).symbol }}
  template(v-for="asset in assetsList")
    div(@click="goToMarketAsset(asset)") {{ getAssetById(asset).symbol }}
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['market'],
  data() {
    console.log('INIT MARKET', this.market);
    return {};
  },
  computed: {
    ...mapGetters({
      getAssetById: 'assets/getAssetById',
      getBalances: 'user/getBalances',
      getAssets: 'assets/getDefaultAssetsIds'
    }),
    assetsList() {
      const combinedBalances = { ...this.getBalances };
      this.getAssets.forEach(id => {
        if (combinedBalances[id] || this.market === id) return;
        combinedBalances[id] = { balance: 0 };
      });
      console.log('Combined', combinedBalances, this.getAssets);
      return Object.keys(combinedBalances);
    }
  },
  methods: {
    goToMarketAsset(asset) {
      this.$router.push({
        name: 'manage-manual-market-asset',
        params: { market: this.market, asset }
      });
    }
  }
};
</script>