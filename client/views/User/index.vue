<template>
  <div class="page">
    <router-link to="/">back</router-link>
    <div v-if="this.$store.state.user.account">
       <h4>{{ userName }} [{{ accountObject.id }}]</h4>
       
       <div v-if="this.$store.state.user.balances">
          <ul v-for="balance in balances">
            <li v-if="balance.balance">
              {{ getAssetFieldById('symbol',balance.asset_type) }}
              {{ drawRealBalance(balance.balance,getAssetFieldById('precision',balance.asset_type)) }}
            </li>
          </ul>
       </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  beforeMount() {
    this.$store.dispatch('fetchUser', this.$route.params.nickname);
  },
  computed: {
    ...mapGetters({
      userName: 'getUserName',
      accountObject: 'getAccountObject',
      balances: 'getBalances',
      getAssetById: 'getAssetById',
      getAssetFieldById: 'getAssetFieldById'
    })
  },
  methods: {
    drawRealBalance(amount, preceision) {
      return amount / (10 ** preceision);
    }
  }
};
</script>
