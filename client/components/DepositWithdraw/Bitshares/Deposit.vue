<template lang="pug">
._turnover_info
  .trusty_help_text._yellow
    | Send {{ payload.coin }} to the address below
  .trusty_cutted_address
    span {{ userName }}
  .trusty_inline_buttons._one_button(
    v-clipboard:copy="userName"
    v-clipboard:success="onCopy"
  ): button Copy address
  ._yellow.trusty_ps_text
    | IMPORTANT: Please send BTC only from 
    br
    | BitShares account using this payment method
  .trusty_help_text._yellow
    | Push CONFIRM button as soon as you have completed the payment
  .trusty_inline_buttons
    button(@click="$router.replace('/')") Confirm
    button(@click="$router.replace('/')") Cancel

  p.trusty_ps_text
    | Payments using BitShares
    br
    | Are done directly at 0.0004$ fixed fee


    

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['payload'],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userName: 'account/getCurrentUserName'
    })
  },
  methods: {
    onCopy() {
      // todo: change to notification
      // eslint-disable-next-line
      alert('Address copied');
    }
  }
};
</script>

<style scoped>
.trusty_help_text {
  padding-top: 4vh;
}

.deposit_text {
  font-size: 3vw;
  padding-bottom: 3vw;
}
</style>