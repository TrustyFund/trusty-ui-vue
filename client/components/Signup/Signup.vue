<template lang="pug">

#trusty_auth

  .input_area 
    .left

      trusty-input(label="new account name")
        template(slot="input")
          input(v-model="name" @input="$v.name.$touch()")
      .trusty_font_error(v-if="!$v.name.required && this.$v.name.$dirty") Enter account name

      trusty-input(label="enter email")
        template(slot="input"  )
          input(v-model="email" @input="$v.email.$touch()")
      .trusty_font_error(v-if="!$v.email.required && this.$v.email.$dirty") Enter e-mail
      .trusty_font_error(v-if="!$v.email.email && this.$v.email.$dirty") Invalid e-mail
            
      trusty-input(label="password")
        template(slot="input")
          input(v-model="password" @input="$v.password.$touch()")
      .trusty_font_error(v-if="!$v.password.required && this.$v.password.$dirty") Enter password
      .trusty_font_error(v-if="!$v.password.minLength && this.$v.password.$dirty") Password must be 8 characters or more

      trusty-input(label="confirm password")
        template(slot="input")
          input(v-model="confirmPassword" @input="$v.confirmPassword.$touch()") 
      .trusty_font_error(v-if="!$v.confirmPassword.sameAsPassword") Passwords do not match

    .right
      ._logo_owl._desk
        Icon(name="trusty_owl_small_logo")

  
  p._tooltip_p._yellow
    | Write down your password, it CAN'T BE RECOVERED 

  .trusty_buttons
    button(@click="signup") Sign up

  p._tooltip_p._text_center 
    | Before continuing, make sure your device is secure

  ._bottom_link(@click="$router.push({ name: 'login' })"): span Log in with existing account

  ._bottom_link._margins: span I accept Terms of use

  ._logo_owl._mob
    Icon(name="trusty_owl_small_logo")

</template>

<script>
import trustyInput from '@/components/UI/form/input';
import Icon from '@/components/UI/icon';
import { validationMixin } from 'vuelidate';
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  components: { trustyInput, Icon },
  data() {
    return {
      name: '',
      password: '',
      confirmPassword: '',
      email: ''
    };
  },
  computed: {
    nameErrors() {

    }
  },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    },
    confirmPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    signup() {
      this.$v.$touch();
    }
  }
};

</script>

