<template lang="pug">

#trusty_auth

  .input_area
    .left

      trusty-input(label="brainkey" type="textarea")
        template(slot="input")
          textarea(v-model="brainkey" @input="$v.brainkey.$touch()")
      .trusty_font_error(v-if="!$v.brainkey.required && this.$v.brainkey.$dirty") Enter brainkey
      
      trusty-input(label="create pin code")
        template(slot="input")
          input(v-model="password" @input="$v.password.$touch()" type="tel")
      .trusty_font_error(v-if="!$v.password.required && this.$v.password.$dirty") Enter PIN
      .trusty_font_error(v-if="!$v.password.minLength && this.$v.password.$dirty") PIN must be 6 characters or more

      trusty-input(label="confirm pin")
        template(slot="input")
          input(v-model="confirmPassword" @input="$v.confirmPassword.$touch()" type="tel")
      .trusty_font_error(v-if="!$v.confirmPassword.sameAsPassword") PIN codes do not match


  p._tooltip_p
    | Please enter account brainkey once for new devices, #[br]
    | 12 words, you backed up, when account was created

  .trusty_buttons
    button(@click="handleLogin" v-show="!pending") Log in
    button(v-show="pending") Loading....

  p._tooltip_p._text_center
    | Before continuing, make sure your device is secure #[br]

  ._bottom_link(@click="$router.push({ name: 'signup' })"): span Sign up with new account

  //- ._logo_owl
  //-   Icon(name="trusty_owl_small_logo")

</template>

<script>
import trustyInput from '@/components/UI/form/input';
import Icon from '@/components/UI/icon';
import { validationMixin } from 'vuelidate';
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import { mapGetters, mapActions } from 'vuex';

export default {
  mixins: [validationMixin],
  components: { trustyInput, Icon },
  data() {
    return {
      password: '',
      confirmPassword: '',
      brainkey: ''
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      sameAsPassword: sameAs('password')
    },
    brainkey: {
      required
    }
  },
  computed: {
    ...mapGetters({
      pending: 'account/getAccountPendingState'
    })
  },
  methods: {
    ...mapActions({
      login: 'account/login'
    }),
    async handleLogin() {
      // vuelidate (check all fields)
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const result = await this.login({
          password: this.password,
          brainkey: this.brainkey
        });
        if (result.success) {
          this.$router.push({ name: 'entry' });
        } else {
          this.$notify({
            group: 'auth',
            type: 'error',
            title: 'Login error',
            text: result.error
          });
        }
      }
    }
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

	.text_area {
		margin-bottom: 2vw;
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
