<template lang="pug">
#trusty_recent_transactions.main_padding
  .transaction_info
    ._date 20 feb 18 16:56
    p._value Receive 0.00364 BTS
  .transaction_info
    ._date 19 feb 18 13:56
    p._value Receive 0.0034 ETH

</template>

<script>
export default {

};
</script>

<style lang="scss">

@import "~@/style/mixins";

#trusty_recent_transactions {
  margin-top: 2vw;
}


.transaction_info {
  font-size: 4.3vw;
  margin-bottom: 4.4vw;
  ._date {
    color:#fdf101;
    font-family: Gotham_Pro;
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
