<template lang="pug">

#trusty_manage_portfolio.main_centered_container

  .trusty_portfolio_tabs

    .tabs-header-container
      .tab-link(@click="$router.push({ name: 'manage-percent' })", :class="{'tab-link-active': isPercent }") Shares
      .tab-link(@click="$router.push({ name: 'manage-value' })", :class="{'tab-link-active': isValue }") Values
      .tab-link.disabled Mirror

    .tabs-content-container
      router-view(:items="items", fiat-id="1.3.121")

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      fiatId: '1.3.121'
    };
  },
  computed: {
    ...mapGetters({
      balances: 'account/getCurrentUserBalances',
      defaultAssetsIds: 'assets/getDefaultAssetsIds',
      history: 'market/getMarketHistory24',
      baseId: 'market/getBaseAssetId',
      assets: 'assets/getAssets',
      getAssetMultiplier: 'market/getAssetMultiplier'
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
      Object.keys(this.combinedBalances).forEach(id => {
        const { balance } = this.combinedBalances[id];
        let price = (this.history[id] && this.history[id].last) || 0;
        const multiplier = { ...this.multiplier };
        if (id === this.baseId) price = 1;
        if (id === this.fiatId) multiplier.last = 1;
        const baseValue = parseInt((balance * price).toFixed(0), 10);
        const fiatValue = parseInt((baseValue * this.fiatMultiplier.last).toFixed(0), 10);
        const name = (this.assets[id] && this.assets[id].symbol) || '...';
        items[id] = {
          baseValue,
          fiatValue,
          name
        };
      });
      return items;
    },
    fiatMultiplier() {
      return this.getAssetMultiplier(this.fiatId);
    },
    isPercent() {
      return this.$route.name === 'manage-percent';
    },
    isValue() {
      return this.$route.name === 'manage-value';
    }
  }
};

</script>

<style lang="scss">

@import "~@/style/mixins";

@mixin disable_svg {
  background: transparent;
  border: none;
  svg path {
    fill: #9ea2a5;
  }
}


@media screen and (min-width: 769px) {
  #asset_tab {
    ._plus, ._minus {
      width: 3vw;
    }
    tbody {
      .trusty_portfolio_arrow_right {
        width: 1vw;
        margin-left: 50px;
      }
    }

    ._one_button:first-child {
      margin-top: 4vw;
    }
    ._one_button {
      margin-top: .1vw;
      width: 30vw;
      margin: 0 auto;
    }
  }
}

#trusty_manage_portfolio {

  height: 100%;
  ._plus, ._minus {

    &.greater._disable,
    &.less._disable {
      @include disable_svg;
    }

    &._disable {
      @include disable_svg;
    }
  }

  h5 {
    font-weight: normal;
    font-style: normal;
    font-family: Gotham_Pro;
    color: white;
    text-align: center;
    margin-top: .2rem;
    font-size: 1.125rem;
      margin-bottom: 0.5rem;
      line-height: 1.4;
  }

  .trusty_portfolio_tabs {
    font-family: Gotham_Pro;
    .tab-content {
      font-family: Gotham_Pro;
    }
    table {
      -webkit-user-select: none;
      thead tr th  {
        font-family: Gotham_Pro;
        text-transform: uppercase;
      }
      tbody tr td:first-child {
        width: 50%;
        padding-left: 6vw;
        text-align: left;
        font-family: Gotham_Pro_Medium;
      }
      tbody tr td:last-child {
        width: 50%;
        text-align: center;
        font-family: Gotham_Pro;
      }
      tbody tr td {
        text-align: left;
        font-family: Gotham_Pro_Regular;
        padding-top: 0;
        padding-bottom: 0;
      }
      tr {
        padding-bottom: 0 !important;
      }

    }

    .portfolio_item span {
      color: white;
      &._title {
        font-family: 'Gotham_Pro_Regular';
      }
      &._green {
        color: #79c610;
      }
      &._red {
        color: #ff3030;
      }
      svg {
        fill: #9ea2a5;
      }
    }
    .portfolio_asset{
      vertical-align: middle;
      display: inline-block;
      text-align: center;
      margin: 0 1.5vw;
      font-family: 'Gotham_Pro_Regular';
    }
  }
}



.tab-link {
  width: 33.33333%;
  float: left;
  text-align: center;
  cursor: pointer;
  &.disabled {
    opacity: 0.25;
    cursor: default;
  }
}

.tabs-container:after {
  content: "";
  display: table;
  clear: both;
}

.tabs-header-container{
  border-bottom: 1px solid white;
  height: 25px;
}

.tabs-content-container{
  padding-top: 15px;
}

.tab-link-active{
  border-bottom: 3px solid white;
}

.tab-link{
  height: 100%;
  text-transform: uppercase;
  color: white;
}

.managePortfolio{
  width: 100%;
}

.greater:not(a){
  font-family: "Gotham_Pro_Medium";
  color: #269c26;
  //color: #79c610;
  transform: translateY(-2px);
}

.less:not(a){
  font-family: "Gotham_Pro_Bold";
  color: #ff3030;
  //color: #ff3030;
}

.managePortfolio td{
  text-align: center;
}

.wrong-total{
  color: #ff3030;
  font-family: Gotham_Pro_Medium !important;
}


@import "./manage-portfolio-mobile.scss"

</style>
