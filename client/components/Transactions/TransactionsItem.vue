<template lang="pug">
  .transaction_info
    TransactionType(:type="type")
    div
      div._date 20 feb 18 16:56

      TransactionsItemTransferInfo(
        v-if="type === 'transfer'" 
       :item="item")

      TransactionsItemPlaceOrderInfo(
        v-if="type === 'limit_order_create'" 
       :item="item")

      TransactionsItemFillOrderInfo(
        v-if="type === 'fill_order'" 
       :item="item")

      TransactionsItemCancelOrderInfo(
        v-if="type === 'limit_order_cancel'" 
       :item="item")

</template>

<script>
import { mapGetters } from 'vuex';
import TransactionType from './TransactionsItemType';
import TransactionsItemTransferInfo from './TransactionsItemTransferInfo';
import TransactionsItemPlaceOrderInfo from './TransactionsItemPlaceOrderInfo';
import TransactionsItemFillOrderInfo from './TransactionsItemFillOrderInfo';
import TransactionsItemCancelOrderInfo from './TransactionsItemCancelOrderInfo';

export default {
  components: {
    TransactionType,
    TransactionsItemTransferInfo,
    TransactionsItemPlaceOrderInfo,
    TransactionsItemFillOrderInfo,
    TransactionsItemCancelOrderInfo
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getAssetById: 'assets/getAssetById'
    }),
    type() {
      return this.item.type;
    }
  }
};
</script>

<style lang="scss">

.transaction_info {
  font-size: 4.3vw;
  margin-bottom: 4.4vw;
  display: flex;
  align-items: center;
  ._date {
    color:#fdf101;
    font-family: Gotham_Pro;
    opacity: 0.8;
    font-size: 4vw;
  }

  p._value {
    color:#fdf101;
    margin: 0;
    font-family: Gotham_Pro_Regular;
  }

  @media screen and (min-width: 768px) {
    font-size: px_from_vw(4.3);
    margin-bottom: px_from_vw(4.4);
  }
}


</style>
