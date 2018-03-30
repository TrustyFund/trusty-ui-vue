<template lang="pug">

#trusty_auth.signup

	.input_area
		.left

			trusty-input(
				label="enter email or account name",
				v-model="name"
				:validate="debouncedNameInput")
			.trusty_font_error(v-if="!$v.name.required && $v.name.$dirty") Enter email or account name
			.trusty_font_error(v-if="$v.name.required && !$v.name.minLength && $v.name.$dirty") Must be 4 characters or more
			.trusty_font_error(v-if="$v.name.required &&$v.name.minLength && !$v.name.hasSpecialSymbol && $v.name.$dirty") Should contain '@', '-' or number
			.trusty_font_error(v-if="$v.name.hasSpecialSymbol && !$v.name.noBadSymbolAtEnd && $v.name.$dirty") Should not end with '@', '-' or '.'
			.trusty_font_error(v-if="$v.name.hasSpecialSymbol && $v.name.noBadSymbolAtEnd && !$v.name.isUnique && $v.$pending") Checking...
			.trusty_font_error(v-if="$v.name.hasSpecialSymbol && $v.name.noBadSymbolAtEnd && !$v.name.isUnique && !$v.$pending && $v.name.$dirty") Account name already taken

			p._tooltip_p
				| Use email for signup to receive notifications

			trusty-input(
				label="create pin code",
				:validate="debouncedPinInput",
				v-model="pin",
				inputType="tel")
			.trusty_font_error(v-if="!$v.pin.required && this.$v.pin.$dirty") Enter PIN
			.trusty_font_error(v-if="!$v.pin.minLength && this.$v.pin.$dirty") PIN must be 6 characters or more

			trusty-input(
				label="confirm pin",
				:validate="debouncedRepeatPinInput",
				v-model="confirmPin",
				inputType="tel")
			.trusty_font_error(v-if="!$v.confirmPin.sameAsPin && this.$v.confirmPin.$dirty") PIN codes do not match

	.trusty_buttons
		button(@click="handleSignUp" v-show="!pending") Sign up
		button(v-show="pending") loading....

	p._tooltip_p._text_center
		| Before continuing, make sure your device is secure

	._bottom_link(@click="$router.push({ name: 'login' })"): span Log in with existing account

	._bottom_link._margins: span(@click="$router.push({name:'terms-of-use'})") I accept Terms of use


</template>

<script>
import trustyInput from '@/components/UI/form/input';
import Icon from '@/components/UI/icon';
import debounce from 'lodash/debounce';
import { validationMixin } from 'vuelidate';
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import dictionary from '../../../vuex-bitshares/test/brainkey_dictionary.js';

export default {
  mixins: [validationMixin],
  components: { trustyInput, Icon },
  data() {
    return {
      name: '',
      pin: '',
      confirmPin: '',
    };
  },
  validations: {
    name: {
      required,
      hasSpecialSymbol(value) {
        const hasDog = value.indexOf('@') > -1;
        const hasLine = value.indexOf('-') > -1;
        const hasNumber = /\d/.test(value);
        return hasDog || hasLine || hasNumber;
      },
      noBadSymbolAtEnd(value) {
        if (value.indexOf('@') === value.length - 1) return false;
        if (value.indexOf('-') === value.length - 1) return false;
        if (value.indexOf('.') === value.length - 1) return false;
        return true;
      },
      isUnique(value) {
        if (!this.$v.name.required
          || !this.$v.name.minLength
          || !this.$v.name.hasSpecialSymbol) return true;
        return this.checkUsername({ username: value.replace(/@/g, '-') });
      },
      minLength: minLength(4)
    },
    pin: {
      required,
      minLength: minLength(6)
    },
    confirmPin: {
      sameAsPin: sameAs('pin')
    }
  },
  computed: {
    ...mapGetters({
      pending: 'account/getAccountPendingState'
    })
  },
  methods: {
    ...mapActions({
      checkUsername: 'account/checkIfUsernameFree',
      signup: 'account/signup',
    }),
    debouncedPinInput: () => {},
    debouncedRepeatPinInput: () => {},
    debouncedNameInput: () => {},
    async handleSignUp() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const replacedName = this.name.replace(/@/g, '-');
        console.log(this.name, replacedName, this.pin);
        const result = await this.signup({
          name: replacedName,
          password: this.pin,
          dictionary: dictionary.en
        });
        if (result.success) {
          this.$router.push({ name: 'entry' });
        } else {
          this.$toast.error('Error: ' + result.error);
          console.log(result.error);
        }
      }
    }
  },
  created() {
    this.debouncedPinInput = debounce((e) => {
      this.$v.pin.$touch();
    }, 800);
    this.debouncedRepeatPinInput = debounce((e) => {
      this.$v.confirmPin.$touch();
    }, 800);
    this.debouncedNameInput = debounce((e) => {
      this.$v.name.$touch();
    }, 800);
  }
};

</script>



