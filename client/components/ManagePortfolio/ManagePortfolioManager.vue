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
             :class="{'_disable': item.share === (minPercents[item.id] - 1 || 0)}"
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
import config from '@/../config';
import { mapGetters, mapActions } from 'vuex';
import { computePercentsFromBaseValues, calcPercentsChange,
  convertPercentsToSortedArray } from './utils';


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
      holdCount: 0,
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
    totalFiatValue() {
      return Object.keys(this.items).reduce((result, id) => {
        return result + this.items[id].fiatValue;
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
      const initialPercents = computePercentsFromBaseValues(this.baseValues);
      Object.keys(initialPercents).forEach(id => {
        initialPercents[id] = {
          share: parseFloat((initialPercents[id] * 100).toFixed(1), 10),
          name: this.assets[id].symbol,
          id
        };
      });
      return initialPercents;
    },
    updatePortfolio() {
      const changed = calcPercentsChange(this.initialPercents, this.percents);
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
      Object.keys(this.initialPercents).forEach(id => {
        newPercents[id] = { ...this.initialPercents[id] };
        newPercents[id].share = config.suggestedPortfolioShares[id] || 0;
      });

      this.percents = newPercents;
      this.percentsAsArray = convertPercentsToSortedArray(this.percents);
      this.$toast.info('Portfolio suggested');
    },
    handleMinus(item, speedUp) {
      const step = (speedUp) ? 2 : 0.2;
      const min = this.minPercents[item.id] || 0;
      const newShare = parseFloat((item.share - step).toFixed(2));
      if (newShare <= min) {
        item.share = min;
        this.clearTimer();
        if (min) this.$toast.info(`Minimum share of ${item.name} is ${min}%`);
      } else {
        item.share = newShare;
      }
    },
    handlePlus(item, speedUp) {
      const step = (speedUp) ? 2 : 0.2;
      if (this.remainingPercents > step) {
        item.share = parseFloat((item.share + step).toFixed(2));
      } else {
        item.share = parseFloat((item.share + this.remainingPercents).toFixed(2));
      }
    },
    handleTouchMinus(item) {
      this.handleMinus(item);
      this.timer = setInterval(() => this.longTouchHandle(this.handleMinus, item), 175);
    },
    handleTouchPlus(item) {
      this.handlePlus(item);
      this.timer = setInterval(() => this.longTouchHandle(this.handlePlus, item), 175);
    },
    longTouchHandle(callback, item) {
      let speedUp = false;
      if (this.holdCount > 2) {
        speedUp = true;
      }
      callback(item, speedUp);
      this.holdCount += 1;
    },
    clearTimer() {
      this.holdCount = 0;
      clearInterval(this.timer);
    },
    checkForMinPercents() {
      const toModifyPercents = {};

      // array with differences
      Object.keys(this.minPercents).forEach(id => {
        const diff = parseFloat((this.minPercents[id] - this.percents[id].share).toFixed(2));
        if (diff > 0) toModifyPercents[id] = diff;
      });

      // find asset with the biggest share that is not needed to modify
      const toModifyIds = Object.keys(toModifyPercents);
      const biggestShareAsset = this.percentsAsArray.find(item => {
        return toModifyIds.indexOf(item.id) === -1;
      });

      Object.keys(toModifyPercents).forEach(id => {
        const modify = toModifyPercents[id];
        biggestShareAsset.share = parseFloat((biggestShareAsset.share - modify).toFixed(2));
        this.percents[id].share = parseFloat((this.percents[id].share + modify).toFixed(2));
      });
    }
  },
  mounted() {
    this.initialPercents = this.computeInitialPercents();
    this.percentFiatValue = this.totalFiatValue / 100;
    this.percents = JSON.parse(JSON.stringify(this.initialPercents));
    this.percentsAsArray = convertPercentsToSortedArray(this.percents);
    this.checkForMinPercents();
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
    opacity: 0.2;
  }
  .total-row .total {
    margin-left: 16vw;
  }

</style>
