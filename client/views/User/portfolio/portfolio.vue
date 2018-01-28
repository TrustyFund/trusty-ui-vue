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
        <balance v-for="item in items"
                :key="item.id"
                :name="item.name"
                :balance="item.balance"
                :balance-bts="item.balanceBTS"
                :prices="item.prices"
                :total="totalBTS"
                :multiplier="multiplier">
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
      baseMarketId: 'getBaseMarketId',
      defaultAssetsIds: 'getDefaultAssetsIds',
      getAssetPricesById: 'getAssetPricesById',
      multiplier: 'getPricesMultiplier'
    }),
    // user balances + default assets
    itemsIds() {
      return this.defaultAssetsIds.concat(Object.keys(this.userBalances));
    },
    // generates data for display
    items() {
      const obj = {};

      this.itemsIds.forEach(id => {
        const asset = this.getAssetById(id);
        const balance = (this.userBalances[id] && this.userBalances[id].balance) || 0;
        const realBalance = this.calcRealBalance(
          balance,
          asset.precision
        );
        const prices = this.getAssetPricesById(id);
        const balanceBTS = realBalance * prices.lastPrice;
        obj[id] = {
          id,
          name: asset.symbol,
          balance: realBalance,
          prices,
          balanceBTS
        };
      });

      return obj;
    },
    totalBTS() {
      let total = 0;
      Object.keys(this.items).forEach(id => {
        total += this.items[id].balanceBTS;
      });
      return total;
    }
  },
  methods: {
    calcRealBalance(amount, preceision) {
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
