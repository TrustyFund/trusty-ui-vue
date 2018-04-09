<template lang="pug">
#phrase
	._wrap_warnings

		p.trusty_help_text._second Please carefully#[br] write down this phrase
		p.trusty_big_font: span(v-for="word in phrase.split(' ')") {{word}}&nbsp

		._bottom_button.main_padding
			p.trusty_help_text._second We'll confirm on the next sreen
			.trusty_inline_buttons._one_button
				button(@click="$router.push({ name: 'backup-verify' });") i've written it down
			br

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      phrase: 'account/getBrainkey'
    })
  },
};

</script>

<style lang="scss">

.trusty_big_font span {
  white-space: nowrap;
}


</style>
