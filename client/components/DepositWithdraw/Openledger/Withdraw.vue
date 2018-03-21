<template lang="pug">
._turnover_info
  .trusty_help_text._yellow
    | Please enter a valid {{ payload }} address
  .trusty_inline_buttons._one_button: button Paste Address
  .trusty_inline_buttons
    button Confirm
    button Cancel
  p.trusty_ps_text
    | Payment gateway service is provided by #[br]
    | Openledger.io at 0% fee

</template>

<script>

export default {
  props: ['payload'],
  data() {
    return {};
  }
};
</script>

<style>
#trusty_transfer ._input_space input{
  width: 75%!important;
}
</style>
