<template lang="pug">
#openledger

</template>

<script>
/*eslint-disable*/
/*Work in process*/
import Connects from './connects';
import Coins from './coins';

export default {
  computed: {
    coinType() { return this.$store.state.transfer.coinType; },

  },
  props: ['accountName'],
  beforeMount() {
    this.coins = new Coins();
    this.coins.fetchCoins()
      .then(() => {
        this.updateAddress(this.coinType);
        this.$store.commit('change_deposit_address', this.openledger.state.receive_address);
      });
  },
  watch: {
    coinType(val) {
      this.updateAddress(val);
      this.$store.commit('change_deposit_address', this.openledger.state.receive_address);
    }
  },

  methods: {
    updateAddress(coinType) {
      this.start({
        coins: this.coins.state.backedCoins,
        provider: 'openledger',
        activeCoin: coinType,
        action: 'deposit',
        accountName: this.accountName,
      });
    },
    start({
      coins,  account,  provider, activeCoin, action, accountName
    }) {
      const filteredCoins = coins.filter(a => {
        if (!a || !a.symbol) {
          return false;
        }
        return action === 'deposit' ? a.depositAllowed : a.withdrawalAllowed;
      });
      let coin = filteredCoins.filter(coin => {
        return (action === 'deposit' ? coin.backingCoinType.toUpperCase() === activeCoin : coin.symbol === activeCoin);
      })[0];
      if (!coin) coin = filteredCoins[0];
      const issuers = {
        blocktrades: { name: 'blocktrades', id: '1.2.32567', support: 'support@blocktrades.us' },
        openledger: { name: coin.intermediateAccount, id: '1.2.96397', support: 'https://openledger.freshdesk.com' }
      };
      const issuer = issuers[provider];
      this.openledger = new Connects({
        key: `${provider}.${coin.symbol}`,
        gateway: provider,
        issuer_account: issuer.name,
        // account,
        accountName,
        deposit_asset: coin.backingCoinType.toUpperCase(),
        deposit_asset_name: coin.name,
        deposit_coin_type: coin.backingCoinType.toLowerCase(),
        deposit_account: coin.depositAccount,
        deposit_wallet_type: coin.walletType,
        gateFee: coin.gateFee,
        receive_asset: coin.symbol,
        receive_coin_type: coin.symbol.toLowerCase(),
        supports_output_memos: coin.supportsMemos,
        isAvailable: coin.isAvailable,
        action,
      });
    }
  },
  data() {
    return {
      openledger: {},
      coins: {}
    };
  }
};
/*eslint-disable*/
</script>

<style lang="css" scoped>
</style>
