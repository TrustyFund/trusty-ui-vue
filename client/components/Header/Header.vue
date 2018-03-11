<template lang="pug">

.trusty_header(v-if="!isHidden")

		icon-component(
			name="trusty_fund_logo",
			v-if="isProfilePage",
			className="fund_logo",
			@click="router.push('/')")

		span._back(v-if="!isProfilePage" @click='backAction')
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
        transactions: 'recent transactions',
        coin: 'coin overview',
        'manage-approve': 'update portfolio',
        'terms-of-use': 'terms of use'

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
      if (this.$route.name === 'coin') {
        return `${this.$route.params.name}`;
      }
      return this.titles[this.$route.name];
    },
    isProfilePage() {
      return this.$route.name === 'profile';
    },
    isHidden() {
      return this.$route.name === 'landing';
    }
  }
};

</script>

<style lang="scss">

@import "~@/style/mixins";

$header_size: 12vw;
$header_desk_size: 12;
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
		cursor: pointer;
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

}

@import "./mobile.scss";

@media screen and (min-width: 769px) {

	.trusty_header {

		height: px_from_vw($header_desk_size);

		.trusty_header_logo {
			line-height: px_from_vw(14);
			width: px_from_vw(57);
			height: px_from_vw(12);
			padding-left:px_from_vw( 4);
		}

		.fund_logo {
			position: absolute;
			top: px_from_vw(3.1);
			left: 0;
			width:px_from_vw(53);
			padding-left: px_from_vw(3.6);
			svg { fill: white; }
		}

		.header_title {
			line-height: px_from_vw($header_desk_size);
			font-size: px_from_vw(4.8);
		}

		span._back {
			top:0;
			left:0;
			width: px_from_vw(12);
			line-height: px_from_vw(15);
			svg {
				height: px_from_vw(5.7);
			}
		}

		.trusty_options {
			svg {
				display: inline-block;
				width: 51%;
			}
		}

		span._options {

			padding-top: px_from_vw(3.1);
			padding-right: px_from_vw(.7);
			text-align: center;
			position: absolute;
			top:0;
			right:0;
			display: inline-block;
			width: px_from_vw(12);
			height: px_from_vw(12);
		}
	}

	.trusty_arrow_back {
		position: absolute;
		width: px_from_vw(12);
		height: px_from_vw(12);
		line-height: px_from_vw(13.5);
		top: px_from_vw(.4);
		left: px_from_vw(-.2);
		text-align: center;
		svg {
			display: inline-block;
			height: 45%;
		}
	}

}

</style>



