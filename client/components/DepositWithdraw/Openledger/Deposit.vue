<template lang="pug">
._turnover_info
  .trusty_help_text._yellow
    | Send {{ payload }} to the address below
  .trusty_cutted_address(v-html="depositAddress")
  .trusty_inline_buttons._one_button: button Copy address
  .trusty_help_text._yellow
    | Push CONFIRM button as soon as you have completed the payment
  .trusty_inline_buttons
    button(v-on:click="test2") Confirm
    button(v-on:click="test") Cancel
  p.trusty_ps_text
    | Payment gateway service is provided by #[br]
    | Openledger.io at 0% fee

</template>

<script>
import trustyInput from '@/components/UI/form/input';
import { mapGetters, mapActions } from 'vuex';
import iconComponent from '@/components/UI/icon';
import API from 'lib/src/services/api';

export default {
  props: ['payload'],
  data() {
    return {};
  },
  beforeMount() {
    this.fetchAddress({ asset: this.payload });
  },
  computed: {
    depositAddress() {
      const address = this.address;
      /* if (address) {
        const firstCount = Math.floor(address.length / 2) - 1;
        const start = address.slice(0, firstCount);
        const end = address.slice(firstCount);
        return `<span>${start}</span><br/><span>${end}</span>`;
      } */
      return `<span>${address}</span>`;
    },
    ...mapGetters({
      address: 'openledger/getDepositAddress'
    })
  },
  methods: {
    ...mapActions({
      fetchAddress: 'openledger/fetchDepositAddress'
    }),
    test() {
      console.log('REQ ADDR');
      API.Openledger.requestDepositAdress({
        asset: this.payload,
        user: 'hobb1t'
      }).then((result) => {
        console.log('RESULT', result);
      });
    },
    test2() {
      API.Openledger.getLastDepositAdress({
        asset: this.payload,
        user: 'hobb1t'
      }).then((result) => {
        console.log('RESULT', result);
      });
    }
  },
  components: {
    trustyInput,
    iconComponent
  }
};
</script>

<style>
#trusty_transfer ._input_space input{
  width: 75%!important;
}
</style>
