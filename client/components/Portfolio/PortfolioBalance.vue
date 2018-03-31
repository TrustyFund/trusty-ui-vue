<template lang="pug">

  tr.portfolio-container__balance 
    td._text_left(@click="navigateToCoin(item)")
      span {{ item.name }}
      Icon(name="trusty_portfolio_arrow_right")
    td._text_right: span {{ formattedShare }}%
    td._text_right: span {{ formattedBalanceFiat }}
    td._text_right: span {{ formattedChange }}%

</template>

<script>
import Icon from '@/components/UI/icon';

export default {
  components: { Icon },
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
    },
    fiatPrecision: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {
    share() {
      return (this.item.baseValue / this.totalBaseValue) * 100;
    },
    formattedShare() {
      return (this.share && Math.round(this.share, 0)) || 0;
    },
    formattedBalanceFiat() {
      if (!this.item.fiatValue) return '0.00';
      const precisedFiatValue = (this.item.fiatValue / (10 ** this.fiatPrecision)).toFixed(2);
      return precisedFiatValue;
    },
    formattedChange() {
      if (!this.item.change) return 0;
      let change = this.item.change.toFixed(0).toString();
      if (change.length > 3) change = change.substring(0, 3);
      return change;
    }
  },
  methods: {
    navigateToCoin(asset) {
      this.$router.push({
        name: 'coin',
        params: {
          symbol: asset.name,
          assetId: asset.id
        }
      });
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
        padding-left: 0; 
      }
    } 
    .trusty_portfolio_arrow_right {
      margin-left: 1vw;
      svg {
        fill: #9ea2a5;
        height: 3.7vw;        
      }
    }
  }
</style>
