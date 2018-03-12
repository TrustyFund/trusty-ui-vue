<template lang="pug">
  div.portfolio-wrapper
    router-view(v-if="!marketFetching" 
              :items="items"
              :total-base-value="totalBaseValue"
              :fiatPrecision="fiatPrecision")

    Portfolio(
      v-if="minMode && !marketFetching" 
      :min-mode="minMode" 
      :items="items"
      :total-base-value="totalBaseValue"
      :fiatPrecision="fiatPrecision")
</template>

<script>
// eslint-disable-next-line
import { calcPortfolioItem } from 'lib/src/utils';
import { mapGetters, mapActions } from 'vuex';
import Portfolio from './Portfolio.vue';

export default {
  props: {
    minMode: {
      type: Boolean,
      required: false,
      default: false
    },
    baseId: {
      type: String,
      required: false,
      default: '1.3.0'
    },
    fiatId: {
      type: String,
      required: false,
      default: '1.3.121'
    },
    days: {
      type: Number,
      required: false,
      default: 7
    }
  },
  components: {
    Portfolio
  },
  data() {
    return {
      pending: true
    };
  },
  computed: {
    ...mapGetters({
      ready: 'connection/isReady',
      userId: 'account/getAccountUserId',
      balances: 'user/getBalances',
      items: 'portfolio/getPortfolioList',
      history: 'market/getMarketHistory',
      marketFetching: 'market/isFetching',
      marketError: 'market/isError',
      getAssetMultiplier: 'market/getAssetMultiplier',
      assets: 'assets/getAssets'
    }),
    items() {
      const items = {};
      const assetIds = Object.keys(this.balances);
      if (!assetIds.length) return items;
      Object.keys(this.balances).forEach(id => {
        const { balance } = this.balances[id];
        const asset = this.assets[id];
        let prices = this.history[id];
        if (!prices) return;
        const multiplier = this.fiatMultiplier;
        if (id === this.baseId) prices = { first: 1, last: 1 };

        items[id] = calcPortfolioItem({
          balance,
          asset,
          prices,
          baseAsset: this.assets[this.baseId],
          fiatMultiplier: multiplier
        });
      });
      return items;
    },
    fiatMultiplier() {
      return this.getAssetMultiplier(this.fiatId);
    },
    fiatPrecision() {
      return (this.assets[this.fiatId] && this.assets[this.fiatId].precision) || 0;
    },
    totalBaseValue() {
      return Object.keys(this.items).reduce((result, id) => {
        return result + this.items[id].baseValue;
      }, 0);
    }
  },
  watch: {
    ready: {
      handler(connected) {
        if (connected && this.userId) {
          this.fetchUser(this.userId).then(result => {
            if (result.success) this.requestPortfolioData();
          });
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      fetchUser: 'user/fetchUser',
      fetchAssets: 'assets/fetchAssets',
      fetchPortfolioData: 'portfolio/fetchPortfolioData',
      resetPortfolioState: 'portfolio/resetPortfolioState',
      fetchMarketHistory: 'market/fetchMarketHistory'
    }),
    requestPortfolioData() {
      const assetsIds = Object.keys(this.balances);
      this.fetchAssets({ assets: assetsIds }).then(() => {
        this.fetchMarketHistory({
          baseId: this.baseId,
          assetsIds,
          days: 7
        });
      });
    }
  },
  beforeDestroy() {
    this.resetPortfolioState();
  }
};
</script>

<style lang="scss">

</style>
