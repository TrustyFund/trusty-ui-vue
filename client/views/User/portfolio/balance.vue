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
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    balance: {
      type: Number,
      required: true,
      default: 0
    },
    prices: {
      type: Object,
      required: true,
      default: [0, 0]
    },
    multiplier: {
      type: Object,
      required: true,
      default: [0, 0]
    },
    total: {
      type: Number,
      required: true,
      default: 0
    },
    balanceBts: {
      type: Number,
      required: true,
      default: 0
    },
    base: {
      type: Boolean,
      required: true,
      default: false
    },
    usd: {
      type: Boolean,
      required: true,
      default: false
    }
  },
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
