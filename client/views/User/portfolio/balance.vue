<template>
  <tr>
    <th>{{ name }}</th>
    <th>{{ balance }}</th>
    <th>{{ balanceBts.toFixed(4) }}</th>
    <th>{{ share }}%</th>
    <th>{{ balanceUSD }}</th>
    <th>{{ change }}%</th>
  </tr>
</template>

<script>
export default {
  props: ['name', 'balance', 'prices', 'multiplier', 'total', 'balanceBts'],
  data() {
    return {};
  },
  computed: {
    balanceUSD() {
      return (this.balanceBts * this.multiplier.last).toFixed(2);
    },
    change() {
      if (this.prices.lastPrice === this.prices.firstPrice) return 0;
      return ((((this.prices.lastPrice * this.multiplier.last) /
              (this.prices.firstPrice * this.multiplier.first)) * 100) - 100).toFixed(1);
    },
    share() {
      if (!this.total) return 0;
      return ((this.balanceBts / this.total) * 100).toFixed();
    },
  }
};
</script>

<style>

</style>
