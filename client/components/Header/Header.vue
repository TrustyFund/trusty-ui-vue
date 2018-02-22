<template lang="pug">

.trusty_header

		icon-component(
			name="trusty_fund_logo",
			v-if="isProfilePage",
			className="fund_logo",
			@click="router.push('/')")

		span._back._mob(v-if="!isProfilePage" @click='backAction')
			icon-component(name="trusty_arrow_back")

		span._options._mob(
			v-if="isProfilePage"
			@click='backAction')
			icon-component(name="trusty_options")

		.header_title(v-if="!isProfilePage") {{ headerTitle }}


</div>


</template>


<script>
import iconComponent from '@/components/UI/icon';


export default {
  components: {
    iconComponent
  },
  data() {
    return {
      titles: {
        signup: 'signup',
        login: 'login',
        deposit: 'deposit details',
        withdraw: 'withdraw',
        manage: 'manage fund',
        user: 'user page',
        profile: 'user profile',
        backup: 'compulsory backup',
        'backup-phrase': 'backup phrase',
        'backup-verify': 'verify backup',
        'backup-done': 'almost done! let\'s review',
        transactions: 'recent transactions'
      }
    };
  },
  methods: {
    backAction() {
      this.$router.go(-1);
    },
  },
  computed: {
    headerTitle() {
      return this.titles[this.$route.name];
    },
    isProfilePage() {
      return this.$route.name === 'profile';
    }
  }
};

</script>

<style lang="scss">

$header_size: 12vw;
$white_color: #e6e6e6;
$background_color: #1b1f22;

.trusty_header {
	color: white;
	width: 100%;
	flex-shrink: 0;
	position: relative;

	.header_title {
		height: 3vw;
		line-height: 3vw;
		display: block;
		text-align: center;
		font-family: Gotham_Pro_Regular;
		text-transform: uppercase;
		font-weight: bold;
		font-size: 1.8vw;
	}


	span._back {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		display: inline-block;
		width: 12vw !important;
		text-align: center;
		line-height: 3vw;
		svg {
			display: inline-block;
			height: 1.2vw;
		}
	}

	.trusty_header_logo {
		svg {
			fill: $white_color;
		}
	}

	.trusty_header_arrow {
		position: absolute;
		top: 0;
		left: 0;
		cursor: pointer;
		transform: scale(-1, 1);
		background: transparent;
		outline: none;
		border: none;
		svg {
			fill: #ffffff;
		}
	}

	.trusty_header_fake {
		width: 100%;
		.trusty_header {
			position: relative;
			z-index: 100;
			opacity: 0;
		}
	}
}

@media screen and (min-width: 769px) {

	.trusty_header {
		width: 80%;
		margin: 0 auto;
	}

	.fund_logo {
		padding: 1vw 0 0 2vw;
		width: 20vw;
		svg { fill: white; }
	}

}


@import "./mobile.scss";

</style>



