<template lang="pug">
  .portfolio-row-item
    .portfolio-row-item__name._text_left(@click="navigateToCoin(item)") {{ item.name }}
    ._text_right {{ balancesMode ? formattedPrice : formattedBalanceFiat }}
    ._text_right {{ balancesMode ? formattedChange + '%' : tokensNum }}
    ._text_right {{ balancesMode ? formattedChange : formattedShare }}%
</template>

<script>
import Icon from '@/components/UI/icon';

export default {
  components: { Icon },
  props: {
    item: {
      type: Object,
      required: true,
      default: {}
    },
    balancesMode: {
      type: Boolean,
      required: true
    },
    totalBaseValue: {
      type: Number,
      required: true,
      default: 1
    },
    fiatPrecision: {
      type: Number,
      required: true,
      default: 0
    },
    fiatMultiplier: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    share() {
      return (this.item.baseValue / this.totalBaseValue) * 100;
    },
    formattedShare() {
      return (this.share && Math.round(this.share, 0)) || 0;
    },
    formattedPrice() {
      return (1 / (this.item.price * this.fiatMultiplier) / (10 ** this.fiatPrecision)).toFixed(3);
    },
    tokensNum() {
      return this.item.precisedBalance.toFixed(2);
    },
    formattedBalanceFiat() {
      if (!this.item.fiatValue) return '0';
      const precisedFiatValue = this.item.fiatValue / (10 ** this.fiatPrecision);
      if (precisedFiatValue > 10) return Math.floor(precisedFiatValue);
      if (precisedFiatValue > 0.1) return precisedFiatValue.toFixed(1);
      return precisedFiatValue.toFixed(2);
    },
    formattedChange() {
      if (!this.item.change) return 0;
      let change = this.item.change.toFixed(0).toString();
      if (change.length > 3) change = change.substring(0, 3);
      return change;
    }
  },
  methods: {
    navigateToCoin(asset) {
      this.$router.push({
        name: 'coin',
        params: {
          symbol: asset.name,
          assetId: asset.id
        }
      });
    }
  }
};
</script>

<style lang="scss">
  .portfolio-row-item {
    display: grid;
    grid-template-columns: 35% 20% 25% 20%;
    div {
      font-size: 6vw;
      color: white;
      overflow: hidden;
      &.portfolio-row-item__name {
        text-overflow: ellipsis;
        overflow: hidden; 
        white-space: nowrap;
      }
    }
  }
</style>