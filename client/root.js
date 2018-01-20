/* eslint-disable */

export default {
  beforeMount(){
    this.$store.dispatch('initApis',() => this.$store.dispatch('fetchDefaultAssets') );
  },
  render() {
    // eslint-disable-next-line
    let app = (this.connected) ? (<router-view></router-view>) : (<h4>Connecting</h4>);
    return (
      <div id="app">
        {app}
      </div>
    )
  },
  computed: {
    connected(){
      return this.$store.state.apis.connected;
    }
  }
}