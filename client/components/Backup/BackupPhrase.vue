<template lang="pug">
#phrase
	p.trusty_help_text._second Please carefully#[br] write down this phrase
	p.trusty_big_font: span(v-for="word in phrase") {{ word }}

	._bottom_fixed.main_padding
		p.trusty_help_text._second We'll confirm on the next sreen
		.trusty_inline_buttons._one_button
			button(@click="$router.push({ name: 'backup-verify' });") i've written it down

</template>

<script>
export default {
  data() {
    return {
      phrase: [
        'talk', 'divide', 'trophy', 'next',
        'square', 'boillear', 'lift',
        'avacado', 'stable', 'moscuto',
        'cishion',
      ]
    };
  }
};

</script>

