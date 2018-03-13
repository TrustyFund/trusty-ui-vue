<template lang="pug">
  .trusty_total_funds(v-if="userData")
    p {{ name }} TOTAL FUNDS
    h3._text_center: span {{ totalFunds }}$

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    balances: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({

    }),
    totalFunds() {
      return 0;
    }
  },
  methods: {
    goToManagePortfolio() {
      this.$router.push({ name: 'manage' });
    }
  },
};
</script>

<style lang="scss">

@import "~@/style/mixins";

.trusty_total_funds {
  margin-top: 1.3vw;
  margin-bottom: 1.2vw;
  p {
    font-family: 'Gotham_Pro_Regular';
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 0; 
  }
  h3 {
    font-family: 'Gotham_Pro_Medium';
    margin-top: 0;
    margin-bottom: 0;
    line-height: initial;
  }
}

</style>
