<template lang="pug">
div.portfolio-container
  .trusty_inline_buttons._mob._one_button(
      @click="goToManagePortfolio" 
      v-show="!minMode && totalBaseValue"
      :class="{'_disabled': !subscribedToMarket}")
      button(v-show="subscribedToMarket") MANAGE FUND
      button(v-show="!subscribedToMarket")
        Spinner(size="small", :absolute="false")
        div LOADING MARKET...
  div.grid_wrapper
    ._text_left.portfolio_head ASSET
    ._text_right.portfolio_head SHARE
    ._text_right.portfolio_head $VALUE
    ._text_right.portfolio_head 24H
    template(v-for="item in itemsAsArray")
      ._text_left.overflowed.portfolio_item(@click="navigateToCoin(item)") {{ item.name }}
      ._text_right.portfolio_item {{ formattedShare(item) }}%
      ._text_right.portfolio_item {{ formattedBalanceFiat(item) }}
      ._text_right.portfolio_item {{ formattedChange(item) }}%
</template>

<script>
import { mapGetters } from 'vuex';
// eslint-disable-next-line
import { calcPortfolioItem } from 'lib/src/utils';
import Spinner from '@/components/UI/Spinner';

export default {
  components: {
    Spinner
  },
  data() {
    return {
    };
  },
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
      defaultAssetsIds: 'assets/getDefaultAssetsIds',
      subscribedToMarket: 'market/isSubscribed'
    }),
    combinedBalances() {
      const combinedBalances = { ...this.balances };
      this.defaultAssetsIds.forEach(id => {
        if (combinedBalances[id]) return;
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
        items[id].id = id;
      });
      return items;
    },
    itemsAsArray() {
      const array = Object.keys(this.items).map(assetId => this.items[assetId]);
      const sortedArray = array.sort((a, b) => {
        return a.baseValue === b.baseValue ? 0 : +(b.baseValue > a.baseValue) || -1;
      });
      return sortedArray;
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
  methods: {
    goToManagePortfolio() {
      if (!this.subscribedToMarket) return;
      this.$router.push({ name: 'manage' });
    },
    share(item) {
      return (item.baseValue / this.totalBaseValue) * 100;
    },
    formattedShare(item) {
      return (this.share(item) && Math.round(this.share(item), 0)) || 0;
    },
    formattedBalanceFiat(item) {
      if (!item.fiatValue) return '0';
      const precisedFiatValue = item.fiatValue / (10 ** this.fiatPrecision);
      if (precisedFiatValue > 10) return Math.floor(precisedFiatValue);
      if (precisedFiatValue > 0.1) return precisedFiatValue.toFixed(1);
      return precisedFiatValue.toFixed(2);
    },
    formattedChange(item) {
      if (!item.change) return 0;
      let change = item.change.toFixed(0).toString();
      if (change.length > 3) change = change.substring(0, 3);
      return change;
    },
    navigateToCoin(item) {
      console.log('ITEM', item);
      this.$router.push({
        name: 'coin',
        params: {
          symbol: item.name,
          assetId: item.id
        }
      });
    }
  }
};
</script>

<style lang="scss">
  .grid_wrapper {
    position: relative;
    width: 100%;
    display: grid;
    grid-gap: 0%;
    grid-row-gap: 2.5vw;
    grid-template-columns: 35% 20% 25% 20%;
    margin-bottom: 2em;
    padding-top: 3vw;
    font-family: 'Gotham_Pro_Regular';

    .portfolio_head {
      font-size: 4.4vw;
      color: #cccccc;
      font-weight: 700;
    }

    .portfolio_item {
      font-size: 6vw;
      color: white;
      overflow: hidden;
    }

  }

  .overflowed {
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
  }
</style>
