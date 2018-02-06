import './style/index.scss';
import Header from './components/header/';
import config from '../config.js';

export default {
  components: { Header },
  beforeMount() {
    this.$store.dispatch('initApis', () => {
      return this.$store.dispatch('fetchDefaultAssets');
    });
  },
  render() {
    // eslint-disable-next-line
    let app = (this.connected) || config.html ? (<router-view></router-view>) : (<h4>Connecting</h4>);
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
