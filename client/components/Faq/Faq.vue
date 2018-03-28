<template lang="pug">
#trusty_coin_overview.trusty_faq

	#coin_analysis._belongings

		template(v-for="item, index in info")
			.content_area(
				:class="{_opened_article: index===opened}",
				:id="['item'+index]",
				@click="open(index)",
				:ref="'area_'+index")
				._items
					._list_item._many_lines(:class="{_none_top_border: index === 0}")
						span.text_button {{ item.title }}
						icon(name="trusty_arrow_down")

				.wrap_content.main_padding

					._grey_key_list

						template(v-if="item.list && item.firstList")

							._team_area

								template
									h3._list_title {{ item.list.title }}
									ul
										template(v-for="one in item.list.items")
											li(v-html="one")
											br

						p._text(v-html="item.text")

						template(v-if="item.list && !item.firstList")

							._team_area

								template
									h3._list_title {{ item.list.title }}
									ul
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
      setTimeout(() => {
        this.scrollTo(index);
      }, 500);
    },

    scrollTo(index) {
      const elem = this.$refs['area_' + index][0];
      const topPos = elem.offsetTop;

      /* eslint-disable */
			function easeInOutQuad(currentTime, startValue, changeInValue, duration) {
				currentTime /= duration / 2;
				if (currentTime < 1) return changeInValue / 2 * currentTime * currentTime + startValue;
				currentTime--;
				return -changeInValue / 2 * (currentTime * (currentTime - 2) - 1) + startValue;
			}
			/* eslint-disable */

			function scrollTo(element, to, duration) {
				const start = element.scrollTop;
				const change = to - start;
				let currentTime = 0;
				const increment = 20;

				const animateScroll = function () {
					currentTime += increment;
					const val = easeInOutQuad(currentTime, start, change, duration);
					element.scrollTop = val;
					if (currentTime < duration) {
						setTimeout(animateScroll, increment);
					}
				};

				animateScroll();
			}

			scrollTo(document.body.querySelector('.router_content'), topPos + 1, 300);
		}
	}
};
</script>

<style lang="scss">

@import "~@/style/mixins";

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

@media screen and (min-width: 769px) {


	#trusty_coin_overview.trusty_faq  {

		._grey_key_list {
			 > ._text:last-child {
				margin-bottom: px_from_vw(5);
			 }
		}

		._list_item._many_lines {
			padding-right: px_from_vw(15);
		}

		.trusty_arrow_down {
			top: px_from_vw(3);
		}

		li {
			font-size: px_from_vw(4.3);
		}

		._list_title {
		}

		ul {
			padding-left: px_from_vw(4.5);
		}

	}

}


</style>
