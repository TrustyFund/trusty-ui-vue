<template>
	<div id="trusty-app" :class="activeClass">
		<div class="router_content" ref="routerContent">
      <router-view></router-view>
    </div>
    <Header/>
		<div class="connecting-block-screen"
				 v-if="!ready && !isLanding">
			 <Spinner/>
		</div>
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
      return this.isLanding ? '_landing_page' : 'app';
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
  },
  watch: {
    $route() {
      this.$refs.routerContent.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss">
#trusty-app {
	position: relative;
	display: flex;
	flex-direction: column;
}


.router_content {
	box-sizing: border-box;
	height: calc(100vh - 12vw - 44px);
  padding-top: 12vw;
  margin-bottom: -12vw;
}

.connecting-block-screen {
	z-index: 10000;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(30, 34, 37, 0.7);
}

.notie-container {
  font-family: "Gotham_Pro_Regular";
  text-transform: uppercase;
  &.notie-background-error {
    background-color: rgba(128, 29, 32, 0.95);
  }
  &.notie-background-success {
    background-color: rgba(26, 74, 16, 0.95);
  }
  &.notie-background-warning {
    background-color: rgba(130, 106, 29, 0.95);
  }
  &.notie-background-info {
    background-color: rgba(28, 57, 130, 0.95);
  }
}
</style>
