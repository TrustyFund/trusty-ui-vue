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
            Icon(name="trusty_portfolio_arrow_right", @click.native="navigateToCoin(item)")
        td
          .portfolio_item._index
            .fake_line_height
            a._minus.normal.portfolio_asset(:class="{'_disable': item.share === 0}" @click="item.share--")
              Icon(name="trusty_minus")
            span.normal.portfolio_asset {{ item.share }}%
            a._plus.normal.portfolio_asset(:class="{'_disable': sharesTotal === 100}" @click="item.share++")
              Icon(name="trusty_plus")
      tr.total-row
        td
          .portfolio_item._index
            span TOTAL
        td
          .portfolio_item._index.total
            span {{ sharesTotal }}%

  .wrap.main_padding
    .trusty_inline_buttons._one_button
      button._disable Suggest Portfolio

    .trusty_inline_buttons._one_button
      button(:class="{'_disable': sharesTotal < 100}" @click="updatePortfolio") Update Portfolio

</template>

<script>
import Icon from '@/components/UI/icon';
import { mapGetters, mapActions } from 'vuex';
// eslint-disable-next-line
import { distributionFromBalances, distributionSampling } from 'lib/src/utils';

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
      balances: 'account/getCurrentUserBalances',
      userId: 'account/getAccountUserId'
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
    ...mapActions({
      setPendingDistribution: 'transactions/setPendingDistribution'
    }),
    computeInitialPercents() {
      const rawDistributions = distributionFromBalances(this.baseValues);
      const initialPercents = distributionSampling(rawDistributions, 2);
      Object.keys(initialPercents).forEach(id => {
        initialPercents[id] = {
          share: Math.round(initialPercents[id] * 100, 2),
          name: this.assets[id].symbol,
          id
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
    calcChangedPercents() {
      const changed = {};
      Object.keys(this.percents).forEach(id => {
        if (this.percents[id].share !== this.initialPercents[id].share) {
          changed[id] = this.percents[id].share / 100;
        }
      });
      return changed;
    },
    updatePortfolio() {
      const changed = this.calcChangedPercents();
      if (!Object.keys(changed).length) {
        this.$notify({
          type: 'warning',
          title: 'No change',
          text: 'Nothing changed'
        });
        return;
      }
      console.log('changed: ', changed);
      this.setPendingDistribution({ distribution: changed });
      this.$router.push({ name: 'confirm-transactions' });
    },
    navigateToCoin(asset) {
      this.$router.push({
        name: 'coin',
        params: {
          symbol: asset.name,
          assetId: asset.id
        }
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
  .total-row .total {
    margin-left: 16vw;
  }

</style>
