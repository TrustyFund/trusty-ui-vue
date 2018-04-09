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

  div._text_right 
    span.portfolio-toggle(@click="toggle") {{ toggleTitle }}
  div.portfolio-data
    div.portfolio-data__header
      ._text_left.portfolio_head ASSET
      transition(name="fade" mode="out-in")
        ._text_right.portfolio_head(:key="showBalances") {{ showBalances ? '$PRICE' : '$VALUE' }}
      transition(name="fade" mode="out-in")
        ._text_right.portfolio_head(:key="showBalances") {{ showBalances ? '24H' : 'TOKENS' }}
      transition(name="fade" mode="out-in")
        ._text_right.portfolio_head(:key="showBalances") {{ showBalances ? '7D' : 'SHARE' }}
    div.portfolio-data__body
      PortfolioItem(v-for="item in itemsAsArray" 
                    :key="item.id"
                    :balances-mode="showBalances"
                    :item="item"
                    :total-base-value="totalBaseValue"
                    :fiat-multiplier="fiatMultiplier.last"
                    :fiat-precision="fiatPrecision")
</template>

<script>
import { mapGetters } from 'vuex';
// eslint-disable-next-line
import { calcPortfolioItem } from 'lib/src/utils';
import Spinner from '@/components/UI/Spinner';
import PortfolioItem from './PortfolioItem';

export default {
  components: {
    Spinner, PortfolioItem
  },
  data() {
    return {
      showBalances: true
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
      history24: 'market/getMarketHistory24',
      history7: 'market/getMarketHistory7',
      marketFetching: 'market/isFetching',
      marketError: 'market/isError',
      getAssetMultiplier: 'market/getAssetMultiplier',
      assets: 'assets/getAssets',
      defaultAssetsIds: 'assets/getDefaultAssetsIds',
      subscribedToMarket: 'market/isSubscribed',
      getAssetById: 'assets/getAssetById'
    }),
    toggleTitle() {
      return this.showBalances ? 'SHOW BALANCES' : 'SHOW PRICES';
    },
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
        const asset = this.getAssetById(id);
        const precisedBalance = balance / (10 ** asset.precision);
        let prices24 = this.history24[id];
        let prices7 = this.history7[id];
        if (!prices24 || !prices7) return;
        const multiplier = this.fiatMultiplier;
        if (id === this.baseId) prices24 = { first: 1, last: 1 };
        if (id === this.baseId) prices7 = { first: 1, last: 1 };

        items[id] = calcPortfolioItem({
          balance,
          asset,
          prices24,
          prices7,
          baseAsset: this.assets[this.baseId],
          fiatMultiplier: multiplier
        });
        items[id].id = id;
        items[id].precisedBalance = precisedBalance;
        items[id].precision = asset.precision;
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
    toggle() {
      this.showBalances = !this.showBalances;
    }
  }
};
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: all .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .portfolio-container .portfolio-toggle {
    cursor: pointer;
    color: white;
    opacity: 0.5;
    font-family: 'Gotham_Pro_Regular';
    font-size: 4.4vw;
  }

  .portfolio-container .portfolio-data {
    margin-bottom: 2em;
    padding-top: 3vw;
    font-family: 'Gotham_Pro_Regular';

    &__header {
      display: grid;
      grid-template-columns: 35% 20% 25% 20%;
      margin-bottom: 2.5vw;
      div {
        font-size: 4.4vw;
        color: white;
        font-weight: 700;
      }
    }
    &__body {
      display: grid;
      grid-row-gap: 2.5vw;
    }
  }
</style>
