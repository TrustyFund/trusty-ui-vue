<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <div class="connecting-block-screen" 
         v-if="!ready">
       <Spinner/>
     </div>
  </div>
</template>

<script>
import Header from '@/components/header/';
import Spinner from '@/components/UI/spinner.vue';
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
    ready(newVal) {
      if (newVal) this.fetchDefaultAssets();
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