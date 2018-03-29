<template lang="pug">
#asset_tab
  h5 Please select $ value of assets #[br] in your portfolio

  table.managePortfolio
    thead

      tr
        th ASSET
        th $ VALUE
    tbody

      tr(v-for="item in valuesAsArray")
        td
          .portfolio_item._index
            .fake_line_height
            span {{ item.name }}
            Icon(name="trusty_portfolio_arrow_right" @click.native="navigateToCoin(item)")
        td
          .portfolio_item._index
            .fake_line_height
            a._minus.normal.portfolio_asset(:class="{'_disable': item.value - step < 0 }" @click="item.value-= step")
              Icon(name="trusty_minus")
            span.normal.portfolio_asset {{ calcFormattedValue(item.value) }}$
            a._plus.normal.portfolio_asset(:class="{'_disable': valueTotal >= initialTotalValue}" @click="item.value+=step")
              Icon(name="trusty_plus")
        tr
          td
            .portfolio_item._index
              span TOTAL
          td
            .portfolio_item._index
              span {{ calcFormattedValue(valueTotal) }}$ / {{ calcFormattedValue(initialTotalValue) }}$     


  .wrap.main_padding
    .trusty_inline_buttons._one_button
      button(@click="suggestPortfolio") Suggest Portfolio

    .trusty_inline_buttons._one_button
      button(:class="{'_disable': valueTotal.toFixed(2) < initialTotalValue.toFixed(2)}" @click="updatePortfolio") Update Portfolio

</template>

<script>
import Icon from '@/components/UI/icon';
import { mapGetters, mapActions } from 'vuex';
// eslint-disable-next-line
import { calcPortfolioDistributionChange } from 'lib/src/utils';
import config from '@/../config';

export default {
  props: {
    items: {
      type: Object,
      required: true,
      default: {}
    },
    fiatId: {
      type: String,
      required: true,
      default: '1.3.121'
    }
  },
  components: { Icon },
  data() {
    return {
      initialValues: {},
      initialTotalValue: 0,
      values: {},
      valuesAsArray: [],
      step: 1000
    };
  },
  computed: {
    ...mapGetters({
      assets: 'assets/getAssets',
      balances: 'account/getCurrentUserBalances',
      userId: 'account/getAccountUserId',
      getAssetMultiplier: 'market/getAssetMultiplier'
    }),
    valueTotal() {
      return Object.keys(this.values).reduce((result, id) => {
        return result + this.values[id].value;
      }, 0);
    },
    baseValues() {
      const baseValues = {};
      Object.keys(this.items).forEach(id => {
        baseValues[id] = this.items[id].baseValue;
      });
      return baseValues;
    },
    fiatValues() {
      const fiatValues = {};
      Object.keys(this.items).forEach(id => {
        fiatValues[id] = this.items[id].fiatValue;
      });
      return fiatValues;
    },
    fiatPrecision() {
      return this.assets[this.fiatId].precision;
    }
  },
  methods: {
    ...mapActions({
      setPendingDistribution: 'transactions/setPendingDistribution'
    }),
    computeInitialValues() {
      let total = 0;
      Object.keys(this.fiatValues).forEach((id) => {
        this.initialValues[id] = {
          name: this.assets[id].symbol,
          value: this.fiatValues[id],
          id
        };
        total += this.initialValues[id].value;
      });
      this.initialTotalValue = total;
    },
    convertValuesToArray(valuesObj) {
      const array = Object.keys(valuesObj).map(assetId => valuesObj[assetId]);
      const sortedArray = array.sort((a, b) => {
        return a.value === b.value ? 0 : +(b.value > a.value) || -1;
      });
      return sortedArray;
    },
    calcFormattedValue(value) {
      return (value / (10 ** this.fiatPrecision)).toFixed(2);
    },
    calcDistributions(values, total) {
      const distributions = {};
      Object.keys(values).forEach(id => {
        distributions[id] = values[id] / total;
      });
      return distributions;
    },
    updatePortfolio() {
      const changed = this.calcChangedValues();
      if (!Object.keys(changed).length) {
        this.$toast.warning('Nothing changed');
        return;
      }
      console.log('changed : ', changed);
      const distribution = this.calcDistributions(changed, this.initialTotalValue);
      console.log('distribution : ', distribution);
      this.setPendingDistribution({ distribution });
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
    },
    calcChangedValues() {
      const changed = {};
      Object.keys(this.values).forEach(id => {
        if (this.values[id].value !== this.initialValues[id].value) {
          changed[id] = this.values[id].value;
        }
      });
      return changed;
    },
    suggestPortfolio() {
      const percent = this.initialTotalValue / 100;
      const newValues = {};
      Object.keys(this.initialValues).forEach(id => {
        newValues[id] = { ...this.initialValues[id] };
        const share = config.suggestedPortfolioShares[id];
        newValues[id].value = (share && share * percent) || 0;
      });
      console.log(newValues);
      this.values = newValues;
      this.valuesAsArray = this.convertValuesToArray(this.values);
    }
  },
  mounted() {
    this.computeInitialValues();
    this.values = JSON.parse(JSON.stringify(this.initialValues));
    this.valuesAsArray = this.convertValuesToArray(this.values);
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
