<template lang="pug">

#trusty_backup.main_padding

	router-view(@doneBackup="handleExit")

	.modal_alert.main_padding(@click="setModal(null)", v-if="getModalName==='backup_try_again'")
		.modal_content: p.trusty_big_font TRY AGAIN

	.modal_alert.main_padding(@click="setModal(null)", v-if="getModalName==='backup_copied_password'")
		.modal_content: p.trusty_big_font Password copied#[br] to clipboard


</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      prevAddress: ''
    };
  },
  computed: {
    ...mapGetters('app', ['getModalName']),
  },
  methods: {
    ...mapActions('app', ['setModal']),
    ...mapActions({
      lockWallet: 'account/lockWallet'
    }),
    // this.$router.go(-1);
    handleExit() {
      this.$router.push({ name: this.prevAddress });
    }
  },
  mounted() {
    this.lockWallet();
    // this.setModal('backup_try_again');
    // this.setModal('backup_copied_password');
    // this.setModal('backup-screenshots');
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevAddress = to.query.redirect;
    });
  }
};
</script>

<style lang="scss">

@import "~@/style/mixins";

$dark_grey: #1f2325;
$light_grey: #6d6e70;

.modal_wrap {
	position: fixed;
	top: 0;
	left: 0;
	bottom:0;
	right: 0;
	z-index: 999;
	background: rgba(0,0,0,0.74);
	@media screen and (min-width: 769px) {
		background: #1e2225;
	}
	.modal_content {
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
}


.modal_alert {

	position: fixed;
	top: 0;
	left: 0;
	bottom:0;
	right: 0;
	z-index: 99;

	.modal_content {
		background: black !important;
		color: white;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		padding-top: 12vw !important;
		padding-bottom: 12vw;

	}

}


#trusty_backup {

	position: relative;
	height: inherit;

	#done {
		.tick_container {
			display: flex;
			._tick {
				width: 10%;
				padding-top: 2vw;

				._disabled_tick {
					svg, g, polygon, path{
						fill: white;
					}
					polygon {
						display: none;
					}
				}

			}
			._info {
				width: 90%;
			}
		}

		p.trusty_help_text {
			text-align: left;
			margin-top: 1vw;
			margin-left: 4vw;
			margin-bottom: 4vw;
		}

	}

	#phrase {
		> p:first-child {
			margin: 42vw 0 7.5vw 0;
		}
		.trusty_big_font span {
			display: inline-block;
		}
	}

	#verify {

		> p:first-child {
			margin: .95vw 0 6vw 0;
		}

		> p  {
			margin: 1vw 0 1vw 0;
		}
	}



	.trusty_inline_buttons {
		margin-bottom: 0;
	}
	.modal_content {
		background: $dark_grey;
		padding-top: 4vw;
	}

	._wrap_p {
		padding-bottom: 2vw;
		background: $light_grey;

		& + .trusty_inline_buttons {
			background: white;
			button { color: black; }
		}
	}


	p._title {

		line-height: 11.2vw;
		font-size: 4.8vw;
		text-transform: uppercase;
		text-align: center;
		font-family: Gotham_Pro_Medium;
		margin: 0;
		color: black;
	}

	._camera_icon {
		text-align: center;
		margin-bottom: 4vw;

		span {
			width: 21vw;
		}
	}


	._warnings p {
		line-height: 8.6vw;
		letter-spacing: .05vw;
	}

	p._second{
		margin-bottom: 2.2vw;
	}


	._wrap_icon {
		text-align: center;
		span {
			width:41.9vw;

			margin: 19.2vw 0 5vw 0;
		}
	}

	._bottom_fixed {
		._one_button { margin-bottom: 4vw;}
	}

	.verify_area {
		min-height: 28.6vh;
		max-height: 52.6vh;
		margin-bottom: 5.3vw;
		overflow: scroll;
		span {
			cursor: pointer;
			display: inline-block;
			margin: 1.4vw;
			border: 1px dashed white;
			padding: 1.5vw 3vw;
		}
		p {
			margin-bottom:1.2vw;
		}
	}

	.random_area {

		.trusty_help_text {
			margin: auto;
		}

		span {
			cursor: pointer;
			display: inline-block;
			margin: 1.4vw;
			border: 1px solid white;
			padding: 1.5vw 3vw;
		}
	}

	@media screen and (min-width: 769px) {

		#done {
			.tick_container {
				._tick {
					width: 10%;
					padding-top: px_from_vw(2);
				}
				._info {
					width: 90%;
				}
			}

			p.trusty_help_text {
				margin-top: px_from_vw(1);
				margin-left: px_from_vw(4);
				margin-bottom: px_from_vw(4);
			}

		}

		#phrase {
			> p:first-child {
				margin: px_from_vw(42) 0 px_from_vw(7.5) 0;
			}
		}

		#verify {

			> p:first-child {
				margin: px_from_vw(.95) 0 px_from_vw(6) 0;
			}

			> p  {
				margin:px_from_vw(1) 0 px_from_vw(1) 0;
			}
		}

		.modal_content {
			padding-top: px_from_vw(4);
		}

		._wrap_p {
			padding-bottom: px_from_vw(2);
		}


		p._title {
			line-height: px_from_vw(11.2);
			font-size: px_from_vw(4.8);
		}

		._camera_icon {
			margin-bottom: px_from_vw(4);
			span {
				width: px_from_vw(21);
			}
		}


		._warnings p {
			line-height: px_from_vw(8.6);
			letter-spacing: px_from_vw(.05);
		}

		p._second{
			margin-bottom: px_from_vw(2.2);
		}


		._wrap_icon {
			span {
				width:px_from_vw(41.9);

				margin: px_from_vw(19.2) 0 px_from_vw(5) 0;
			}
		}

		._bottom_fixed {
			._one_button { margin-bottom: px_from_vw(4);}
		}

		.verify_area {
			span {
				margin: px_from_vw(1.4);
				padding: px_from_vw(1.5) px_from_vw(3);
			}
		}

		.random_area {

			span:hover {
				color: black;
				background: white;
			}

			span {
				margin: px_from_vw(1.4);
				padding: px_from_vw(1.5) px_from_vw(3);
			}
		}

		.verify_area {
			min-height: 28.6vh;
			max-height: 52.6vh;
			margin-bottom: px_from_vw(5.3);

		}


	}

}


</style>
