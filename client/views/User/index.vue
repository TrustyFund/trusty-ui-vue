<template>
  <div class="page">
    <p>
      User will be  here
    </p>
  </div>
</template>


export default {
  beforeMount(){
    this.$store.dispatch('getUser',this.$route.params.nickname);
  }
}
