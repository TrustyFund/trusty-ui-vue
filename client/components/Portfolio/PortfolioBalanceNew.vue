<template lang="pug">

  tr.portfolio-container__balance 
    td._text_left  {{ asset.symbol }}
        td._text_right {{ share.toFixed(0) }}%
        td._text_right {{ fiatValue.toFixed(2) }}$
        //- td._text_right {{ formattedChange }}%

</template>

<script>
export default {
  props: {
    balance: {
      type: Object,
      required: true,
      default: {}
    },
    asset: {
      type: Object,
      required: true,
      default: {}
    },
    prices: {
      type: Object,
      required: true,
      default: {}
    },
    totalBaseValue: {
      type: Number,
      required: true,
      default: 1
    },
    fiatMultiplier: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    baseValue() {
      return this.prices.last * this.balance.balance;
    },
    fiatValue() {
      return this.baseValue * this.fiatMultiplier.last;
    },
    precision() {
      return this.asset.precision;
    },
    share() {
      return ((this.baseValue / this.totalBaseValue) * 100);
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
