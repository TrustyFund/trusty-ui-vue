<template lang="pug">
  .transaction_info
    div.transaction_info__main
      //- TransactionType(:type="type")
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
    div.transaction_info__date {{ getRelativeTime() }}

</template>

<script>
import { mapGetters } from 'vuex';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
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
  },
  methods: {
    getRelativeTime() {
      return distanceInWordsStrict(new Date(), this.item.date, {
        addSuffix: true
      });
    }
  }
};
</script>

<style lang="scss">

.transaction_info {
  font-size: 4.3vw;
  margin-bottom: 4.4vw;
  display: flex;
  justify-content: space-between;
  &__main {
    width: 100%;
  }
  &__date {
    color:#fdf101;
    font-family: Gotham_Pro;
    opacity: 0.8;
    min-width: 6rem;
    margin-left: 0.5rem;
    text-align: right;
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
