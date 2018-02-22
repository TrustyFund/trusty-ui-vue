<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <div class="connecting-block-screen" 
         v-if="!ready">
       <Spinner/>
     </div>
     <notifications group="auth" width="100%" position="bottom center"/>
  </div>
</template>

<script>
import Header from '@/components/Header/Header';
import Spinner from '@/components/UI/Spinner';
import { mapGetters, mapActions } from 'vuex';
import '../style/index.scss';

export default {
  name: 'app',
  components: {
    Header, Spinner
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      ready: 'connection/isReady'
    })
  },
  methods: {
    ...mapActions({
      initConnection: 'connection/initConnection',
      fetchDefaultAssets: 'assets/fetchDefaultAssets'
    })
  },
  watch: {
    ready(connected) {
      if (connected) this.fetchDefaultAssets();
    }
  },
  beforeMount() {
    this.initConnection();
  }
};
</script>

<style lang="scss">
  #app {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .connecting-block-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(30, 34, 37, 0.7);
  }
</style>