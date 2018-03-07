<template lang="pug">
#asset_tab
  h5 Please select shares of assets #[br] in your portfolio

  table.managePortfolio
    thead

      tr
        th ASSET
        th SHARE
    tbody

      tr(v-for="item in portfolio")
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
      getAssetById: 'assets/getAssetById'
    }),

  },
  methods: {
    computeInitialPortfolio() {

      // this.balances.forEach((balance, id) => {
      // this.initialPortfolio.push({
      // name: this.getAssetById(id).symbol
      // })
      // });
    }
  },
  mounted() {
    this.computeInitialPortfolio();
  }
};
</script>

<style lang="scss">
</style>
