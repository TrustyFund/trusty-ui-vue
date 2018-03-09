<template lang="pug">
  div(:class="{'main_padding': !minMode}")
    .trusty_inline_buttons._mob._one_button(@click="goToManagePortfolio" v-show="!minMode"): button MANAGE FUND
    table.portfolio-container.trusty_table
      thead
        tr
          th._text_left: span ASSET
          th._text_right: span SHARE 
          th._text_right: span $VALUE
          th._text_right: span 7DAYS
      tbody
        PortfolioBalanceNew( 
          v-for="(balance, id) in balances"
          :key="id"
          :balance="balance"
          :asset="assets[id]"
          :prices="market[id]"
          :fiatMultiplier="fiatMultiplier"
          :totalBaseValue="totalBaseValue")



</template>

<script>
import { mapGetters } from 'vuex';
import PortfolioBalance from './PortfolioBalance.vue';
import PortfolioBalanceNew from './PortfolioBalanceNew.vue';

export default {
  props: {
    minMode: {
      type: Boolean,
      required: false,
      default: false,
    },
    items: {
      type: Object,
      required: true,
      default: {}
    },
    balances: {
      type: Object,
      required: true,
      default: {}
    },
    market: {
      type: Object,
      required: true,
      default: {}
    },
    fiatId: {
      type: String,
      required: true
    }
  },
  components: {
    PortfolioBalance, PortfolioBalanceNew
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      assets: 'assets/getAssets',
      getAssetMultiplier: 'market/getAssetMultiplier'
    }),
    fiatMultiplier() {
      return this.getAssetMultiplier(this.fiatId);
    },
    totalBaseValueOld() {
      return Object.keys(this.items).reduce((result, id) => {
        return result + this.items[id].balanceBase;
      }, 0);
    },
    totalBaseValue() {
      return Object.keys(this.balances).reduce((result, id) => {
        console.log(this.market[id]);
        if (!this.market[id]) return result;
        console.log(this.balances[id]);
        return result + (this.market[id].last * this.balances[id].balance);
      }, 0);
    }
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
