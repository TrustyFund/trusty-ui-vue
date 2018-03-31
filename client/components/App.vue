<template>
	<div id="trusty-app" :class="activeClass">
		<Header/>
		<div class="router_content" ref="routerContent">
      <router-view></router-view>
    </div>
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
    // prevents long click context menu
    window.oncontextmenu = (event) => {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
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
}
</style>
