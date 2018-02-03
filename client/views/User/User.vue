<template>
  <div class="user-container">
    <router-link to="/">back</router-link>
    <div v-if="account">
      <h4>{{ name }} [{{ account.id }}]</h4> 
      <!-- baseId - BTS, fiatId - USD -->
      <Portfolio :balances="userBalances"
                 base-id="1.3.0"
                 fiat-id="1.3.121"
                 :days="7"/> 
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
      userBalances: 'getBalances'
    })
  },
  methods: {
    ...mapActions(['fetchUser'])
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