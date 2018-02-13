<template lang="pug">
#first
	p.trusty_help_text You need to backup account#[br] before using it
	._wrap_icon
		icon(name="save_backup")
	._warnings
		p.trusty_big_font Are you being watched?
		p.trusty_big_font Near by windows?
		p.trusty_big_font Hidden cameras?
		p.trusty_big_font Shoulder-spies?

	._bottom_fixed.main_padding
		p.trusty_help_text._second Anyone with your backup phrase can#[br] access or spend your funds

		.trusty_inline_buttons._one_button
			button Continue to backup


	.backup_modal(v-if="appModal==='backup-screenshots'")
		.modal_wrap.main_padding
			.modal_content
				._camera_icon
					icon(name="nophoto_backup")
				._wrap_p
					p._title screenshots are not secure

					p.trusty_help_text
						| Never make a digital copy of your#[br]
						| backup phrase and never upload it#[br]
						| online. You can make a save backup#[br]
						| only with physical paper and pen
				.trusty_inline_buttons._one_button
					button(@click="setModal(null)") I understand

</template>

<script>
import icon from '@/components/icon';
import { mapGetters, mapActions } from 'vuex';

export default {

  components: { icon },
  computed: {
    ...mapGetters('app', ['appModal']),
  },
  methods: {
    ...mapActions('app', ['setModal'])
  }
};
</script>

<style lang="scss">
</style>
