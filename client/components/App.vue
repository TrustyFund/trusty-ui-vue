<template>
	<div id="app" :class="activeClass">
		<Header/>
		<div class="router_content"><router-view></router-view></div>
		<div class="connecting-block-screen"
				 v-if="!ready && !isLanding">
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
      return this.isLanding ? '_landing_page' : '';
    },
    isLanding() {
      return this.$route.name === 'entry' && !this.userId;
    },
    ...mapGetters({
      ready: 'connection/isReady',
      userId: 'account/getAccountUserId'
    })
  },
  methods: {
    ...mapActions({
      initApp: 'app/initApp'
    })
  },
  beforeMount() {
    // retrieve cached user data & connect to bitsharesjs-ws
    this.initApp();
  }
};
</script>

<style lang="scss">
#app {
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	@media screen and (max-width: 768px) {
		&._header_space {
			padding-top: 12vw !important;
		}
	}

	.router_content {
		height: 100%;
		position: relative;
		overflow-y: scroll;
		overflow-x: hidden;
	}
}

.connecting-block-screen {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(30, 34, 37, 0.7);
  z-index: 100;
}

</style>
