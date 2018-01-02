import './style.css'

export default {
	beforeMount(){
		this.$store.dispatch('initApis')
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
