<template>
  <div class="page">
    <input v-model="password" placeholder="Enter password"/>
    <button type="button"  v-on:click="unlockWallet(password)" style="background-color:#FFFFFF">
    CHeck pass</button>
    </p>
    <button type="button" v-on:click="next" style="background-color:#FFFFFF" v-if="!isLocked()">Go next</button>
  </div>

</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

export default {
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
