<template lang="pug">
#verify

	p.trusty_help_text Let't verify your backup phrase
	.verify_area
		p.trusty_help_text
			span(v-for="word in comprehendPhrase") {{ word }}
	p.trusty_help_text Please tap each word in the #[br] correct order
	.random_area
		p.trusty_help_text
			span(@click="pushWord(word)" v-for="(word, index) in phrase") {{ word }}

	._bottom_fixed.main_padding(v-if="false")
		p.trusty_help_text._second Is this correct?
		.trusty_inline_buttons._one_button
			button confirm
		.trusty_inline_buttons._one_button
			button clear

</template>

<script>
export default {
  computed : {
  },
  data() {
    return {
	 	 	phrase: [
	        'talk', 'divide', 'trophy', 'next',
	        'square', 'boillear', 'lift',
	        'avacado', 'stable', 'moscuto',
	        'cishion',
	      ];
	    },
      comprehendPhrase: []
    };
  },
  methods: {
    pushWord(word, index) {
      this.comprehendPhrase.push(word);
      this.phrase.splice(index,1)
    },
  }
}
</script>

<style lang="css" scoped>
</style>
