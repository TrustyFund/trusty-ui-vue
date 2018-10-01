<template lang="pug">
  .mirror-container
    .mirror-list
      p Sort:
      select
        option(selected) Discussed
        option Newest
      .mirror-card(v-for="item in trades")
        .mirror-card-image.trade(:class="item.direction == 'short' ? 'red' : 'blue'")
          span.card-symbol {{ item.symbol }}
          icon-component(
            name="diagonal_arrow",
            className="diagonal_arrow",
            v-bind:className="item.direction == 'short' ? 'card-fall' : 'card-grow'" )
          span.card-leverage {{ item.leverage }}
        .mirror-card-info
          span.card-name {{item.username}}
          span.card-info {{item.comment_count}} comments
        .mirror-card-statistics
          span.card-status.is-open {{ isOpened(item.is_open) }}
          span.card-statistics(:class="item.profit_loss_percent.includes('-') ? 'red' : 'blue'") {{ !item.profit_loss_percent.includes('-') ? '+' + item.profit_loss_percent : item.profit_loss_percent }}%
</template>

<script>
import iconComponent from '@/components/UI/icon';

const trades = require('./trades.json');

export default {
  components: {
    iconComponent
  },
  data() {
    return {
      trades
    };
  },
  methods: {
    isOpened(condition) {
      return condition === true ? 'Open' : 'Closed';
    }
  }
};

</script>

<style lang="scss">

</style>
