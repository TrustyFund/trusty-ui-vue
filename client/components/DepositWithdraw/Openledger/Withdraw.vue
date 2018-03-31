<template lang="pug">
._turnover_info
  p
  TrustyInput(label="enter receiving address")
      template(slot="input")
        input(v-model="address", ref="addressinput", @input="$v.address.$touch()", id="withdraw-address")
  .trusty_font_error(v-if="!$v.address.isValid")
    | Please enter a valid {{ getAssetById(coin).symbol }} address
  br
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
        const asset = this.getAssetById(this.coin).symbol.toLowerCase();
        console.log('validation adress');
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

#withdraw-address {
  font-size: 4.2vw!important;
  width: 100vw!important;
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