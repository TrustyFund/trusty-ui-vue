<template lang="pug">
.manual_trading_market_asset Market {{ getAssetById(market).symbol }} : {{ getAssetById(asset).symbol }}
  .orders.sell_orders
    template(v-for="order in sellOrders")
      p {{ order.id }}
  .orders.buy_orders
    template(v-for="order in buyOrders")
      p {{ order.id }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['market', 'asset'],
  data() {
    console.log('Market Asset', this.market, this.asset);
    return {};
  },
  computed: {
    ...mapGetters({
      getAssetById: 'assets/getAssetById',
      getMarketOrders: 'market2/getMarketOrders'
    }),
    buyOrders() {
      return this.getMarketOrders(this.market)[this.asset].buy;
    },
    sellOrders() {
      return this.getMarketOrders(this.market)[this.asset].sell;
    }
  },
  methods: {
    ...mapActions({
      subscribeToMarket: 'market2/subscribeToMarket',
      unsubscribeFromMarket: 'market2/unsubscribeFromMarket'
    })
  },
  created() {
    const baseId = this.market;
    const assetId = this.asset;
    this.subscribeToMarket({ baseId, assetId });
  },
  beforeDestroy() {
    this.unsubscribeFromMarket({ baseId: this.market });
  }
};
</script>

<style>
.manual_trading_market_asset .orders {
  height: 40vh;
  width: 100vw;
  overflow-y: scroll;
}
</style>