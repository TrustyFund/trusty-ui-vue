<template lang="pug">
  div.transaction_info__type-wrapper 
    div.transaction_info__type(
      :class="'transaction_info__type--' + theme") {{ typeName }}
</template>

<script>

export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    theme() {
      switch (this.type) {
        case 'transfer':
        case 'fill_order':
          return 'green';
        case 'limit_order_create':
          return 'yellow';
        case 'limit_order_cancel':
          return 'red';
        default:
          return 'white';
      }
    },
    typeName() {
      switch (this.type) {
        case 'fill_order':
          return 'fill order';
        case 'limit_order_create':
          return 'place order';
        case 'limit_order_cancel':
          return 'cancel order';
        default:
          return this.type;
      }
    }
  },
};
</script>

<style lang="scss">
.transaction_info__type-wrapper {
  min-width: 130px;
  // text-align: center;
}
.transaction_info__type {
  display: inline-block;
  white-space: nowrap;
  border: 1px solid white;
  color: white;
  margin-right: 10px;
  padding: 7px 7px 3px;
  border-radius: 4px;
  text-transform: uppercase;
  font-family: Gotham_Pro_Regular;
  font-size: 3.3vw;
  &--green {
    border-color: green;
    color: green;
  }
  &--yellow {
    border-color: #fcab53;
    color: #fcab53;
  }
  &--red {
    border-color: red;
    color: red;
  }
}

</style>
