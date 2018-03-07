<template lang="pug">
#asset_tab
  h5 Please select shares of assets #[br] in your portfolio

  table.managePortfolio
    thead

      tr
        th ASSET
        th SHARE
    tbody

      tr(v-for="item in initialPortfolio")
        td
          .portfolio_item._index
            .fake_line_height
            span {{ item.asset }}
            Icon(name="trusty_portfolio_arrow_right")
        td
          .portfolio_item._index
            .fake_line_height
            a._minus.normal.portfolio_asset
              Icon(name="trusty_minus")
            span.normal.portfolio_asset {{ item.percentage + "%"}}
            a._plus.normal.portfolio_asset._disable
              Icon(name="trusty_plus")

  .wrap.main_padding
    .trusty_inline_buttons._one_button
      button Suggest Portfolio

    .trusty_inline_buttons._one_button
      button Update Portfolio

</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '@/components/UI/icon';
import { distributionFromBalances } from '../../../../vuex-bitshares/src/utils/index.js';

export default {
  components: { Icon },
  data() {
    return {
      portfolio: [
        {
          asset: 'BTS',
          percentage: 90
        },
        {
          asset: 'DASH',
          percentage: 10
        }
      ],
      initialPortfolio: []
    };
  },
  computed: {
    ...mapGetters({
      balances: 'user/getBalances',
      getAssetById: 'assets/getAssetById',
      items: 'portfolio/getPortfolioList'
    }),
  },
  methods: {
    computeInitialPercents() {
      const balances = {};
      Object.keys(this.items).forEach(id => {
        balances[id] = this.items[id].balanceBase;
      });
      const distributions = distributionFromBalances(balances);
      console.log(distributions);

      this.initialPortfolio = Object.keys(distributions).map(id => {
        return {
          asset: this.getAssetById(id).symbol,
          percentage: (distributions[id] * 100).toFixed(0)
        };
      });
    }
  },
  mounted() {
    this.computeInitialPercents();
  }
};
</script>

<style lang="scss">
</style>
