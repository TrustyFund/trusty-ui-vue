<template lang="pug">

  tr.portfolio-container__balance 
        td._text_left  {{ item.name }}
        td._text_right {{ formattedShare }}%
        td._text_right {{ formattedBalanceFiat }}$
        td._text_right {{ formattedChange }}%

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
    },
    formattedShare() {
      return (this.share && this.share.toFixed(0)) || 0;
    },
    formattedBalanceFiat() {
      return this.item.balanceFiat.toFixed(0);
    },
    formattedChange() {
      return parseFloat(this.item.change, 10).toFixed(0);
    }
  }
};
</script>

<style lang="scss">
  .portfolio-container__balance {
    td, td span, td div {
      color: white;
      @media screen and (max-width: 768px) {
        font-size: 6vw;
      }
      font-family: 'Gotham_Pro_Regular';

    }
    td {
      @media screen and (max-width: 750px){
        margin-top: 10px;   
      }
    } 
  }
</style>
