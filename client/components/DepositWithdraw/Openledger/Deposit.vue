<template lang="pug">
._turnover_info
	.trusty_help_text._yellow
		| Send {{ payload }} to the address below
	.trusty_cutted_address(v-html="depositAddress")
	.trusty_inline_buttons._one_button: button Copy address
	.trusty_help_text._yellow
		| IMPORTANT: Send not less than {{ fee }} {{ payload }} to this deposit address.
		| Sending less than {{ fee }} {{ payload }} or any other currency will result
		| in the loss of your deposit.
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
import { mapGetters, mapActions } from 'vuex';
import iconComponent from '@/components/UI/icon';

export default {
  props: ['payload', 'fee'],
  data() {
    return {};
  },
  beforeMount() {
    this.fetchAddress({ asset: this.payload });
  },
  computed: {
    depositAddress() {
      if (this.address) {
        const firstCount = Math.floor(this.address.length / 2) - 1;
        const start = this.address.slice(0, firstCount);
        const end = this.address.slice(firstCount);
        return `<span>${start}</span><br/><span>${end}</span>`;
      }
      return `<span>${this.address}</span>`;
    },
    ...mapGetters({
      address: 'openledger/getDepositAddress'
    })
  },
  methods: {
    ...mapActions({
      fetchAddress: 'openledger/fetchDepositAddress'
    })
  },
  watch: {
    payload(asset) {
      this.fetchAddress({ asset });
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
