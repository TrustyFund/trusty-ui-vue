<template lang="pug">

.withdraw-transfer-container
	p
	TrustyInput(
		label="enter receiver's address",
		v-model="name",
		:validate="$v.name.$touch",
		inputClass="recepient-input")
	.trusty_font_error(v-if="!$v.name.required && this.$v.name.$dirty") Enter account name
	.trusty_font_error(v-if="!$v.name.isUnique && !this.$v.$pending && this.$v.name.$dirty") No such user
	.trusty_font_error(v-if="!$v.name.notSelf && this.$v.name.$dirty") Can't send to yourself
	._yellow.trusty_ps_text
		| IMPORTANT: Please send {{ getAssetById(coin).symbol }} only to
		br
		| BitShares account using this payment method
	.trusty_inline_buttons._mob
				button(:class="{'_disable': !enableButton }", @click="sendFunds") Confirm
				button(@click="$router.replace('/')") Cancel
	p.trusty_ps_text
		| Payments using BitShares
		br
		| are done directly at 0.0004$ fixed fee

</template>

<script>
import TrustyInput from '@/components/UI/form/input';
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  props: {
    coin: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  mixins: [validationMixin],
  components: {
    TrustyInput
  },
  data() {
    return {
      name: ''
    };
  },
  validations: {
    name: {
      required,
      isUnique(value) {
        if (value === '') return true;
        return new Promise((resolve) => {
          this.checkUsername({ username: value.toLowerCase() }).then(result => resolve(!result));
        });
      },
      notSelf(value) {
        return value.toLowerCase() !== this.userName;
      }
    }
  },
  computed: {
    ...mapGetters({
      userName: 'account/getCurrentUserName',
      getAssetById: 'assets/getAssetById'
    }),
    enableButton() {
      return !this.$v.$invalid && this.amount;
    }
  },
  methods: {
    ...mapActions({
      checkUsername: 'account/checkIfUsernameFree',
      setTransaction: 'transactions/setPendingTransfer'
    }),
    sendFunds() {
      this.$v.$touch();
      if (!this.$v.$invalid && this.amount) {
        const transaction = {
          assetId: this.coin,
          amount: this.amount,
          to: this.name.toLowerCase()
        };
        this.setTransaction({ transaction });
        this.$router.push({ name: 'confirm-transactions' });
      }
    }
  }
};

</script>

<style lang="scss">
button._disable {
	pointer-events: none;
	opacity: 0.5;
}

.withdraw-transfer-container {
	.recepient-input {
		text-transform: lowercase;
	}
}
</style>

