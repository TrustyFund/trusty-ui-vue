export default {
	beforeMount(){
		let default_assets = ["BTS","OPEN.EOS"];
		this.$store.dispatch('initApis',() => this.$store.dispatch('getAssets',default_assets) );
	},
	render() {
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
