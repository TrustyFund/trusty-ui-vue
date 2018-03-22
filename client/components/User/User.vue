<template>
  <div class="user-container">
    <div class="user-container__spinner-container"
         v-if="fetching">
      <Spinner/>
    </div>
    <div v-if="account">
      <h4>{{ name }} [{{ account.id }}]</h4> 

      <!-- baseId - BTS, fiatId - USD -->
      <Portfolio :balances="userBalances"
                 v-if="account"
                 base-id="1.3.0"
                 fiat-id="1.3.121"
                 :days="7"
                 :min-mode="true"/> 
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Portfolio from '@/components/Portfolio/Portfolio.vue';
import Spinner from '@/components/UI/Spinner.vue';

export default {
  name: 'user',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  components: {
    Portfolio, Spinner
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      account: 'user/getAccountObject',
      userBalances: 'user/getBalances',
      fetching: 'user/isFetching',
      ready: 'connection/isReady'
    })
  },
  methods: {
    ...mapActions({
      fetchUser: 'user/fetchUser',
      fetchMarketHistory: 'market/fetchMarketHistory',
      fetchAssets: 'assets/fetchAssets'
    })
  },
  watch: {
    ready: {
      handler(connected) {
        if (connected) {
          this.fetchUser(this.name).then(result => {
            if (!result.success) {
              this.$notify({    
                type: 'error',
                title: '',
                text: this.name + ' : ' + result.error
              });
              this.$router.push({ name: 'entry' });
            } else {
              const assetsIds = Object.keys(this.userBalances);
              this.fetchAssets({ assets: assetsIds }).then(() => {
                this.fetchMarketHistory({
                  baseId: '1.3.0',
                  assetsIds,
                  days: 7
                });
              });
            }
          });
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss">
  .user-container {
    padding: 1rem;
    color: white;
    font-family: 'Gotham_Pro_Regular';
    &__spinner-container {
      position: relative;
    }
  }
</style>