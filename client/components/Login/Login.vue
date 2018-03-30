<template lang="pug">

#trusty_auth.login

	.input_area

			trusty-input(
				label="BACKUP PHRASE",
				type="textarea",
				:textarea="true",
				v-model="brainkey",
				:validate="$v.brainkey.$touch")
			.trusty_font_error(v-if="!$v.brainkey.required && this.$v.brainkey.$dirty") Enter backup phrase
			.trusty_font_error(v-if="showError") Please try again

			p._tooltip_p
				| Enter 16 words you backed up when account was created

			trusty-input(
				label="create pin code",
				:validate="debouncedPinInput",
				v-model="pin"
				inputType="tel")

			.trusty_font_error(v-if="!$v.pin.required && this.$v.pin.$dirty") Enter PIN
			.trusty_font_error(v-if="!$v.pin.minLength && this.$v.pin.$dirty") PIN must be 6 characters or more

			p._tooltip_p
				| PIN code secures access only on this device

			trusty-input(
				label="confirm pin",
				:validate="debouncedRepeatPinInput",
				v-model="confirmPin"
				inputType="tel")

			.trusty_font_error(v-if="!$v.confirmPin.sameAsPin && this.$v.confirmPin.$dirty") PIN codes do not match

	p._tooltip_p
		| Please enter account brainkey once for new devices, #[br]
		| 12 words, you backed up, when account was created

	.trusty_buttons
		button(@click="handleLogin" v-show="!pending") Log in
		button(v-show="pending") Loading....

	p._tooltip_p._text_center
		| Before continuing, make sure your device is secure #[br]

	._bottom_link(@click="$router.push({ name: 'signup' })"): span Sign up with new account

	._logo_owl
		Icon(name="trusty_owl_small_logo")

</template>

<script>
import trustyInput from '@/components/UI/form/input';
import Icon from '@/components/UI/icon';
import { validationMixin } from 'vuelidate';
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import { mapGetters, mapActions } from 'vuex';
import debounce from 'lodash/debounce';

export default {
  mixins: [validationMixin],
  components: { trustyInput, Icon },
  data() {
    return {
      pin: '',
      confirmPin: '',
      brainkey: '',
      showError: false
    };
  },
  validations: {
    pin: {
      required,
      minLength: minLength(6)
    },
    confirmPin: {
      sameAsPin: sameAs('pin')
    },
    brainkey: {
      required
    }
  },
  computed: {
    ...mapGetters({
      pending: 'account/getAccountPendingState',
      getUserId: 'account/getAccountUserId'
    })
  },
  methods: {
    ...mapActions({
      login: 'account/login',
      storeBackupDate: 'account/storeBackupDate'
    }),
    async handleLogin() {
      this.showError = false;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const result = await this.login({
          password: this.pin,
          brainkey: this.brainkey.toLowerCase()
        });
        if (result.success) {
          const date = new Date();
          this.storeBackupDate({ date, userId: this.getUserId });
          this.$router.push({ name: 'entry' });
        } else {
          this.showError = true;
        }
      }
    },
    debouncedPinInput: () => {},
    debouncedRepeatPinInput: () => {}
  },
  created() {
    this.debouncedPinInput = debounce((e) => {
      this.$v.pin.$touch();
    }, 800);
    this.debouncedRepeatPinInput = debounce((e) => {
      this.$v.confirmPin.$touch();
    }, 800);
  }
};

</script>


<style lang="scss">

@import "~@/style/mixins";

#trusty_auth {
	@include trusty_main_padding;
	&.signup {
		.trusty_buttons {
			margin-top: 4.6vw;
		}
	}

	&.login {
		.trusty_buttons {
			margin-top: 2vw;
		}
	}


	.text_area {
		margin-bottom: 2vw;
	}

	textarea {
		text-transform: lowercase;
	}
}

._logo_owl {

	text-align: center;

	span.trusty_owl_small_logo {
		 display: inline-block;
	}

	span {
		display: inline-block;
	}
	svg {
		fill: white;
	}

}

._bottom_link {
	font-family: "Gotham_Pro";
	text-align: center;
	color: white;
	span  {
		border-bottom: 1px solid white;
	}
}


._tooltip_p {
	font-family: "Gotham_Pro";
	color: white;
}

._bottom_link {
	cursor: pointer;
	text-align: center;
}


@media screen and (min-width: 769px) {

	#trusty_auth {
		&.signup {
			.trusty_buttons {
				margin-top: px_from_vw(4.6);
			}
		}
		.text_area {
			margin-bottom: px_from_vw(2);
		}
	}


	._tooltip_p {
		line-height: px_from_vw(4);
		margin-top: px_from_vw(2);
		font-size: px_from_vw(3.3);
		margin-bottom: px_from_vw(4.6);
	}

	._bottom_link {
		span {
			font-size: px_from_vw(3.3);
		}
		&._margins {
			margin-top: px_from_vw(5.8);
			margin-bottom: px_from_vw(4);
		}
	}

	._logo_owl {
		text-align: center;
		padding-top: px_from_vw(6);
		span.trusty_owl_small_logo {
			 width: px_from_vw(34);
		}
	}
}

@media screen and (max-width: 768px) {

	._tooltip_p {
		line-height: 4vw;
		margin-top: 2vw;
		font-size: 3.3vw;
		margin-bottom: 4.6vw;
	}

	._bottom_link {
		span {
			font-size: 3.3vw;
		}
		&._margins {
			margin-top: 5.8vw;
			margin-bottom: 4vw;
		}
	}

	._logo_owl {
		text-align: center;
		padding-top: 6vw;
		span.trusty_owl_small_logo {
			 width: 34vw;
		}
	}

}

</style>
