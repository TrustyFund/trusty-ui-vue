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

  div.portfolio-actions
    div._text_left
      button.portfolio-toggle(@click="toggleEditMode", v-bind:disabled="toggleEdit == 'SELECT ASSETS'", v-if="!assetsSelected") {{ toggleEdit }}
      button.portfolio-toggle.actions(@click="toggleAssets", v-if="assetsSelected") HIDE SELECTED
    div._text_right
      span.portfolio-toggle(@click="togglePortfolioMode", v-if="toggleEdit == 'EDIT'") {{ toggleTitle }}
      button.portfolio-toggle(@click="toggleEditMode", v-if="toggleEdit == 'SELECT ASSETS'", v-bind:disabled="assetsSelected") CANCEL

  div.portfolio-data
    div.portfolio-data__header(v-bind:class="{ edit_mode: editMode }")
      div(v-if="editMode")
      ._text_left.portfolio_head ASSET
      ._text_right.portfolio_head {{ priceMode ? '$PRICE' : 'TOKENS' }}
      ._text_right.portfolio_head {{ priceMode ? '24H' : '$VALUE' }}
      ._text_right.portfolio_head {{ priceMode ? '7D' : 'SHARE' }}
    div.portfolio-data__body
      PortfolioItem(v-for="item in itemsAsArray"
                    :key="item.id"
                    :balances-mode="priceMode"
                    :edit-mode="editMode"
                    :item="item"
                    @toggleAsset="toggleAsset"
                    :total-base-value="totalBaseValue"
                    :fiat-multiplier="fiatMultiplier.last"
                    :fiat-precision="fiatPrecision")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/UI/Spinner';
import { calcPortfolioItem } from './utils';
import PortfolioItem from './PortfolioItem';

export default {
  components: {
    Spinner, PortfolioItem
  },
  data() {
    return {
      assetsSelected: false
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
      marketFetching: 'market/isFetching',
      marketError: 'market/isError',
      getAssetMultiplier: 'history/getHistoryAssetMultiplier',
      assets: 'assets/getAssets',
      defaultAssetsIds: 'assets/getDefaultAssetsIds',
      subscribedToMarket: 'market/isSubscribed',
      getAssetById: 'assets/getAssetById',
      getHistoryByDay: 'history/getByDay',
      getHideList: 'assets/getHideList',
      getMarketPriceById: 'market/getPriceById',
      priceMode: 'portfolio/isPriceMode',
      editMode: 'portfolio/isEditMode',
      returnAssetsIdsToHide: 'portfolio/returnAssetsIdsToHide',
      returnAssetsIdsToShow: 'portfolio/returnAssetsIdsToShow'
    }),
    history24() {
      return this.getHistoryByDay(1);
    },
    history7() {
      return this.getHistoryByDay(7);
    },
    toggleTitle() {
      return this.priceMode ? 'SHOW BALANCES' : 'SHOW PRICES';
    },
    toggleEdit() {
      return this.editMode ? 'SELECT ASSETS' : 'EDIT';
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
      const hiddenAssetsIds = this.getHideList;

      if (!assetsIds.length) return items;
      assetsIds.forEach(id => {
        const { balance } = this.combinedBalances[id];
        const asset = this.getAssetById(id);
        const precisedBalance = balance / (10 ** asset.precision);
        let history24 = this.history24[id];
        let history7 = this.history7[id];
        if (!history24 || !history7) return;
        const multiplier = this.fiatMultiplier;
        if (id === this.baseId) history24 = { first: 1, last: 1 };
        if (id === this.baseId) history7 = { first: 1, last: 1 };

        items[id] = calcPortfolioItem({
          balance,
          asset,
          history24,
          history7,
          baseAsset: this.assets[this.baseId],
          fiatMultiplier: multiplier,
          marketPrice: this.getMarketPriceById(id)
        });
        items[id].id = id;
        items[id].precisedBalance = precisedBalance;
        items[id].precision = asset.precision;
        if (hiddenAssetsIds.includes(id)) items[id].hidden = true;
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
    fiatMarketPrice() {
      return this.getMarketPriceById(this.fiatId);
    },
    fiatMultiplier() {
      const multiplier = { ...this.getAssetMultiplier(1, this.fiatId) };
      if (this.fiatMarketPrice) multiplier.last = 1 / this.fiatMarketPrice;
      return multiplier;
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
    ...mapActions({
      toggleAssetIdToHide: 'portfolio/toggleAssetIdToHide',
      toggleAssetIdToShow: 'portfolio/toggleAssetIdToShow',
      togglePortfolioMode: 'portfolio/togglePriceMode',
      toggleEditMode: 'portfolio/toggleEditMode',
      resetState: 'portfolio/resetState',
      hideAsset: 'assets/hideAsset',
      showAsset: 'assets/showAsset',
    }),
    toggleAsset(asset, action) {
      if (action === 'hide') {
        this.toggleAssetIdToHide(asset);
      } else {
        this.toggleAssetIdToShow(asset);
      }

      if (this.returnAssetsIdsToHide.length > 0 || this.returnAssetsIdsToShow.length > 0) {
        this.assetsSelected = true;
      } else {
        this.assetsSelected = false;
      }
    },
    toggleAssets() {
      this.returnAssetsIdsToHide.forEach(item => {
        this.hideAsset(item);
      });

      this.returnAssetsIdsToShow.forEach(item => {
        this.showAsset(item);
      });

      this.resetState();
      this.assetsSelected = false;
    },
    goToManagePortfolio() {
      if (!this.subscribedToMarket) return;
      this.$router.push({ name: 'manage' });
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

  .portfolio-container .portfolio-actions {
    display: flex;
    justify-content: space-between;

    button {
      color: #fdf101;
      opacity: 0.8;
      padding: 0;

      &:disabled {
        color: white;
        opacity: 0.5;
      }
    }
  }

  .portfolio-container .portfolio-data {
    margin-bottom: 2em;
    padding-top: 3vw;
    font-family: 'Gotham_Pro_Regular';

    &__header {
      display: grid;
      grid-template-columns: 35% 20% 25% 20%;
      margin-bottom: 2.5vw;
      &.edit_mode {
        grid-template-columns: 7% 28% 20% 25% 20%;
      }
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
