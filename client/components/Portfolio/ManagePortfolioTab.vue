<template lang="pug">
#asset_tab
	h5 Please select shares of assets #[br] in your portfolio
	
	table.managePortfolio
		thead
			
			tr
				th ASSET
				th SHARE
		tbody

			tr(v-for="item in portfolio")
				td 
					.portfolio_item._index
						.fake_line_height
						span {{ item.asset }}
						icon-component(name="trusty_portfolio_arrow_right")
				td
					.portfolio_item._index
						.fake_line_height
						a._minus.normal.portfolio_asset
							icon-component(name="trusty_minus")
						span.normal.portfolio_asset {{ item.percentage + "%"}}
						a._plus.normal.portfolio_asset._disable
							icon-component(name="trusty_plus")

	.wrap.main_padding
		.trusty_inline_buttons._one_button
			button Suggest Portfolio

		.trusty_inline_buttons._one_button
			button Update Portfolio

</template>

<script>

import iconComponent from '@/components/UI/icon';

export default {
  components: { iconComponent },
  data() {
    return {
      portfolio: [
        {
          asset: 'BTS',
          percentage: 90
        },
        {
          asset: 'DASH',
          percentage: 10
        }
      ]
    };
  }
};
</script>

<style lang="scss">
</style>