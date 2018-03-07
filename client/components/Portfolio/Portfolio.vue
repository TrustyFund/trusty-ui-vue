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
          v-for="(item, id) in items"
         :key="id"
         :item="item"
         :total-base-value="totalBaseValue")

</template>

<script>
import { mapGetters } from 'vuex';
import PortfolioBalance from './PortfolioBalance.vue';

export default {
  props: {
    minMode: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  components: {
    PortfolioBalance
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      items: 'portfolio/getPortfolioList'
    }),
    totalBaseValue() {
      return Object.keys(this.items).reduce((result, id) => {
        return result + this.items[id].balanceBase;
      }, 0);
    }
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
