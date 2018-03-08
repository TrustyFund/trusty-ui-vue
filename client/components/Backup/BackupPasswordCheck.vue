<template lang="pug">

#password_check

	trusty-input(label="enter password")
		template(slot="input")
			input(v-model="password")

	.trusty_inline_buttons._one_button(v-if="isLocked()")
		button(@click="unlockWallet(password)") Check

	.trusty_inline_buttons._one_button(v-else)
		button(@click="next") Go next

</template>

<script>
import trustyInput from '@/components/UI/form/input';
import { required, minLength } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    trustyInput
  },
  data() {
    return {
      password: ''
    };
  },

  methods: {
    next() {
      this.$router.push({ name: 'backup-phrase' });
    },
    ...mapActions({
      unlockWallet: 'account/unlockWallet'
    }),
    ...mapGetters({
      isLocked: 'account/isLocked'
    }),
  },
  validations: {
    password: {
      required,
      minLength: minLength(8)
    },
  },
};

</script>
