<template lang="pug">
  .transaction_info
    div.transaction_info__main
      TransactionsItemTransferInfo(
        v-if="type === 'transfer'" 
       :userId="userId"
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
    div.transaction_info__date(v-show="!hideDate") {{ relativeTime }}

</template>

<script>
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import TransactionsItemTransferInfo from './TransactionsItemTransferInfo';
import TransactionsItemPlaceOrderInfo from './TransactionsItemPlaceOrderInfo';
import TransactionsItemFillOrderInfo from './TransactionsItemFillOrderInfo';
import TransactionsItemCancelOrderInfo from './TransactionsItemCancelOrderInfo';


export default {
  components: {
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
    },
    hideDate: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    type() {
      return this.item.type;
    },
    relativeTime() {
      return distanceInWordsStrict(new Date(), this.item.date, {
        addSuffix: true
      });
    }
  }
};
</script>

<style lang="scss">

.transaction_info {
  font-size: 3.9vw;
  margin-bottom: 2vw;
  display: flex;
  justify-content: space-between;
  opacity: 0.8;
  &__main {
    width: 100%;
  }
  &__date {
    color:#fdf101;
    font-family: Gotham_Pro;
    opacity: 0.7;
    min-width: 6rem;
    margin-left: 0.5rem;
    text-align: right;
  }

  p._value {
    color:#fdf101;
    margin: 0;
    font-family: Gotham_Pro_Regular;
    line-height: 4vw;
    span {
      color:#fdf101;
    }
  }

  @media screen and (min-width: 768px) {
    font-size: px_from_vw(3.3);
    margin-bottom: px_from_vw(2);
  }
}


</style>
