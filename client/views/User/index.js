export default {
  beforeMount(){
    this.$store.dispatch('getUser',this.$route.params.nickname);
  },
  render(h) {
    return (
      <div class="page">
        <p>
          User will be  here
        </p>
      </div>
    )
  }
}
