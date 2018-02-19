<template lang="pug">

#trusty_backup.main_padding

	router-view

	.modal_alert.main_padding(@click="setModal(null)", v-if="getModalName==='backup_try_again'")
		.modal_content: p.trusty_big_font TRY AGAIN

	.modal_alert.main_padding(@click="setModal(null)", v-if="getModalName==='backup_copied_password'")
		.modal_content: p.trusty_big_font Password copied#[br] to clipboard


</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('app', ['getModalName']),
  },
  methods: {
    ...mapActions('app', ['setModal'])
  },
  mounted() {
    // this.setModal('backup_try_again');
    // this.setModal('backup_copied_password');
    // this.setModal('backup-screenshots');
  }
};
</script>

<style lang="scss">
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
				svg, g, polygon{
					fill: #FFEB3B;
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
		overflow: scroll;
		span {
			cursor: pointer;
			display: inline-block;
			margin: 1.4vw;
			border: 1px dashed white;
			padding: 1.5vw 3vw;
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

	.verify_area {
		height: 28.6vh;
		margin-bottom: 5.3vw;
		border-top: 1px dashed white;
		border-bottom: 1px dashed white;
		//overflow: scroll;

	}

}


</style>
