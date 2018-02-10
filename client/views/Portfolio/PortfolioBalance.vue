<template lang="pug">

  tr.portfolio-container__balance 
        td._text_left  {{ item.name }}
        td._text_right {{ share && share.toFixed(0) }}%
        td._text_right {{ item.balanceFiat.toFixed(0) }}$
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
    formattedChange() {
      return parseInt(this.item.change, 10).toFixed(0);
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
