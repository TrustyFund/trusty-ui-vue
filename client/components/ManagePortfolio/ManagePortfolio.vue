<template lang="pug">

#trusty_manage_portfolio.main_centered_container

  .trusty_portfolio_tabs
   
    .tabs-header-container
      .tab-link.tab-link-active Manual
      .tab-link Index
      .tab-link Mirror

    .tabs-content-container
      ManagePortfolioTab(:items="items")
      

</template>

<script>
import { mapGetters } from 'vuex';
import ManagePortfolioTab from './ManagePortfolioTab.vue';

export default {
  computed: {
    ...mapGetters({
      userData: 'account/getCurrentUserData',
      balances: 'account/getCurrentUserBalances',
      defaultAssetsIds: 'assets/getDefaultAssetsIds',
      history: 'market/getMarketHistory',
      assets: 'assets/getAssets'
    }),
    combinedBalances() {
      console.log(this.defaultAssetsIds);
      const combinedBalances = { ...this.balances };
      this.defaultAssetsIds.forEach(id => {
        if (combinedBalances[id]) return;
        console.log(id);
        combinedBalances[id] = { balance: 0 };
      });
      return combinedBalances;
    },
    items() {
      const items = {};
      Object.keys(this.combinedBalances).forEach(id => {
        const { balance } = this.combinedBalances[id];
        const price = (this.history[id] && this.history[id].last) || 0;
        const baseValue = balance * price;
        const name = (this.assets[id] && this.assets[id].symbol) || '...';
        items[id] = {
          baseValue,
          name
        };
      });
      return items;
    }
  },
  components: { ManagePortfolioTab },
  data() {
    return {
    };
  },
  methods: {
    requestPortfolioData() {
      const assetsIds = Object.keys(this.combinedBalances);
      this.fetchAssets({ assets: assetsIds }).then(() => {
        this.fetchMarketHistory({
          baseId: this.baseId,
          assetsIds,
          days: 7
        });
      });
    }
  },
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
        color: white;
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
      }
      tr {
        padding-bottom: 0 !important;
      }

    }

    .portfolio_item span {
      color: white;
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
    }
  }
}



.tab-link {
  width: 33.33333%;
  float: left;
  text-align: center;
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