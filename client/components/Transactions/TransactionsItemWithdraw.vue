<template lang="pug">
  p._value {{ text }} {{ amount }}
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    text() {
      if (this.type === 'pending') {
        return 'Pending withdraw';
      }
      if (this.type === 'result') {
        if (this.item.payload.amount.amount === 1) {
          return 'Withdraw complited';
        }
        return 'Withdraw rejected';
      }
      return '';
    },
    amount() {
      if (this.item.payload.amount.amount > 1) {
        return (this.item.payload.amount.amount / (10 ** 8)).toFixed(8) + ' BTC';
      }
      return '';
    }
  }
};
</script>
