<template lang="pug">
  .withdraw-transfer-container
    TrustyInput(label="enter receiver's username")
      template(slot="input")
        input(v-model="name" @input="$v.name.$touch()")
    .trusty_font_error(v-if="!$v.name.required && this.$v.name.$dirty") Enter account name
    .trusty_font_error(v-if="!$v.name.isUnique && !this.$v.$pending && this.$v.name.$dirty") No such user

    TrustyInput(label="enter amount")
      template(slot="input")
        input(v-model="amount" @input="$v.amount.$touch()")
    .trusty_font_error(v-if="!$v.amount.required && this.$v.amount.$dirty") Enter amount
    .trusty_font_error(v-if="!$v.amount.numeric && this.$v.amount.$dirty") Enter a number

    .trusty_inline_buttons._mob._one_button(@click="sendFunds"): button SEND FUNDS
</template>

<script>
import TrustyInput from '@/components/UI/form/input';
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, numeric } from 'vuelidate/lib/validators';

export default {
  props: {
    payload: {
      type: String,
      required: true
    }
  },
  mixins: [validationMixin],
  components: {
    TrustyInput
  },
  data() {
    return {
      name: '',
      amount: 0
    };
  },
  validations: {
    name: {
      required,
      isUnique(value) {
        if (value === '') return true;
        return new Promise((resolve) => {
          this.checkUsername({ username: value }).then(result => resolve(!result));
        });
      }
    },
    amount: {
      required,
      numeric
    }
  },
  methods: {
    ...mapActions({
      checkUsername: 'account/checkIfUsernameFree'
    }),
    sendFunds() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // handle transfer here
      }
    }
  }
};

</script>
