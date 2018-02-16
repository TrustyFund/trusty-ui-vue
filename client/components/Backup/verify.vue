<template lang="pug">
#verify

	p.trusty_help_text Let't verify your backup phrase
	.verify_area
		p.trusty_help_text
			span(v-for="word in comprehendPhrase") {{ word }}
	p.trusty_help_text(v-if="phrase.length") Please tap each word in the #[br] correct order
	.random_area
		p.trusty_help_text
			span(@click="pushWord(word)" v-for="(word, index) in phrase") {{ word }}

	._bottom_fixed.main_padding(v-if="!phrase.length")
		p.trusty_help_text._second Is this correct?
		.trusty_inline_buttons._one_button
			button confirm
		.trusty_inline_buttons._one_button
			button(@click="clear") clear

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
      ],
      comprehendPhrase: []
    };
  },
  methods: {
    pushWord(word, index) {
      this.comprehendPhrase.push(word);
      this.phrase.splice(index, 1);
    },
  }
};
</script>

