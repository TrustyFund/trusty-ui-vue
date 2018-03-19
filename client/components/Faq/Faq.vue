<template lang="pug">
#trusty_fag

	#coin_analysis._belongings

		.content_area

			.wrap_content.main_padding
				template(v-for="item in info")
					h3._list_title {{ item.title }}
					._grey_key_list
						p {{ item.title }}
						p(v-html="item.text")
						template(v-if="item.list")

							._team_area

								ol(v-if="item.list.type === 'numbers'")
									template(v-for="one in item.list.items")
										li(v-html="one")
										br

								ul(:class="getListClass(item.list.type)"  v-else)
									template(v-for="one in item.list.items")
										li(v-html="one")
										br

</template>

<script>
import info from './info.js';

export default {
  data() {
    return {
      info
    };
  },
  methods: {
    getListClass(type) {
      return {
        _dashed: type === 'dashed'
      };
    }
  }
};
</script>

<style lang="scss">

#trusty_fag {
	span._bordered_item {
		border-bottom: 1px solid white;
	}

	li {
		color: white;
	}


	ol {

	  counter-reset: item;
	  margin-left: 0;
	  padding-left: 0;

		li {
		  display: block;
		  margin-left: 4vw;
		}

		li::before {
		  display: inline-block;
		  content: counter(item) ") ";
		  counter-increment: item;
		  //width: 2em;
		  //margin-left: -2em;
		}

	}


	ul._dashed {
    list-style: none; /* Remove list bullets */
    padding: 0;
    margin: 0;

		li {
		    padding-left: 16px;
		}

		li:before {
	    content: "—";
	    padding-right: 8px;
	    color: white;
		}

	}


}


</style>
