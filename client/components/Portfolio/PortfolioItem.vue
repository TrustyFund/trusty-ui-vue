<template lang="pug">
  .portfolio-row-item(v-bind:class="{ edit_mode: editMode }", v-if="!item.hidden")
    .portfolio-row-item__name._text_left(@click="navigateToCoin(item)") {{ item.name }}
    ._text_right {{ balancesMode ? formattedPrice : tokensNum.toFixed(2) }}
    ._text_right {{ balancesMode ? formattedChange24 + '%' : formattedBalanceFiat }}

    .asset-action(v-if="editMode", @click="toggleHideAsset(item.id, false)")
      icon-component(
        name="icon_eye",
        :initialSvgColors="true",
        v-bind:className="item.hidden ? 'asset-hidden' : ''" )
    ._text_right(v-else) {{ balancesMode ? formattedChange7 : formattedShare }}%

  .portfolio-row-item(v-bind:class="{ edit_mode: editMode }", v-else-if="item.hidden && editMode")
    .portfolio-row-item__name._text_left(@click="navigateToCoin(item)") {{ item.name }}
    ._text_right {{ balancesMode ? formattedPrice : tokensNum.toFixed(2) }}
    ._text_right {{ balancesMode ? formattedChange24 + '%' : formattedBalanceFiat }}

    .asset-action(v-if="editMode", @click="toggleHideAsset(item.id, true)")
      icon-component(
        name="icon_eye",
        :initialSvgColors="true",
        v-bind:className="item.hidden ? 'asset-hidden' : ''" )
    ._text_right(v-else) {{ balancesMode ? formattedChange7 : formattedShare }}%
</template>

<script>
import iconComponent from '@/components/UI/icon';

export default {
  components: {
    iconComponent
  },
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
    editMode: {
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
    precisedFiatValue() {
      return this.item.fiatValue / (10 ** this.fiatPrecision);
    },
    formattedShare() {
      return (this.share && Math.round(this.share, 0)) || 0;
    },
    formattedPrice() {
      const fiatPrice = this.item.price * this.fiatMultiplier;
      const price = fiatPrice * (10 ** (this.item.precision - this.fiatPrecision));
      return this.preciseFiatValue(price, 2);
    },
    tokensNum() {
      return this.item.balance / (10 ** this.item.precision);
    },
    formattedBalanceFiat() {
      if (!this.item.fiatValue) return '0';
      const fiatValue = this.item.fiatValue / (10 ** this.fiatPrecision);
      return this.preciseFiatValue(fiatValue);
    },
    formattedChange24() {
      if (!this.item.change24) return 0;
      let change = this.item.change24.toFixed(0).toString();
      if (change.length > 3) change = change.substring(0, 3);
      return change;
    },
    formattedChange7() {
      if (!this.item.change7) return 0;
      let change = this.item.change7.toFixed(0).toString();
      if (change.length > 3) change = change.substring(0, 3);
      return change;
    }
  },
  methods: {
    toggleHideAsset(id, e) {
      if (e) {
        this.$emit('toggleAsset', id, 'show');
      } else {
        this.$emit('toggleAsset', id, 'hide');
      }
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
    preciseFiatValue(value, precision = 1) {
      if (!value) return 0;
      if (value > 10) return Math.floor(value);
      if (value > 0.1) return value.toFixed(precision);
      return value.toFixed(2);
    }
  }
};
</script>

<style lang="scss">
   .fade-enter-active, .fade-leave-active {
    transition: all .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .portfolio-row-item {
    display: grid;
    grid-template-columns: 35% 20% 25% 20%;

    .trusty_icon {
      &.icon_eye {
        margin-top: -5px;
      }
      &.asset-hidden svg,
      &.asset-hidden svg path {
        fill: white;
        opacity: 1;
      }
      svg {
        width: 7vw !important;
        height: auto;
      }
    }
    &.edit_mode {
      input {
        width: 15px;
        height: 15px;
      }
    }

    .asset-action {
      max-height: 5vw;
      text-align: right;
    }

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
