<template lang="pug">
._turnover_info
  TrustyInput(label="enter receiving address", v-show="!$v.address.isValid")
      template(slot="input")
        input(v-model="address", ref="addressinput")
  .trusty_help_text._yellow(v-if="!$v.address.isValid")
    | Please enter a valid {{ getAssetById(payload.selectedcoin).symbol }} address
  div.withdraw-address(v-if="$v.address.isValid")
    div(@click="clearAddress")
     icon(name="trusty_input_close", className="address-close", )
    .trusty_cutted_address(v-html="depositAddress")
  .trusty_inline_buttons
    button Confirm
    button Cancel
  p.trusty_ps_text
    | Payment gateway service is provided by #[br]
    | Openledger.io at 0% fee

</template>

<script>
import TrustyInput from '@/components/UI/form/input';
import Icon from '@/components/UI/icon';
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  props: ['payload'],
  components: {
    TrustyInput,
    Icon
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
    }),
    depositAddress() {
      const firstCount = Math.floor(this.address.length / 2) - 1;
      const start = this.address.slice(0, firstCount);
      const end = this.address.slice(firstCount);
      return `<span>${start}</span><br/><span>${end}</span>`;
    }
  },
  methods: {
    ...mapActions({
      checkAddress: 'openledger/checkIfAddressIsValid'
    }),
    clearAddress() {
      this.address = '';
      this.$nextTick(() => {
        this.$refs.addressinput.focus();
      });
    }
  }
};
</script>

<style scoped>
#trusty_transfer ._input_space input{
  width: 75%!important;
}

.withdraw-address {
  padding-top: 4vw;
}

.trusty_cutted_address {
  margin-right: 6vw;
}

.address-close {
  float: right;
  width: 5vw;
  margin-top: 4vw;
}
</style>