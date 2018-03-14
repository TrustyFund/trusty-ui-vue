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
        if (connected) {
          this.fetchDefaultAssets();
          this.fetchUserData();
        }
      },
      immediate: true
    },
    userId(newVal) {
      if (!this.ready) return;
      // triggered after logout & login
      console.log('user changed : ', newVal);
      if (newVal) {
        this.fetchUserData();
      } else {
        this.cleanUpUserData();
      }
    }
  },
  methods: {
    ...mapActions({
      fetchDefaultAssets: 'assets/fetchDefaultAssets',
      fetchCurrentUser: 'account/fetchCurrentUser',
      fetchAssets: 'assets/fetchAssets',
      fetchMarketHistory: 'market/fetchMarketHistory'
    }),
    async fetchUserData() {
      await Promise.all([this.fetchDefaultAssets(), this.fetchCurrentUser()]);
      const combinedAssetsIds = Object.keys(this.combinedBalances);
      await this.fetchAssets({ assets: combinedAssetsIds });
      this.fetchMarketHistory({
        baseId: '1.3.0',
        assetsIds: combinedAssetsIds,
        days: 7
      });
      // then fetch assets & market
    },
    cleanUpUserData() {
      console.log('cleanup user data');
      // cleanup user data & subscriptions
    }
  },
};
</script>

<style lang="scss">
</style>
