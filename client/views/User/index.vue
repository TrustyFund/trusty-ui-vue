<template>
  <div class="page">
    <router-link to="/">back</router-link>
    <p>
      User will be  here
    </p>
  </div>
</template>

<script>
export default {
  beforeMount(){
    this.$store.dispatch('getUser',this.$route.params.nickname);
  }
}
</script>
