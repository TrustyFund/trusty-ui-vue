<template lang="pug">
.manual_trading_market_asset Market {{ getAssetById(market).symbol }} : {{ getAssetById(asset).symbol }}
  Spinner(size="small", absolute, v-if="isPending")
  .orders.sell_orders
    h1 Sell orders
    template(v-for="order in sellOrders")
      p {{ order.for_sale }} - {{ dumbPrice(order) }}
  .orders.buy_orders
    h1 Buy Orders
    template(v-for="order in buyOrders")
      p {{ order.for_sale }} - {{ dumbPrice(order) }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/UI/Spinner';

export default {
  props: ['market', 'asset'],
  data() {
    console.log('Market Asset', this.market, this.asset);
    return {};
  },
  computed: {
    ...mapGetters({
      getAssetById: 'assets/getAssetById',
      getMarketOrders: 'market2/getMarketOrders',
      isPending: 'market2/isPending'
    }),
    buyOrders() {
      return this.getMarketOrders(this.market, this.asset).buy;
    },
    sellOrders() {
      return this.getMarketOrders(this.market, this.asset).sell;
    }
  },
  methods: {
    ...mapActions({
      subscribeToMarketOrders: 'market2/subscribeToMarketOrders',
      unsubscribeFromMarket: 'market2/unsubscribeFromMarket'
    }),
    dumbPrice(order) {
      return order.sell_price.base.amount / order.sell_price.quote.amount;
    }
  },
  created() {
    const baseId = this.market;
    const assetId = this.asset;
    this.subscribeToMarketOrders({ baseId, assetId });
  },
  beforeDestroy() {
    this.unsubscribeFromMarket({ baseId: this.market });
  },
  components: {
    Spinner
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