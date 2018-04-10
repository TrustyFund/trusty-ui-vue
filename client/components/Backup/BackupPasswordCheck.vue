<template lang="pug">

#password_check

	trusty-input(
		label="enter pin code",
		inputType="tel",
		v-model="password")

	.trusty_inline_buttons._one_button
		button(@click="checkPassword()") Check

</template>

<script>
import trustyInput from '@/components/UI/form/input';
import { validationMixin } from 'vuelidate';
import { mapActions, mapGetters } from 'vuex';

export default {
  mixins: [validationMixin],
  components: { trustyInput },
  data() {
    return {
      password: ''
    };
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
      if (this.isValidPassword(this.password)) {
        this.unlockWallet(this.password);
        this.next();
      } else {
        this.$toast.error('Please input correct password');
      }
    }
  },
};

</script>
