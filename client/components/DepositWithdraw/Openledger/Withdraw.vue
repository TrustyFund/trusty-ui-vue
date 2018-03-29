<template lang="pug">
._turnover_info
  TrustyInput(label="enter receiving address")
      template(slot="input")
        input(v-model="address")
  .trusty_help_text._yellow(v-if="!$v.address.isValid")
    | Please enter a valid {{ getAssetById(payload.selectedcoin).symbol }} address
  .trusty_inline_buttons
    button Confirm
    button Cancel
  p.trusty_ps_text
    | Payment gateway service is provided by #[br]
    | Openledger.io at 0% fee

</template>

<script>
import TrustyInput from '@/components/UI/form/input';
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  props: ['payload'],
  components: {
    TrustyInput
  },
  data() {
    return {
      address: ''
    };
  },
  validations: {
    address: {
      required,
      isValid(address) {
        const asset = this.getAssetById(this.payload.selectedcoin).symbol.toLowerCase();
        return this.checkAddress({ asset, address });
      }
    }
  },
  computed: {
    ...mapGetters({
      getAssetById: 'assets/getAssetById'
    })
  },
  methods: {
    ...mapActions({
      checkAddress: 'openledger/checkIfAddressIsValid'
    })
  }
};
</script>

<style>
#trusty_transfer ._input_space input{
  width: 75%!important;
}
</style>
