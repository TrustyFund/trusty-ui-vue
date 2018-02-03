<template>
  <tr>
    <th>{{ item.name }}</th>
    <th>{{ item.balance.toFixed(2) }}</th>
    <th>{{ item.balanceBase.toFixed(4) }}</th>
    <th>{{ share && share.toFixed(1) }}%</th>
    <th>{{ item.balanceFiat.toFixed(2) }}</th>
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
    totalBaseValue: {
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
      return (this.item.balanceBase / this.totalBaseValue) * 100;
    }
  }
};
</script>

<style>

</style>
