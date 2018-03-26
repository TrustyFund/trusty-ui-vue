<template lang="pug">
#trusty_coin_overview.trusty_faq

	#coin_analysis._belongings

		template(v-for="item, index in info")
			.content_area(
				:class="{_opened_article: opened===index }",
				:id="['item'+index]",
				@click="open(index)",
				:ref="'area_'+index")
				._items
					._list_item._many_lines(:class="{_none_top_border: index === 0}")
						span.text_button {{ item.title }}
						icon(name="trusty_arrow_down")

				.wrap_content.main_padding

					._grey_key_list
						p._text(v-html="item.text")

						template(v-if="item.list")

							._team_area

								template
									h3._list_title {{ item.list.title }}
									ul
										template(v-for="one in item.list.items")
											li(v-html="one")
											br

</template>

<script>
import SmoothScroll from 'smooth-scroll';
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
      smoothScroll: new SmoothScroll(),
    };
  },
  methods: {
    open(index) {
      this.opened = this.opened === index ? null : index;
      setTimeout(() => {
      	this.smoothScroll.animateScroll(this.$refs['area_' + index][0]);
      }, 300);
    },
  }
};
</script>

<style lang="scss">

#trusty_coin_overview.trusty_faq  {

	._grey_key_list {
		 > ._text:last-child {
		 	margin-bottom: 5vw;
		 }
	}

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


	li {
		color: white;
		font-size: 4.3vw;
	}

	._list_title {
		text-align: left;
	}

	ul {
		padding-left: 4.5vw;
		margin-bottom: 0;
	}

}


</style>
