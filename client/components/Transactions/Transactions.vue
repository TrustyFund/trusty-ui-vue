<template lang="pug">

.trusty_recent_transactions.main_padding
  div.trusty_recent_transactions__spinner-container(v-show="pending")
    Spinner
  div.trusty_recent_transactions__error(v-show="error") Error when fetching user's transactions
  TransactionsItem(v-for="item in filteredOperations" 
                  :item="item"
                  :key="item.id"
                  :userId="userId")

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/UI/Spinner';
import TransactionsItem from './TransactionsItem';

export default {
  props: {
    // limit number of last transactions to show
    limit: {
      type: Number,
      required: false
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
      ready: 'connection/isReady',
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
    ...mapActions({
      initializeOperations: 'operations/fetchAndSubscribe',
      unsubscribeFromUserOperations: 'operations/unsubscribeFromUserOperations'
    })
  },
  watch: {
    ready: {
      handler(connected) {
        if (connected) {
          this.initializeOperations({ userId: this.userId });
        }
      },
      immediate: true
    }
  },
  beforeDestroy() {
    this.unsubscribeFromUserOperations();
  }
};
</script>

<style lang="scss">

@import "~@/style/mixins";

.trusty_recent_transactions {
  margin-top: 2vw;
  &__spinner-container {
    position: relative;
    height: 5rem;
  }
}

</style>
