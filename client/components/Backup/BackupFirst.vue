<template lang="pug">
#first
	p.trusty_help_text You need to backup account#[br] before using it
	._wrap_icon
		icon(name="account_backup_ico_safe", :initialSvgColors="true")
	._warnings
		p.trusty_big_font Are you being watched?
		p.trusty_big_font Near by windows?
		p.trusty_big_font Hidden cameras?
		p.trusty_big_font Shoulder-spies?

	._bottom_fixed.main_padding
		p.trusty_help_text._second Anyone with your backup phrase can#[br] access or spend your funds

		.trusty_inline_buttons._one_button
			button(@click="$store.dispatch('app/setModal','backup-screenshots')") Continue to backup


	.backup_modal(v-if="appModal==='backup-screenshots'")
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
      this.$router.push({ name: 'backup-phrase' });
    },
  },
  computed: {
    ...mapGetters('app', ['appModal'])
  }
};
</script>

<style lang="scss">
</style>
