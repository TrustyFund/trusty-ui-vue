<template>
  <div class="page">
    <router-link to="/">back</router-link>
    <div v-if="accountObject">
       <h4>{{ userName }} [{{ accountObject.id }}]</h4>
       
       <div>
          <ul v-for="asset in userAssets">
            <li >
              {{ asset.name }}
              {{ asset.balance }}
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
      userBalances: 'getBalances',
      getAssetById: 'getAssetById',
      getAssetFieldById: 'getAssetFieldById'
    }),
    userAssets() {
      const resultAssets = [];
      this.userBalances.forEach(balance => {
        const asset = this.getAssetById(balance.asset_type);
        if (balance.balance) {
          const realBalance = this.drawRealBalance(
            balance.balance,
            asset.precision
          );
          resultAssets.push({
            name: asset.symbol || 'Недоступно',
            balance: realBalance || ''
          });
        }
      });

      return resultAssets;
    }
  },
  methods: {
    drawRealBalance(amount, preceision) {
      return amount / (10 ** preceision);
    }
  }
};
</script>
