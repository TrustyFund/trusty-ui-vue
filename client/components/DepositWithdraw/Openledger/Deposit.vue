<template lang="pug">
._turnover_info
  .trusty_help_text._yellow
    | Send {{ selectedcoin }} to the address below
  .trusty_cutted_address(v-html="depositAddress")
  .trusty_inline_buttons._one_button: button Copy address
  .trusty_help_text._yellow
    | Push CONFIRM button as soon as you have completed the payment
  .trusty_inline_buttons
    button Confirm
    button Cancel
  p.trusty_ps_text
    | Payment gateway service is provided by #[br]
    | Openledger.io at 0% fee

</template>

<script>
import trustyInput from '@/components/UI/form/input';
import iconComponent from '@/components/UI/icon';

export default {
  data() {
    return {};
  },
  components: {
    trustyInput,
    iconComponent
  }
};
</script>
