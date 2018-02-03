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
        <PortfolioBalance 
          v-for="(item, id) in items"
         :key="id"
         :item="item"
         :total-base-value="totalBaseValue"/>
      </tbody>    

    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PortfolioBalance from './PortfolioBalance.vue';

export default {
  props: {
    balances: {
      required: true,
      type: Object,
      default: {}
    },
    baseId: {
      required: true,
      type: String,
      default: '1.3.0'
    },
    fiatId: {
      required: true,
      type: String,
      default: '1.3.121'
    },
    days: {
      required: true,
      type: Number,
      default: 7
    }
  },
  components: {
    PortfolioBalance
  },
  computed: {
    ...mapGetters({
      items: 'getPortfolioList'
    }),
    totalBaseValue() {
      return Object.keys(this.items).reduce((result, id) => {
        return result + this.items[id].balanceBase;
      }, 0);
    }
  },
  methods: {
    ...mapActions({
      fetchAssets: 'fetchAssets',
      fetchPortfolioData: 'fetchPortfolioData',
      resetPortfolioState: 'resetPortfolioState'
    })
  },
  beforeMount() {
    const assetsIds = Object.keys(this.balances);
    this.fetchAssets(assetsIds).then(() => {
      this.fetchPortfolioData({
        balances: this.balances,
        baseId: this.baseId,
        fiatId: this.fiatId,
        days: this.days
      });
    }, (error) => {
      console.log(error);
      // todo: alert notification here
    });
  },
  beforeDestroy() {
    this.resetPortfolioState();
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
