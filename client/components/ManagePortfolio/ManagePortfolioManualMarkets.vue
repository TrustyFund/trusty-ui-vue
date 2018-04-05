<template lang="pug">
.manual_trading_markets
  template(v-for="market in markets")
    div(@click="goToMarket(market)") {{ getAssetById(market).symbol }}
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['markets'],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getAssetById: 'assets/getAssetById'
    })
  },
  methods: {
    goToMarket(market) {
      this.$router.push({ name: 'manage-manual-market', params: { market } });
    }
  }
};
</script>