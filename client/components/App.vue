<template>
	<div id="app" :class="activeClass">
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
    activeClass() {
      return this.$route.name === 'landing' ? '_landing_page' : '_header_space';
    },
    ...mapGetters({
      ready: 'connection/isReady'
    })
  },
  methods: {
    ...mapActions({
      initApp: 'app/initApp',
      fetchDefaultAssets: 'assets/fetchDefaultAssets',
      fetchCurrentUser: 'account/fetchCurrentUser'
    })
  },
  watch: {
    ready(connected) {
      if (connected) {
        this.fetchDefaultAssets();
        this.fetchCurrentUser();
      }
    }
  },
  beforeMount() {
    this.initApp();
  }
};
</script>

<style lang="scss">
#app {
	position: relative;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 768px) {
		&._header_space {
			padding-top: 12vw !important;
		}
	}
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
