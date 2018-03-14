<template>
	<div class="entry-point">
    <component v-if="routerName === 'entry'" 
               v-bind:is="computedComponent">             
    </component>
    <router-view v-if="userId"></router-view>
  </div>
</template>

<script>
import Landing from '@/components/Landing/Landing';
import Profile from '@/components/Profile/Profile';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'entry-point',
  components: {
    Landing, Profile
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      ready: 'connection/isReady',
      userId: 'account/getAccountUserId',
      userBalances: 'account/getCurrentUserBalances',
      defaultAssetsIds: 'assets/getDefaultAssetsIds'
    }),
    routerName() {
      return this.$route.name;
    },
    computedComponent() {
      return this.userId ? 'Profile' : 'Landing';
    },
    // user balances + default assets
    combinedBalances() {
      const combinedBalances = { ...this.userBalances };
      this.defaultAssetsIds.forEach(id => {
        if (combinedBalances[id]) return;
        combinedBalances[id] = { balance: 0 };
      });
      return combinedBalances;
    },
  },
  watch: {
    ready: {
      handler(connected) {
        if (connected) this.fetchUserRelatedData();
      },
      immediate: true
    },
    userId(newVal) {
      if (!this.ready) return;
      // cleanup after logout
      if (!newVal) {
        this.cleanUpUserData();
      }
    }
  },
  methods: {
    ...mapActions({
      fetchDefaultAssets: 'assets/fetchDefaultAssets',
      fetchCurrentUser: 'account/fetchCurrentUser',
      fetchAssets: 'assets/fetchAssets',
      fetchMarketHistory: 'market/fetchMarketHistory',
      clearOperations: 'operations/resetState',
      subscribeToMarket: 'market/subscribeToMarket',
      unsubscribeFromMarket: 'market/unsubscribeFromMarket'
    }),
    async fetchUserRelatedData() {
      await Promise.all([this.fetchDefaultAssets(), this.fetchCurrentUser()]);
      const combinedAssetsIds = Object.keys(this.combinedBalances);
      await this.fetchAssets({ assets: combinedAssetsIds });
      this.fetchMarketHistory({
        baseId: '1.3.0',
        assetsIds: combinedAssetsIds,
        days: 7
      });
      this.subscribeToMarket({ balances: this.combinedBalances });
    },
    cleanUpUserData() {
      this.clearOperations();
      this.unsubscribeFromMarket({ balances: this.combinedBalances });
    }
  },
};
</script>

<style lang="scss">
</style>
