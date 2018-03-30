<template lang="pug">
._turnover_info
  TrustyInput(label="enter receiving address", v-show="!$v.address.isValid")
      template(slot="input")
        input(v-model="address", ref="addressinput", @input="$v.address.$touch()")
  .trusty_help_text._yellow(v-if="!$v.address.isValid")
    | Please enter a valid {{ getAssetById(coin).symbol }} address
  div.withdraw-address(v-if="$v.address.isValid")
    div(@click="clearAddress")
     icon(name="trusty_input_close", className="address-close", )
    .trusty_cutted_address(v-html="depositAddress")
  .trusty_inline_buttons
    button(:class="{'_disable': !enableButton}" @click="withdraw") Confirm
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
  props: ['amount', 'coin'],
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
        console.log('validation adress');
        const asset = this.getAssetById(this.coin).symbol.toLowerCase();
        return this.checkAddress({ asset, address });
      }
    }
  },
  computed: {
    ...mapGetters({
      getAssetById: 'assets/getAssetById',
      coinsData: 'openledger/getCoinsData'
    }),
    depositAddress() {
      const firstCount = Math.floor(this.address.length / 2) - 1;
      const start = this.address.slice(0, firstCount);
      const end = this.address.slice(firstCount);
      return `<span>${start}</span><br/><span>${end}</span>`;
    },
    enableButton() {
      return !this.$v.$invalid && this.amount;
    }
  },
  methods: {
    ...mapActions({
      checkAddress: 'openledger/checkIfAddressIsValid',
      setTransaction: 'transactions/setPendingTransfer'
    }),
    clearAddress() {
      this.address = '';
      this.$nextTick(() => {
        this.$refs.addressinput.focus();
      });
    },
    withdraw() {
      this.$v.$touch();
      if (!this.$v.$invalid && this.amount) {
        const coin = this.getAssetById(this.coin);
        const coinName = coin.symbol.toLowerCase();
        const { gateFee, intermediateAccount } = this.coinsData[coinName];
        const memo = coinName + ':' + this.address;
        const transaction = {
          withdraw: true,
          assetId: this.coin,
          amount: this.amount,
          to: intermediateAccount,
          address: this.address,
          fee: parseFloat(gateFee),
          memo
        };
        console.log('goto transactions', transaction);
        this.setTransaction({ transaction });
        this.$router.push({ name: 'confirm-transactions' });
      }
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

.trusty_help_text._yellow {
  padding-top: 2vw;
}

button._disable {
  pointer-events: none;
  opacity: 0.5;
}
</style>