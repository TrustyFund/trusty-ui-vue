<template lang="pug">
#phrase
	p.trusty_help_text._second Please carefully#[br] write down this phrase
	p.trusty_big_font: span(v-for="word in phrase") {{ `${word} `}}

	._bottom_fixed.main_padding
		p.trusty_help_text._second We'll confirm on the next sreen
		.trusty_inline_buttons._one_button
			button i've written it down

</template>

<script>
export default {
  props: ['phrase']
};
</script>

