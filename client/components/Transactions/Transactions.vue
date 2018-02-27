<template lang="pug">
#trusty_recent_transactions.main_padding
  TransactionsItem(v-for="item in items" 
                  :item="item"
                  :key="item.id")
  //- .transaction_info(v-for="item in items")
    ._date 20 feb 18 16:56
    p._value Receive 0.00364 BTS
  //- .transaction_info
    ._date 19 feb 18 13:56
    p._value Receive 0.0034 ETH

</template>

<script>
import { mapGetters } from 'vuex';
import TransactionsItem from './TransactionsItem';

export default {
  components: {
    TransactionsItem
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      items: 'account/getOperations'
    })
  }
};
</script>

<style lang="scss">

@import "~@/style/mixins";

#trusty_recent_transactions {
  margin-top: 2vw;
}

</style>
