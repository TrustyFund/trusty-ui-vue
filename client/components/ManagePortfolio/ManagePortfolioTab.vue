<template lang="pug">
#asset_tab
  h5 Please select shares of assets #[br] in your portfolio

  table.managePortfolio
    thead

      tr
        th ASSET
        th SHARE
    tbody

      tr(v-for="item in percentsAsArray")
        td
          .portfolio_item._index
            .fake_line_height
            span {{ item.name }}
            Icon(name="trusty_portfolio_arrow_right")
        td
          .portfolio_item._index
            .fake_line_height
            a._minus.normal.portfolio_asset(:class="{'_disable': item.share === 0}" @click="item.share--")
              Icon(name="trusty_minus")
            span.normal.portfolio_asset {{ item.share }}%
            a._plus.normal.portfolio_asset(:class="{'_disable': sharesTotal === 100}" @click="item.share++")
              Icon(name="trusty_plus")

  .wrap.main_padding
    .trusty_inline_buttons._one_button
      button._disable Suggest Portfolio

    .trusty_inline_buttons._one_button
      button(:class="{'_disable': sharesTotal < 1}" @click="updatePortfolio") Update Portfolio

</template>

<script>
import Icon from '@/components/UI/icon';
import { mapGetters } from 'vuex';
// eslint-disable-next-line
import { calcPortfolioDistributionChange, distributionFromBalances, distributionSampling } from 'lib/src/utils';

export default {
  props: {
    items: {
      type: Object,
      required: true,
      default: {}
    }
  },
  components: { Icon },
  data() {
    return {
      initialPercents: {},
      percents: {},
      percentsAsArray: []
    };
  },
  computed: {
    ...mapGetters({
      assets: 'assets/getAssets',
      balances: 'account/getCurrentUserBalances'
    }),
    sharesTotal() {
      return Object.keys(this.percents).reduce((result, id) => {
        return result + this.percents[id].share;
      }, 0);
    },
    baseValues() {
      const baseValues = {};
      Object.keys(this.items).forEach(id => {
        baseValues[id] = this.items[id].baseValue;
      });
      return baseValues;
    }
  },
  methods: {
    computeInitialPercents() {
      const rawDistributions = distributionFromBalances(this.baseValues);
      const initialPercents = distributionSampling(rawDistributions, 2);
      Object.keys(initialPercents).forEach(id => {
        console.log(initialPercents[id]);
        initialPercents[id] = {
          share: Math.round(initialPercents[id] * 100, 2),
          name: this.assets[id].symbol
        };
      });
      return initialPercents;
    },
    convertPercentsToArray(percentsObj) {
      const array = Object.keys(percentsObj).map(assetId => percentsObj[assetId]);
      const sortedArray = array.sort((a, b) => {
        return a.share === b.share ? 0 : +(b.share > a.share) || -1;
      });
      return sortedArray;
    },
    calcDistributions(percents) {
      const distributions = {};
      Object.keys(percents).forEach(id => {
        distributions[id] = percents[id].share / 100;
      });
      return distributions;
    },
    updatePortfolio() {
      const distributions = this.calcDistributions(this.percents);
      console.log('base values: ', this.baseValues);
      console.log('initial distributions: ', distributions);
      console.log('distributions: ', distributions);

      const update = calcPortfolioDistributionChange(this.baseValues, distributions);
      console.log(update);
      const toSell = Object.keys(update.sell).map(assetId => ({
        asset: this.assets[assetId],
        amount: Math.floor(update.sell[assetId] * this.balances[assetId].balance)
      }));
      toSell.forEach(item => {
        console.log('Sell : ' + (item.amount / (10 ** item.asset.precision)) + ' ' + item.asset.symbol);
      });
      // calc total base asset aquired
      const toBuy = Object.keys(update.buy).map(assetId => ({
        asset: this.assets[assetId],
        share: update.buy[assetId]
      }));
      toBuy.forEach(item => {
        console.log('Buy : ' + item.share + '% ' + item.asset.symbol);
      });
    }
  },
  mounted() {
    this.initialPercents = this.computeInitialPercents();
    this.percents = JSON.parse(JSON.stringify(this.initialPercents));
    this.percentsAsArray = this.convertPercentsToArray(this.percents);
  }
};
</script>

<style lang="scss">
  .normal.portfolio_asset._disable {
    pointer-events: none;
  }
  .trusty_inline_buttons._one_button button._disable {
    pointer-events: none;
    opacity: 0.5;
  }
</style>
