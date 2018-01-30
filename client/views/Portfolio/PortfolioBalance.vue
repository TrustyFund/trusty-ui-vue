<template>
  <tr>
    <th>{{ item.name }}</th>
    <th>{{ item.balance.toFixed(2) }}</th>
    <th>{{ item.balanceBTS.toFixed(4) }}</th>
    <th>{{ share && share.toFixed(1) }}%</th>
    <th>{{ item.balanceCurrency.toFixed(2) }}</th>
    <th>{{ item.change }}%</th>
  </tr>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
      default: {}
    },
    totalBts: {
      type: Number,
      required: true,
      default: 1
    }
  },
  data() {
    return {};
  },
  computed: {
    share() {
      return (this.item.balanceBTS / this.totalBts) * 100;
    }
  }
};
</script>

<style>

</style>
