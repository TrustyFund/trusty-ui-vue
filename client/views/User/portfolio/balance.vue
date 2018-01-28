<template>
  <tr>
    <th>{{ name }}</th>
    <th>{{ balance.toFixed(2) }}</th>
    <th>{{ balanceBts.toFixed(4) }}</th>
    <th>{{ share }}%</th>
    <th>{{ balanceUSD }}</th>
    <th>{{ change }}%</th>
  </tr>
</template>

<script>
export default {
  props: ['name', 'balance', 'prices', 'multiplier', 'total', 'balanceBts',
    'base', 'usd'],
  data() {
    return {};
  },
  computed: {
    balanceUSD() {
      return (this.balanceBts * this.multiplier.last).toFixed(2);
    },
    change() {
      let multiplier = this.multiplier; // eslint-disable-line prefer-destructuring
      if (this.prices.lastPrice === this.prices.firstPrice && !this.base) return 0;
      if (this.usd) multiplier = { first: 1, last: 1 };
      return ((((this.prices.lastPrice * multiplier.last) /
              (this.prices.firstPrice * multiplier.first)) * 100) - 100).toFixed(1);
    },
    share() {
      if (!this.total) return 0;
      return ((this.balanceBts / this.total) * 100).toFixed();
    }
  }
};
</script>

<style>

</style>
