<template lang="pug">
  .transaction_info(:class="{'transaction_info--short' : short}")
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

      TransactionsItemPendingDeposit(
        v-if="type === 'pending_deposit'"
        :item="item"
      )

      TransactionsItemWithdraw(
        v-if="type === 'pending_withdraw'"
        type="pending"
        :item="item"
      )

      TransactionsItemWithdraw(
        v-if="type === 'result_withdraw'"
        type="result"
        :item="item"
      )


    div.transaction_info__date(v-show="!hideDate") {{ relativeTime }}

</template>

<script>
import config from '@/../config';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import TransactionsItemTransferInfo from './TransactionsItemTransferInfo';
import TransactionsItemPlaceOrderInfo from './TransactionsItemPlaceOrderInfo';
import TransactionsItemFillOrderInfo from './TransactionsItemFillOrderInfo';
import TransactionsItemCancelOrderInfo from './TransactionsItemCancelOrderInfo';
import TransactionsItemPendingDeposit from './TransactionsItemPendingDeposit';
import TransactionsItemWithdraw from './TransactionsItemWithdraw';

export default {
  components: {
    TransactionsItemTransferInfo,
    TransactionsItemPlaceOrderInfo,
    TransactionsItemFillOrderInfo,
    TransactionsItemCancelOrderInfo,
    TransactionsItemPendingDeposit,
    TransactionsItemWithdraw
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
    },
    short: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    type() {
      if (this.item.payload.to === config.trustyWithdrawAccount) {
        return 'pending_withdraw';
      }
      if (this.item.payload.from === config.trustyWithdrawAccount) {
        return 'result_withdraw';
      }
      return this.item.type;
    },
    relativeTime() {
      let time = distanceInWordsStrict(new Date(), this.item.date);
      time = time.replace('hours', 'h');
      time = time.replace('hour', 'h');
      time = time.replace('minutes', 'm');
      time = time.replace('minute', 'm');
      return time;
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
  &--short {
    p._value {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;      
    }
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
