<template lang="pug">
  .withdraw-transfer-container
    TrustyInput(label="enter receiver's address")
      template(slot="input")
        input(v-model="name" @input="$v.name.$touch()")
    .trusty_font_error(v-if="!$v.name.required && this.$v.name.$dirty") Enter account name
    .trusty_font_error(v-if="!$v.name.isUnique && !this.$v.$pending && this.$v.name.$dirty") No such user
    .trusty_font_error(v-if="!$v.name.notSelf && this.$v.name.$dirty") Can't send to yourself
    ._yellow.trusty_ps_text
      | IMPORTANT: Please send {{ getAssetById(payload.selectedcoin).symbol }} only to 
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
    payload: {
      type: Object,
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
          this.checkUsername({ username: value }).then(result => resolve(!result));
        });
      },
      notSelf(value) {
        return value !== this.userName;
      }
    }
  },
  computed: {
    ...mapGetters({
      userName: 'account/getCurrentUserName',
      getAssetById: 'assets/getAssetById'
    }),
    enableButton() {
      return !this.$v.$invalid && this.payload.amount
    }
  },
  methods: {
    ...mapActions({
      checkUsername: 'account/checkIfUsernameFree',
      setTransaction: 'transactions/setPendingTransfer'
    }),
    sendFunds() {
      this.$v.$touch();
      if (!this.$v.$invalid && this.payload.amount) {
        const transaction = {
          assetId: this.payload.selectedcoin,
          amount: this.payload.amount,
          to: this.name
        };
        this.setTransaction({ transaction });
        this.$router.push({ name: 'confirm-transactions' });
      }
    }
  }
};

</script>

<style>
button._disable {
  pointer-events: none;
  opacity: 0.5;
}
</style>