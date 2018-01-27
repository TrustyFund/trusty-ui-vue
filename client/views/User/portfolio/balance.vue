<template>
  <tr>
    <th>{{ asset.name }}</th>
    <th>{{ asset.balance.toFixed(4) }}</th>
    <th>{{ !fetching ? valueBTS : 'loading' }}</th>
    <th>{{ !fetching ? valueUSD : 'loading' }}</th>
    <th>{{ !fetching ? priceChange : 'loading' }}%</th>
  </tr>
</template>

<script>
export default {
  props: ['asset', 'price', 'multiplier', 'baseId'],
  data() {
    return {};
  },
  computed: {
    fetching() {
      return !this.price || this.price.fetching;
    },
    valueBTS() {
      if (this.asset.id === this.baseId) return this.asset.balance.toFixed(4);
      return (this.asset.balance * this.price.lastPrice).toFixed(4);
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
