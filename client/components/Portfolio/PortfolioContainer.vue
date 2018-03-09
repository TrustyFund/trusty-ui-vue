<template lang="pug">
  div.portfolio-wrapper
    <router-view v-if="account && userBalances && items && !marketFetching" :items="items"></router-view>
    Portfolio(
      v-if="minMode && !marketFetching" 
      :items="items" 
      :min-mode="minMode" 
      :balances="userBalances" 
      :market="history" 
      :fiatId="featId")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Portfolio from './Portfolio.vue';

export default {
  props: {
    minMode: {
      type: Boolean,
      required: false,
      default: false
    },
    baseId: {
      type: String,
      required: false,
      default: '1.3.0'
    },
    featId: {
      type: String,
      required: false,
      default: '1.3.121'
    },
    days: {
      type: Number,
      required: false,
      default: 7
    }
  },
  components: {
    Portfolio
  },
  data() {
    return {
      pending: true
    };
  },
  computed: {
    ...mapGetters({
      ready: 'connection/isReady',
      userId: 'account/getAccountUserId',
      userBalances: 'user/getBalances',
      account: 'user/getAccountObject',
      items: 'portfolio/getPortfolioList',
      history: 'market/getMarketHistory',
      marketFetching: 'market/isFetching',
      marketError: 'market/isError'
    })
  },
  watch: {
    ready: {
      handler(connected) {
        if (connected && this.userId) {
          this.fetchUser(this.userId).then(result => {
            if (result.success) this.requestPortfolioData();
          });
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      fetchUser: 'user/fetchUser',
      fetchAssets: 'assets/fetchAssets',
      fetchPortfolioData: 'portfolio/fetchPortfolioData',
      resetPortfolioState: 'portfolio/resetPortfolioState',
      fetchMarketHistory: 'market/fetchMarketHistory'
    }),
    requestPortfolioData() {
      const assetsIds = Object.keys(this.userBalances);
      this.fetchAssets({ assets: assetsIds }).then(() => {
        this.fetchMarketHistory({
          baseId: this.baseId,
          assetsIds,
          days: 7
        });

        this.fetchPortfolioData({
          balances: this.userBalances,
          baseId: this.baseId,
          fiatId: this.fiatId,
          days: this.days
        }).then(() => {
          this.pending = false;
        });
      });
    }
  },
  beforeDestroy() {
    this.resetPortfolioState();
  }
};
</script>

<style lang="scss">

</style>
