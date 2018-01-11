<template>
  <div class="page">
    <router-link to="/">back</router-link>
    <div v-if="this.$store.state.user.account">
       <h4>{{getUserName}} [{{getAccountObject.id}}]</h4>
       
       <div v-if="this.$store.state.user.balances">
          <ul v-for="balance in getBalances">
            <li v-if="balance.balance">
              {{symbolById(balance.asset_type)}} 
              {{drawRealBalance(balance.balance,precisionById(balance.asset_type))}}
            </li>
          </ul>
       </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  beforeMount(){
    this.$store.dispatch('getUser',this.$route.params.nickname);
  },
  computed: {
    ...mapGetters([
      'getUserName',
      'getAccountObject',
      'getBalances',
      'getAssetById'
    ])
  },
  methods: {
    drawRealBalance(amount,preceision){
      return amount / Math.pow(10,preceision);
    },
    symbolById(asset_type){
      return this.getAssetById(asset_type).symbol;
    },
    precisionById(asset_type){
      return this.getAssetById(asset_type).precision;
    }
  }
}
</script>
