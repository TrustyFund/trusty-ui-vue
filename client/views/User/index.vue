<template>
  <div class="user-container">
    <router-link to="/">back</router-link>
    <div v-if="account">
       <h4>{{ name }} [{{ account.id }}]</h4>
       
      <portfolio></portfolio>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Portfolio from './portfolio/portfolio.vue';

export default {
  name: 'user',
  props: ['name'],
  components: {
    Portfolio
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      account: 'getAccountObject',
      userBalances: 'getBalances',
      assets: 'getAssets'
    })
  },
  methods: {
    ...mapActions({
      fetchUser: 'fetchUser',
      fetchAssetsPrices: 'fetchAssetsPrices',
      fetchAssets: 'fetchAssets'
    })
  },
  beforeMount() {
    this.fetchUser(this.name).then(() => {
      const assetsIds = Object.keys(this.userBalances);
      this.fetchAssets(assetsIds).then(() => {
        this.fetchAssetsPrices(this.assets).then(() => {}, (error) => {
          console.log(error);
          // todo: alert notification here
        });
      }, (error) => {
        console.log(error);
        // todo: alert notification here
      });
    }, (error) => {
      // todo : alert notification here
      console.log(error);
    });
  }
};
</script>

<style lang="scss">
  .user-container {
    padding: 1rem;
    color: white;
    font-family: 'Gotham_Pro_Regular';
  }
</style>