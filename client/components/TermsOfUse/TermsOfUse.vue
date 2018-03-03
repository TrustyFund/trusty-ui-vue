<template lang="pug">
.trusty_terms.main_padding
	p
		| This is a binding Agreement between Trusty&nbsp
		| (or “We”) and the person, persons, or&nbsp
		| entity (“You” or “Your”) using the service,&nbsp
		| Software, or application (“Software”)."&nbsp

	div(v-for="term in list")
		h3 {{ term.title }}
		p {{ term.text}}

</template>

<script>
import list from './list.js';

export default {
  data() {
    return {
      list
    };
  }

};
</script>

<style lang="scss">

@import "~@/style/mixins";

@media screen and (max-width: 768px) {

	.trusty_terms {
		padding: 1.1vw 4.2vw;

		p {
			font-family: "Gotham_Pro";
	    line-height: 5.2vw;
	    font-size: 4.31vw;
		}

		p::first-child {
			margin-bottom: 4.4vw;
		}

		h3 {
			font-family: "Gotham_Pro_Regular";
	    line-height: 5.4vw;
	    font-size: 4.31vw;
	    margin-top: 0;
	    margin-bottom: 0;
		}
	}
}
@media screen and (min-width: 769px) {

	.trusty_terms {
		padding: px_from_vw(1.1) px_from_vw(4.2);

		p {
			font-family: "Gotham_Pro";
	    line-height: px_from_vw(5.2);
	    font-size: px_from_vw(4.31);
		}

		p::first-child {
			margin-bottom: px_from_vw(4.4);
		}

		h3 {
			font-family: "Gotham_Pro_Regular";
	    line-height: px_from_vw(5.4);
	    font-size: px_from_vw(4.31);
	    margin-top: 0;
	    margin-bottom: 0;
		}
	}

}


</style>
