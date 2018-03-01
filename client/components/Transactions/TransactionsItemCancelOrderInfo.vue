<template lang="pug">
  p._value Cancelled order {{ item.payload.order }}
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

<style lang="scss">

</style>
