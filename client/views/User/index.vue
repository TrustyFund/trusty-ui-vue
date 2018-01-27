<template>
  <div class="user-container">
    <router-link to="/">back</router-link>
    <div v-if="accountObject">
       <h4>{{ name }} [{{ accountObject.id }}]</h4>
       
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'user',
  props: ['name'],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
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
    ...mapActions({
      fetchUser: 'fetchUser',
      fetchAssetsPrices: 'fetchAssetsPrices'
    }),
    drawRealBalance(amount, preceision) {
      return amount / (10 ** preceision);
    }
  },
  beforeMount() {
    this.fetchUser(this.name).then(() => {
      console.log('user fetched');
      this.fetchAssetsPrices();
    });
  }
};
</script>

<styles>
  .user-container {
    color: white;
  }
</styles>