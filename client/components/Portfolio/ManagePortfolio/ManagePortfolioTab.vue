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
            a._minus.normal.portfolio_asset(@click="minusShare(item)")
              Icon(name="trusty_minus")
            span.normal.portfolio_asset {{ item.share + '%' }}
            a._plus.normal.portfolio_asset._disable(@click="plusShare(item)")
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
      percents: {}
    };
  },
  computed: {
    ...mapGetters({
      balances: 'user/getBalances',
      getAssetById: 'assets/getAssetById',
    }),
    totalBaseValue() {
      return Object.keys(this.items).reduce((result, id) => {
        return result + this.items[id].balanceBase;
      }, 0);
    },
    sharesTotal() {
      return Object.keys(this.percents).reduce((result, id) => {
        return result + this.percents[id].share;
      }, 0);
    }
  },
  methods: {
    computeInitialPercents() {
      const initialPercents = {};
      Object.keys(this.items).forEach(id => {
        initialPercents[id] = {
          name: this.items[id].name,
          share: parseInt(((this.items[id].balanceBase / this.totalBaseValue) * 100).toFixed(0), 10)
        };
      });
      return initialPercents;
    },
    minusShare(item) {
      if (item.share === 0) return;
      item.share--;
    },
    plusShare(item) {
      if (this.sharesTotal === 100) return;
      item.share++;
    }
  },
  mounted() {
    this.percents = this.computeInitialPercents();
  }
};
</script>

<style lang="scss">
</style>
