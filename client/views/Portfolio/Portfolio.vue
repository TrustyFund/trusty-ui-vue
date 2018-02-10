<template lang="pug">
  
  table.trusty_table.portfolio-container
    thead
      tr
        th._text_left: span ASSET
        th._text_right: span SHARE 
        th._text_right: span $VALUE
        th._text_right: span 7DAYS
    tbody
      PortfolioBalance( 
        v-for="(item, id) in items"
       :key="id"
       :item="item"
       :total-base-value="totalBaseValue")

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PortfolioBalance from './PortfolioBalance.vue';

export default {
  props: {
    balances: {
      required: true,
      type: Object,
      default: {}
    },
    baseId: {
      required: true,
      type: String,
      default: '1.3.0'
    },
    fiatId: {
      required: true,
      type: String,
      default: '1.3.121'
    },
    days: {
      required: true,
      type: Number,
      default: 7
    }
  },
  components: {
    PortfolioBalance
  },
  computed: {
    ...mapGetters({
      items: 'portfolio/getPortfolioList'
    }),
    totalBaseValue() {
      return Object.keys(this.items).reduce((result, id) => {
        return result + this.items[id].balanceBase;
      }, 0);
    }
  },
  methods: {
    ...mapActions({
      fetchAssets: 'assets/fetchAssets',
      fetchPortfolioData: 'portfolio/fetchPortfolioData',
      resetPortfolioState: 'portfolio/resetPortfolioState'
    })
  },
  beforeMount() {
    const assetsIds = Object.keys(this.balances);
    this.fetchAssets(assetsIds).then(() => {
      this.fetchPortfolioData({
        balances: this.balances,
        baseId: this.baseId,
        fiatId: this.fiatId,
        days: this.days
      });
    });
  },
  beforeDestroy() {
    this.resetPortfolioState();
  }
};
</script>

<style lang="scss">
  .trusty_table.portfolio-container {
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
