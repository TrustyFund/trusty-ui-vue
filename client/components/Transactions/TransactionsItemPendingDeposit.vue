<template lang="pug">
  p._value {{ item.amount }} BTC Incoming deposit
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
