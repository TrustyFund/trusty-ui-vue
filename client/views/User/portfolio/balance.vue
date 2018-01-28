<template>
  <tr>
    <th>{{ asset.symbol }}</th>
    <th>{{ balance.toFixed(4) }}</th>
    <th>{{ !fetching ? valueBTS : 'loading' }}</th>
    <th>{{ share.toFixed(1) || 0 }}%</th>
    <th>{{ !fetching ? valueUSD : 'loading' }}</th>
    <th>{{ !fetching ? priceChange : 'loading' }}%</th>
  </tr>
</template>

<script>
export default {
  props: ['asset', 'price', 'multiplier', 'baseId', 'total'],
  data() {
    return {};
  },
  computed: {
    fetching() {
      return !this.price || this.price.fetching;
    },
    balance() {
      return this.asset.balance || 0;
    },
    valueBTS() {
      if (this.asset.id === this.baseId) return this.balance.toFixed(4);
      return (this.balance * this.price.lastPrice).toFixed(4);
    },
    share() {
      if (!this.total) return 0;
      return (this.valueBTS / this.total) * 100;
    },
    valueUSD() {
      return (this.valueBTS * this.multiplier.last).toFixed(4);
    },
    priceChange() {
      if (this.price.lastPrice === this.price.firstPrice) return 0;
      return Math.floor((((this.price.lastPrice * this.multiplier.last) /
        (this.price.firstPrice * this.multiplier.first)) * 100) - 100);
    }
  }
};
</script>

<style>

</style>
