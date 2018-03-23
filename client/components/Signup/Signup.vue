<template lang="pug">

#trusty_auth.signup

  .input_area
    .left

      trusty-input(label="new account name")
        template(slot="input")
          input(v-model="name" @input="$v.name.$touch()")
      .trusty_font_error(v-if="!$v.name.required && this.$v.name.$dirty") Enter account name
      .trusty_font_error(v-if="!$v.name.isUnique && !this.$v.$pending && this.$v.name.$dirty") Account name already taken

      trusty-input(label="enter email")
        template(slot="input"  )
          input(v-model="email" @input="$v.email.$touch()")
      .trusty_font_error(v-if="!$v.email.required && this.$v.email.$dirty") Enter e-mail
      .trusty_font_error(v-if="!$v.email.email && this.$v.email.$dirty") Invalid e-mail

      trusty-input(label="enter pin code")
        template(slot="input")
          input(v-model="password" @input="$v.password.$touch()" type="tel")
      .trusty_font_error(v-if="!$v.password.required && this.$v.password.$dirty") Enter PIN
      .trusty_font_error(v-if="!$v.password.minLength && this.$v.password.$dirty") PIN must be 6 characters or more

      trusty-input(label="confirm pin")
        template(slot="input")
          input(v-model="confirmPassword" @input="$v.confirmPassword.$touch()" type="tel")
      .trusty_font_error(v-if="!$v.confirmPassword.sameAsPassword") PINS do not match

  .trusty_buttons
    button(@click="handleSignUp" v-show="!pending") Sign up
    button(v-show="pending") loading....

  p._tooltip_p._text_center
    | Before continuing, make sure your device is secure

  ._bottom_link(@click="$router.push({ name: 'login' })"): span Log in with existing account

  ._bottom_link._margins: span(@click="$router.push({name:'terms-of-use'})") I accept Terms of use

  ._logo_owl
    Icon(name="trusty_owl_small_logo")

</template>

<script>
import trustyInput from '@/components/UI/form/input';
import Icon from '@/components/UI/icon';
import { validationMixin } from 'vuelidate';
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import dictionary from '../../../vuex-bitshares/test/brainkey_dictionary.js';

export default {
  mixins: [validationMixin],
  components: { trustyInput, Icon },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  validations: {
    name: {
      required,
      isUnique(value) {
        if (value === '') return true;
        return this.checkUsername({ username: value });
      }
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      sameAsPassword: sameAs('password')
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
    async handleSignUp() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log(this.name, this.email, this.password);
        const result = await this.signup({
          name: this.name,
          email: this.email,
          password: this.password,
          dictionary: dictionary.en
        });
        if (result.success) {
          this.$router.push({ name: 'entry' });
        } else {
          this.$notify({
            type: 'error',
            title: 'Account creation error',
            text: result.error
          });
          console.log(result.error);
        }
      }
    }
  }
};

</script>



