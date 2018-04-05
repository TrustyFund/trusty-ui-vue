<template lang="pug">
.manual_trading_container
  router-view(:markets="markets")
</template>

<script>
import Markets from 'lib/src/services/api/market';

export default {
  data() {
    return {};
  },
  computed: {
    markets() {
      console.log('Markets', Object.keys(Markets));
      return Object.keys(Markets);
    }
  }
};
</script>