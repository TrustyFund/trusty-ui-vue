<template lang="pug">
#verify

	p.trusty_help_text Let't verify your backup phrase
	.verify_area
		p.trusty_help_text
			span(@click="dropWord(index)" v-for="(word,index) in comprehendPhrase") {{ word }}
	p.trusty_help_text(v-if="phrase.length") Please tap each word in the #[br] correct order
	.random_area
		p.trusty_help_text
			span(@click="pushWord(word, index)" v-for="(word, index) in phrase") {{ word }}

	._bottom_fixed.main_padding(v-if="!phrase.length")
		p.trusty_help_text._second Is this correct?
		.trusty_inline_buttons._one_button
			button(@click="confirm") confirm
		.trusty_inline_buttons._one_button
			button(@click="clear") clear

</template>

<script>

import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      comprehendPhrase: [],
      phrase: ''
    };
  },
  computed: {
    ...mapGetters({
      sourcePhrase: ('account/getBrainkey')
    }),
    splitedPhrase() {
      return this.sourcePhrase.split(' ');
    }
  },
  mounted() {
    this.clear();
  },
  methods: {
    clear() {
      this.comprehendPhrase = [];
      this.phrase = this.shuffleBrainkey(this.splitedPhrase);
    },
    pushWord(word, index) {
      this.comprehendPhrase.push(word);
      this.phrase.splice(index, 1);
    },
    dropWord(index) {
      const word = this.comprehendPhrase.splice(index, 1);
      this.phrase.push(word[0]);
    },
    shuffleBrainkey(array) {
      for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    confirm() {
      if (this.compareArrays(this.comprehendPhrase, this.sourcePhrase.split(' '))) {
        this.$router.push({ name: 'backup-done' });
      }
    },
    compareArrays(array1, array2) {
      if (!array1 || !array2) {
        return false;
      }
      if (array1.length !== array2.length) {
        return false;
      }
      for (let i = 0; i < array1.length; i += 1) {
        if (array1[i] !== array2[i]) {
          return false;
        }
      }
      return true;
    },
  }
};
</script>

