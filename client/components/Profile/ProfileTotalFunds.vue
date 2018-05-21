<template lang="pug">
  .trusty_total_funds
    p {{ name }}
    h3._text_center: span {{ totalFunds.toFixed(2) }}$

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    balances: {
      type: Object,
      required: true
    },
    baseId: {
      type: String,
      required: true
    },
    fiatId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      assets: 'assets/getAssets',
      getHistoryByDay: 'history/getByDay',
      getMarketPriceById: 'market/getPriceById',
      getAssetHistoryByDay: 'history/getAssetHistoryByDay'
    }),
    history24() {
      return this.getHistoryByDay(1);
    },
    history7() {
      return this.getHistoryByDay(7);
    },
    fiatAsset() {
      return this.assets[this.fiatId];
    },
    fiatPrice() {
      return this.getPriceById(this.fiatId);
    },
    totalFunds() {
      if (!this.fiatPrice) return 0;

      const totalBaseValue = Object.keys(this.balances).reduce((result, id) => {
        const balance = parseInt(this.balances[id].balance, 10);
        const price = this.getPriceById(id);
        if (!price) return result;
        if (id === this.baseId) return result + balance;
        return result + (balance * price);
      }, 0);

      const totalFiatValue = totalBaseValue * (1 / this.fiatPrice);
      const fiatPrecision = this.fiatAsset.precision;

      return (totalFiatValue / (10 ** fiatPrecision)) || 0;
    }
  },
  methods: {
    getPriceById(id) {
      return this.getMarketPriceById(id) ||
        this.getAssetHistoryByDay(id, 1).last ||
        this.getAssetHistoryByDay(id, 7).last;
    },
  }
};
</script>

<style lang="scss">

@import "~@/style/mixins";

.trusty_total_funds {
  margin-top: 1.3vw;
  margin-bottom: 1.2vw;
  p {
    font-family: 'Gotham_Pro_Regular';
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 0; 
  }
  h3 {
    font-family: 'Gotham_Pro_Medium';
    margin-top: 0;
    margin-bottom: 0;
    line-height: initial;
  }
}

</style>
