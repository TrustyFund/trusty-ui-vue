<template lang="pug">
  .transaction_info
    ._date 20 feb 18 16:56
    p._value Receive {{ amount }} BTS

</template>

<script>

export default {
  props: {
    item: {
      name: 'item',
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    amount() {
      return this.item.payload.amount.amount;
    }
  }
};
</script>

<style lang="scss">

.transaction_info {
  font-size: 4.3vw;
  margin-bottom: 4.4vw;
  ._date {
    color:#fdf101;
    font-family: Gotham_Pro;
  }

  p._value {
    color:#fdf101;
    margin: 0;
    font-family: Gotham_Pro_Regular;
  }

  @media screen and (min-width: 768px) {
    font-size: px_from_vw(4.3);
    margin-bottom: px_from_vw(4.4);
  }
}


</style>
