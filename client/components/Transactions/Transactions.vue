<template lang="pug">

.trusty_recent_transactions(:class="{'main_padding': !minMode, 'trusty_recent_transactions--min-mode': minMode }" 
                           @click="goToFullMode"
                           v-show="!minMode || filteredOperations.length || pending")
  div.trusty_recent_transactions__title(v-show="minMode") Recent transactions
  div.trusty_recent_transactions__empty(v-show="!filteredOperations.length && !pending") No transactions yet
  div.trusty_recent_transactions__spinner-container(v-show="pending")
    Spinner
  div.trusty_recent_transactions__error(v-show="error") Error when fetching user's transactions
  TransactionsItem(v-for="item in filteredOperations",
                  :item="item"
                  :hide-date="minMode",
                  :key="item.id",
                  :userId="userId")

</template>

<script>
import { mapGetters } from 'vuex';
import Spinner from '@/components/UI/Spinner';
import TransactionsItem from './TransactionsItem';

export default {
  props: {
    // limit number of last transactions to show
    limit: {
      type: Number,
      required: false,
      default: 100
    },
    // pass true when the component is nested inside another with
    // ability to go into full mode on click
    minMode: {
      type: Boolean,
      requred: false,
      default: false
    }
  },
  components: {
    TransactionsItem, Spinner
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userId: 'account/getAccountUserId',
      operations: 'operations/getOperations',
      pending: 'operations/isFetching',
      error: 'operations/isError'
    }),
    sortedOperations() {
      return this.operations.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
    },
    filteredOperations() {
      if (this.limit) return this.sortedOperations.slice(0, this.limit);
      return this.sortedOperations;
    }
  },
  methods: {
    goToFullMode() {
      if (this.minMode) this.$router.push({ name: 'transactions' });
    }
  }
};
</script>

<style lang="scss">

@import "~@/style/mixins";

.trusty_recent_transactions {
  margin-top: 2vw;
  &--min-mode {
    cursor: pointer;
  }
  &__title,
  &__empty {
    font-size: 4.4vw;
    color: white;
    font-family: 'Gotham_Pro_Regular';
    text-transform: uppercase;
  }
  &__empty {
    opacity: 0.8;
  }
  &__spinner-container {
    position: relative;
    height: 5rem;
  }
}

</style>
