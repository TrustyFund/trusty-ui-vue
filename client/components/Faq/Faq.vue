<template lang="pug">
#trusty_coin_overview.trusty_faq

	#coin_analysis._belongings

		template(v-for="item, index in info")
			.content_area(:class="{_opened_article: opened===index}", @click="open(index)")
				._items
					._list_item._many_lines(:class="{_none_top_border: index === 0}")
						span.text_button {{ item.title }}
						icon(name="trusty_arrow_down")

				.wrap_content.main_padding

					._grey_key_list
						p._text(v-html="item.text")

						template(v-if="item.list")

							._team_area

								template(v-if="item.list.type === 'numbers'")
									h3._list_title {{ item.list.title }}
									ol
										template(v-for="one in item.list.items")
											li(v-html="one")
											br

								template(v-else)
									h3._list_title {{ item.list.title }}
									ul(:class="getListClass(item.list.type)"  )
										template(v-for="one in item.list.items")
											li(v-html="one")
											br

</template>

<script>
import icon from '@/components/UI/icon';
import info from './info.js';

export default {
  components: {
    icon,
  },
  data() {
    return {
      info,
      opened: null,
    };
  },
  methods: {
    open(index) {
      this.opened = this.opened === index ? null : index;
    },
    getListClass(type) {
      return {
        _dashed: type === 'dashed'
      };
    }
  }
};
</script>

<style lang="scss">

#trusty_coin_overview.trusty_faq  {

	._list_item._many_lines {
		position: relative;
		padding-right: 15vw;
	}

	.trusty_arrow_down {
		position: absolute;
		top: 3vw;
		right: 0;
	}

	._list_item {
		border-bottom: none;
	}

	._list_item._none_top_border {
		border-top: none;
	}

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
		list-style: none;
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
