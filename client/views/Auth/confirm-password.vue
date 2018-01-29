<template lang="pug">
.confirm_password

  trusty-input(label="password")
    template(slot="input")
      input(v-model="password" @keyup="validate")

  .trusty_font_error {{ error_length }}

  trusty-input(label="confirm password")
    template(slot="input")
      input(v-model="confirm" @keyup="validate")
  
  .trusty_font_error {{ error_match }}

	

</template>

<script>

import trustyInput from '@/components/trusty-input';

export default {
  components: { trustyInput },
  props: {
    onValid: {
      type: Function
    }
  },

  data() {
    return {
      password: '',
      confirm: '',
      error_length: '',
      error_match: '',
      valid: false,
    };
  },

  methods: {
    purgeErrors() {
      this.error_match = '';
      this.error_length = '';
    },
    validate() {
      let { password, confirm } = this;
      confirm = confirm.trim();
      password = password.trim();
      if (password.length !== 0 && password.length < 8) {
        this.error_length = 'Password must be 8 characters or more';
      } else { this.error_length = ''; }
      if (password !== '' && confirm !== '' && password !== confirm) {
        this.error_match = 'Passwords do not match';
      } else { this.error_match = ''; }
      this.valid = password.length >= 8 && password === confirm;
      if (this.valid) this.purgeErrors();
    }
  }
};
</script>

<style lang="scss">
</style>