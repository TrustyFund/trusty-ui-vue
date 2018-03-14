<template lang="pug">
  div
    .trusty_inline_buttons._mob._one_button(@click="goToManagePortfolio" v-show="!minMode"): button MANAGE FUND
    table.portfolio-container.trusty_table
      thead
        tr
          th._text_left: span ASSET
          th._text_right: span SHARE 
          th._text_right: span $VALUE
          th._text_right: span 7DAYS
      tbody
        PortfolioBalance(
        v-for="item in items"
        :key="item.name"
        :item="item"
        :totalBaseValue="totalBaseValue"
        :fiatPrecision="fiatPrecision")

</template>

<script>
import { mapGetters } from 'vuex';
// eslint-disable-next-line
import { calcPortfolioItem } from 'lib/src/utils';
import PortfolioBalance from './PortfolioBalance.vue';

export default {
  props: {
    baseId: {
      type: String,
      required: false,
      default: '1.3.0'
    },
    fiatId: {
      type: String,
      required: false,
      default: '1.3.121'
    },
    balances: {
      type: Object,
      required: true,
      default: () => { return {}; }
    },
    minMode: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      history: 'market/getMarketHistory',
      marketFetching: 'market/isFetching',
      marketError: 'market/isError',
      getAssetMultiplier: 'market/getAssetMultiplier',
      assets: 'assets/getAssets',
      defaultAssetsIds: 'assets/getDefaultAssetsIds'
    }),
    combinedBalances() {
      // console.log(this.defaultAssetsIds);
      const combinedBalances = { ...this.balances };
      this.defaultAssetsIds.forEach(id => {
        if (combinedBalances[id]) return;
        // console.log(id);
        combinedBalances[id] = { balance: 0 };
      });
      return combinedBalances;
    },
    items() {
      const items = {};
      const assetsIds = Object.keys(this.combinedBalances);
      if (!assetsIds.length) return items;
      assetsIds.forEach(id => {
        const { balance } = this.combinedBalances[id];
        const asset = this.assets[id];
        let prices = this.history[id];
        if (!prices) return;
        const multiplier = this.fiatMultiplier;
        if (id === this.baseId) prices = { first: 1, last: 1 };

        items[id] = calcPortfolioItem({
          balance,
          asset,
          prices,
          baseAsset: this.assets[this.baseId],
          fiatMultiplier: multiplier
        });
      });
      return items;
    },
    fiatMultiplier() {
      return this.getAssetMultiplier(this.fiatId);
    },
    fiatPrecision() {
      return (this.assets[this.fiatId] && this.assets[this.fiatId].precision) || 0;
    },
    totalBaseValue() {
      return Object.keys(this.items).reduce((result, id) => {
        return result + this.items[id].baseValue;
      }, 0);
    }
  },
  components: {
    PortfolioBalance
  },
  data() {
    return {
    };
  },
  methods: {
    goToManagePortfolio() {
      this.$router.push({ name: 'manage' });
    }
  }
};
</script>

<style lang="scss">
  .trusty_table {
    width: 100%;
    margin-top: 20px;
    thead, th, tbody {
      color: white;
      border: none;
      background-color: transparent;
    }
    th span {
      color: #cccccc;
      font-family: 'Gotham_Pro_Regular';
      @media screen and (max-width: 768px){
        font-size: 4.4vw;
      }
    }
  }
</style>
