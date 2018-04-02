<template lang="pug">
#asset_tab
  h5 Select shares of assets in portfolio 

  table.managePortfolio
    thead

      tr
        th ASSET
        th SHARE
    tbody

      tr(v-for="item in percentsAsArray")
        td
          .portfolio_item._index._name
            .fake_line_height
            span._title(@click="navigateToCoin(item)") {{ item.name }}
            Icon(name="trusty_portfolio_arrow_right"
                 @click.native="navigateToCoin(item)")
        td
          .portfolio_item._index
            .fake_line_height

            a._minus.normal.portfolio_asset(
             :class="{'_disable': item.share === (minPercents[item.id] || 0)}"
             @touchstart="handleTouchMinus(item)"
             @touchend="clearTimer")
              Icon(name="trusty_minus")

            span.normal.portfolio_asset(v-show="type === 'percent'") {{ item.share.toFixed(1) }}%
            span.normal.portfolio_asset(v-show="type === 'fiat'") {{ (item.share * percentFiatValue / 10 ** 4).toFixed(2) }}$

            a._plus.normal.portfolio_asset(
              :class="{'_disable': plusDisabled }" 
              @touchstart="handleTouchPlus(item)"
              @touchend="clearTimer")
                Icon(name="trusty_plus")

      tr.total-row
        td
          .portfolio_item._index
            span TOTAL
        td
          .portfolio_item._index.total
            span {{ sharesTotal.toFixed(1) }}%

  .wrap.main_padding
    .trusty_inline_buttons._one_button
      button(@click="suggestPortfolio") Suggest Portfolio

    .trusty_inline_buttons._one_button
      button(:class="{'_disable': sharesTotal.toFixed(1) != 100}" @click="updatePortfolio") Update Portfolio

</template>

<script>
import Icon from '@/components/UI/icon';
import { mapGetters, mapActions } from 'vuex';
// eslint-disable-next-line
import { distributionFromBalances, distributionSampling } from 'lib/src/utils';
import config from '@/../config';

export default {
  props: {
    items: {
      type: Object,
      required: true,
      default: {}
    },
    type: {
      type: String,
      required: false,
      default: 'percent'
    }
  },
  components: { Icon },
  data() {
    return {
      initialPercents: {},
      percents: {},
      percentsAsArray: [],
      percentFiatValue: 0,
      timer: null,
      minPercents: {
        '1.3.0': 0.8,
        '1.3.2418': 1.4 // trusty token
      }
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
    },
    fiatValues() {
      const fiatValues = {};
      Object.keys(this.items).forEach(id => {
        fiatValues[id] = this.items[id].fiatValue;
      });
      return fiatValues;
    },
    totalFiatValue() {
      return Object.keys(this.fiatValues).reduce((result, id) => {
        return result + this.fiatValues[id];
      }, 0);
    },
    remainingPercents() {
      return 100 - this.sharesTotal;
    },
    plusDisabled() {
      return parseInt(this.sharesTotal.toFixed(1), 10) === 100;
    }
  },
  methods: {
    ...mapActions({
      setPendingDistribution: 'transactions/setPendingDistribution'
    }),
    computeInitialPercents() {
      const rawDistributions = distributionFromBalances(this.baseValues);
      console.log('initial raw : ', rawDistributions);
      const initialPercents = distributionSampling(rawDistributions, 3);
      console.log('initial sampled : ', initialPercents);
      Object.keys(initialPercents).forEach(id => {
        initialPercents[id] = {
          share: parseFloat((initialPercents[id] * 100).toFixed(1), 10),
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
        this.$toast.warning('Nothing changed');
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
    },
    suggestPortfolio() {
      const newPercents = {};
      console.log(config.suggestedPortfolioShares);
      Object.keys(this.initialPercents).forEach(id => {
        newPercents[id] = { ...this.initialPercents[id] };
        newPercents[id].share = config.suggestedPortfolioShares[id] || 0;
      });

      this.percents = newPercents;
      this.percentsAsArray = this.convertPercentsToArray(this.percents);
      this.$toast.info('Portfolio suggested');
    },
    handleMinus(item) {
      const min = this.minPercents[item.id] || 0;
      const newShare = parseFloat((item.share - 0.2).toFixed(2));
      if (newShare <= min) {
        item.share = min;
        this.clearTimer();
        if (min) this.$toast.info(`Minimum share of ${item.name} is ${min}`);
      } else {
        item.share = newShare;
      }
    },
    handlePlus(item) {
      if (this.remainingPercents > 0.2) {
        item.share = parseFloat((item.share + 0.2).toFixed(2));
      } else {
        item.share = parseFloat((item.share + this.remainingPercents).toFixed(2));
      }
    },
    handleTouchMinus(item) {
      this.handleMinus(item);
      this.timer = setInterval(() => { this.handleMinus(item); }, 175);
    },
    handleTouchPlus(item) {
      this.handlePlus(item);
      this.timer = setInterval(() => { this.handlePlus(item); }, 175);
    },
    clearTimer() {
      clearInterval(this.timer);
    }
  },
  mounted() {
    this.initialPercents = this.computeInitialPercents();
    this.percentFiatValue = this.totalFiatValue / 100;
    this.percents = JSON.parse(JSON.stringify(this.initialPercents));
    this.percentsAsArray = this.convertPercentsToArray(this.percents);
    // prevents long click context menu
    window.oncontextmenu = (event) => {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
  },
  beforeDestroy() {
    window.oncontextmenu = null;
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
