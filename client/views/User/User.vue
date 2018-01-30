<template>
  <div class="user-container">
    <router-link to="/">back</router-link>
    <div v-if="account">
      <h4>{{ name }} [{{ account.id }}]</h4> 
      <Portfolio :balances="userBalances"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Portfolio from '../Portfolio/Portfolio.vue';

export default {
  name: 'user',
  props: {
    name: {
      type: String,
      required: true
    }
  },
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
      fetchUser: 'fetchUser'
    })
  },
  beforeMount() {
    this.fetchUser(this.name).then(() => {
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