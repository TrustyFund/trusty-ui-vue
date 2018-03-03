<template lang="pug">

.trusty_recent_transactions.main_padding
  div.trusty_recent_transactions__spinner-container(v-show="pending")
    Spinner
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
    }),
    filteredOperations() {
      if (this.limit) return this.operations.slice(0, this.limit);
      return this.operations;
    }
  },
  methods: {
    ...mapActions({
      fetchOperations: 'operations/fetchUserOperations'
    })
  },
  watch: {
    ready: {
      handler(connected) {
        if (connected) {
          this.fetchOperations({ userId: this.userId });
        }
      },
      immediate: true
    }
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
