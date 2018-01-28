<template>
  <div class="portfolio-container">
    <table class="portfolio-container__table">      
      <thead>
        <tr>
          <th><span>ASSET</span></th>
          <th><span>Balance</span></th>
          <th><span>Balance in BTS</span></th>
          <th><span>Share</span></th>
          <th><span>$VALUE</span></th>
          <th><span>7DAYS</span></th>
        </tr>
      </thead>

      <tbody>
        <balance v-for="asset in userAssets"
                :asset="asset"
                :price="prices[asset.id]"
                :multiplier="priceMultiplier"
                :total="total"
                :baseId="baseMarketId">  
        </balance>
        <balance v-for="asset in defaultAssetsFiltered"
                :asset="asset"
                :price="prices[asset.id]"
                :multiplier="priceMultiplier"
                :baseId="baseMarketId">  
        </balance>
      </tbody>    
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Balance from './balance.vue';

export default {
  components: {
    Balance
  },
  computed: {
    ...mapGetters({
      userBalances: 'getBalances',
      getAssetById: 'getAssetById',
      prices: 'getAssetsPrices',
      preferredAssetId: 'getPreferredAssetId',
      baseMarketId: 'getBaseMarketId',
      defaultAssetsSymbols: 'getDefaultAssets',
      assets: 'getAssets'
    }),
    priceMultiplier() {
      if (!this.prices[this.preferredAssetId]) {
        return {
          first: 0, last: 0
        };
      }

      return {
        first: 1 / this.prices[this.preferredAssetId].firstPrice,
        last: 1 / this.prices[this.preferredAssetId].lastPrice
      };
    },
    userAssets() {
      return this.userBalances.map(balance => {
        const asset = this.getAssetById(balance.asset_type);
        const realBalance = this.drawRealBalance(
          balance.balance,
          asset.precision
        );

        return ({
          id: asset.id,
          symbol: asset.symbol,
          balance: realBalance
        });
      });
    },
    userAssetsIds() {
      return this.userAssets.map(asset => asset.id);
    },
    defaultAssetsFiltered() {
      const defaultAssets = [];
      Object.keys(this.assets).forEach(id => {
        const asset = this.assets[id];
        const { symbol } = asset;
        if (this.defaultAssetsSymbols.indexOf(symbol) > -1) {
          defaultAssets.push(asset);
        }
      });
      return defaultAssets.filter(asset => this.userAssetsIds.indexOf(asset.id) === -1);
    },
    total() {
      let total = 0;
      this.userAssets.forEach(asset => {
        if (asset.id === this.baseMarketId) total += asset.balance;
        else total += asset.balance * this.prices[asset.id].lastPrice;
      });
      return total;
    }
  },
  methods: {
    drawRealBalance(amount, preceision) {
      return amount / (10 ** preceision);
    }
  }
};
</script>

<style>
  .portfolio-container__table {
    width: 100%;
    max-width: 50rem;
    thead {
      color: #cccccc;
      font-weight: 300;
      font-size: 0.8rem;
      margin-bottom: 1rem;
      tr th {
        text-align: left;
      }
    }
    tbody {
      tr th {
        text-align: left;
      }
    }
  }
</style>
