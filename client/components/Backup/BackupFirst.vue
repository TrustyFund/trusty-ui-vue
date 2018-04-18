<template lang="pug">
#first
	._wrap_warnings
		p.trusty_help_text You need to backup account#[br] before using it
		._wrap_icon
			icon(name="account_backup_ico_safe", :initialSvgColors="true")
		._warnings
			p.trusty_big_font Are you being watched?
			p.trusty_big_font Near by windows?
			p.trusty_big_font Hidden cameras?
			p.trusty_big_font Shoulder-spies?

		._bottom_button.main_padding
			p.trusty_help_text._second Anyone with your backup phrase can#[br] access or spend your funds
			.trusty_inline_buttons._one_button
				button(@click="$store.dispatch('app/setModal','backup-screenshots')") Continue to backup


	.backup_modal(v-if="getModalName==='backup-screenshots'")
		.modal_wrap.main_padding
			.modal_content
				._camera_icon
					icon(name="account_backup_ico_photo", :initialSvgColors="true")
				._wrap_p
					p._title screenshots are not secure

					p.trusty_help_text
						| Never make a digital copy of your#[br]
						| backup phrase and never upload it#[br]
						| online. You can make a save backup#[br]
						| only with physical paper and pen
				.trusty_inline_buttons._one_button
					button(@click="next") I understand

</template>

<script>
import icon from '@/components/UI/icon';
import { mapGetters } from 'vuex';

export default {
  components: { icon },
  methods: {
    next() {
      this.$store.dispatch('app/setModal', null);
      this.$router.push({ name: 'backup-password' });
    },
  },
  computed: {
    ...mapGetters('app', ['getModalName'])
  }
};
</script>

<style lang="scss">

._wrap_warnings {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: inherit;
}

#first, #phrase {
	height: inherit;
	box-sizing: border-box;
}


@media screen and (max-width: 768px) {
	#first, #phrase {
		padding-bottom: 3.6vw;
	}

	#first {
		height: inherit;
	}

	._wrap_warnings {

		padding-top: 5vw;

		span, div {
			margin: 0 !important;
			padding: 0 !important;
		}
	  .trusty_big_font {
			line-height: initial;
			padding-bottom: 1vw;
	  }
	  .account_backup_ico_safe {
		  width:23.2vh !important;
	  }

	  .trusty_help_text {
			margin: 1vh 0;
	  }

	  ._bottom_button {
			position: relative;
			bottom: 1vw;
	  }

	}
}

.backup_modal {
	.trusty_help_text {
		margin-top: 1.3vw;
	}
	.trusty_inline_buttons {
		padding-top: 0 !important;
	}
}
</style>
