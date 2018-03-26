<template lang="pug">

#password_check

  trusty-input(
  	label="enter pin code",
  	inputType="tel",
  	v-model="password"
  	:validate="$v.password.$touch()")

  .trusty_font_error(v-if="!$v.password.required && this.$v.password.$dirty") enter PIN
  .trusty_font_error(v-if="!$v.password.minLength && this.$v.password.$dirty") PIN must be 6 characters or more

  .trusty_inline_buttons._one_button
    button(@click="checkPassword()") Check

</template>

<script>
import trustyInput from '@/components/UI/form/input';
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

export default {
  mixins: [validationMixin],
  components: { trustyInput },
  data() {
    return {
      password: ''
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    ...mapGetters({
      isValidPassword: 'account/isValidPassword'
    })
  },
  methods: {
    next() {
      this.$router.push({ name: 'backup-phrase' });
    },
    ...mapActions({
      unlockWallet: 'account/unlockWallet',
      checkCachedUserData: 'account/checkCachedUserData'
    }),
    ...mapGetters({
      isLocked: 'account/isLocked',
    }),
    async checkPassword() {
      this.$v.password.$touch();
      if (!this.$v.$invalid) {
        if (this.isValidPassword(this.password)) {
          this.unlockWallet(this.password);
          this.next();
        } else {
          this.$notify({
            group: 'auth',
            type: 'error',
            title: 'Password error',
            text: 'Please input correct password'
          });
        }
      }
    }
  },
};

</script>
