<template lang="pug">
._turnover_info
  TrustyInput(label="enter receiving address")
      template(slot="input")
        input(v-model="address")
  .trusty_help_text._yellow
    | Please enter a valid {{ payload }} address
  .trusty_inline_buttons
    button Confirm
    button Cancel
  p.trusty_ps_text
    | Payment gateway service is provided by #[br]
    | Openledger.io at 0% fee

</template>

<script>
import TrustyInput from '@/components/UI/form/input';
export default {
  components: {
    TrustyInput
  },
  props: ['payload'],
  data() {
    return {
      address: ''
    };
  }
};
</script>

<style>
#trusty_transfer ._input_space input{
  width: 75%!important;
}
</style>
