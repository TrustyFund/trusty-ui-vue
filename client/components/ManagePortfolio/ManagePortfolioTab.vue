<template lang="pug">
#asset_tab
  h5 Please select shares of assets #[br] in your portfolio

  table.managePortfolio
    thead

      tr
        th ASSET
        th SHARE
    tbody

      tr(v-for="item in percents")
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
            span.normal.portfolio_asset {{ item.share + '%' }}
            a._plus.normal.portfolio_asset(:class="{'_disable': sharesTotal === 100}" @click="item.share++")
              Icon(name="trusty_plus")

  .wrap.main_padding
    .trusty_inline_buttons._one_button
      button._disable Suggest Portfolio

    .trusty_inline_buttons._one_button
      button(:class="{'_disable': sharesTotal < 100}" @click="updatePortfolio") Update Portfolio

</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '@/components/UI/icon';
// eslint-disable-next-line
import { calcPortfolioDistributionChange } from 'lib/src/utils';

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
      percents: {}
    };
  },
  computed: {
    ...mapGetters({
      balances: 'user/getBalances',
      getAssetById: 'assets/getAssetById',
    }),
    items() {

    },
    totalBaseValue() {
      return Object.keys(this.items).reduce((result, id) => {
        return result + this.items[id].baseValue;
      }, 0);
    },
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
      const initialPercents = {};
      Object.keys(this.items).forEach(id => {
        const share = ((this.items[id].baseValue / this.totalBaseValue) * 100).toFixed(0);
        initialPercents[id] = {
          name: this.items[id].name,
          share: parseInt(share, 10)
        };
      });
      this.initialPercents = JSON.parse(JSON.stringify(initialPercents));
      return initialPercents;
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
      const initialDistributions = this.calcDistributions(this.initialPercents);
      console.log('base values: ', this.baseValues);
      console.log('initial distributions: ', initialDistributions);
      console.log('distributions: ', distributions);
      console.log(calcPortfolioDistributionChange(this.baseValues, distributions));
    }
  },
  mounted() {
    this.percents = this.computeInitialPercents();
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
