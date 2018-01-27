<template>
  <div class="page">
    <input v-model="login" placeholder="Enter username">
    <router-link :to="{ name: 'user', params: { name: login }}">VIEW</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: ''
    };
  }
};
</script>
