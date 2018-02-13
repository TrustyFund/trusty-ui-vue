import './style/index.scss';
import Header from './components/header/';

export default {
  components: { Header },
  beforeMount() {
    this.$store.dispatch('initApis', () => {
      return this.$store.dispatch('assets/fetchDefaultAssets');
    });
  },
  render() {
    // eslint-disable-next-line
    let app = (this.connected) || true ? (<router-view></router-view>) : (<h4>Connecting</h4>);
    return (
      <div id="app">
        <Header />
        { app }
      </div>
    );
  },
  computed: {
    connected() {
      return this.$store.state.apis.connected;
    }
  }
};
