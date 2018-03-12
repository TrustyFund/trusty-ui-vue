<template lang="pug">
  div(:class="{'main_padding': !minMode}")
    .trusty_inline_buttons._mob._one_button(@click="goToManagePortfolio" v-show="!minMode"): button MANAGE FUND
    table.portfolio-container.trusty_table
      thead
        tr
          th._text_left: span ASSET
          th._text_right: span SHARE 
          th._text_right: span $VALUE
          th._text_right: span 7DAYS
      tbody
        PortfolioBalance(
        v-for="item in items"
        :key="item.name"
        :item="item"
        :totalBaseValue="totalBaseValue"
        :fiatPrecision="fiatPrecision")

</template>

<script>
import PortfolioBalance from './PortfolioBalance.vue';

export default {
  props: {
    minMode: {
      type: Boolean,
      required: false,
      default: false,
    },
    items: {
      type: Object,
      required: true,
      default: () => { return {}; }
    },
    totalBaseValue: {
      type: Number,
      required: true,
      default: 0
    },
    fiatPrecision: {
      type: Number,
      required: true,
      default: 0
    }
  },
  components: {
    PortfolioBalance
  },
  data() {
    return {
    };
  },
  methods: {
    goToManagePortfolio() {
      this.$router.push({ name: 'manage' });
    }
  }
};
</script>

<style lang="scss">
  .trusty_table {
    width: 100%;
    margin-top: 20px;
    thead, th, tbody {
      color: white;
      border: none;
      background-color: transparent;
    }
    th span {
      color: #cccccc;
      font-family: 'Gotham_Pro_Regular';
      @media screen and (max-width: 768px){
        font-size: 4.4vw;
      }
    }
  }
</style>
