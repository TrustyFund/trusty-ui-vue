<template lang="pug">

#trusty_manage_portfolio

	.trusty_portfolio_tabs
	 
		.tabs-header-container
			.tab-link Manual
			.tab-link Index
			.tab-link.tab-link-active Mirror

		.tabs-content-container

			h5 Please select shares of assets #[br] in your portfolio
			table.managePortfolio
				thead
					tr
						th ASSET
						th SHARE
				tbody
					tr
						td 
							.portfolio_item._index
								.fake_line_height
								span BTS
								icon-component(name="trusty_portfolio_arrow_right")
						td
							.portfolio_item._index
								.fake_line_height
									a._minus.normal.portfolio_asset
										icon-component(name="trusty_minus")
									span.normal.portfolio_asset 100%
									a._plus.normal.portfolio_asset
										icon-component(name="trusty_plus")
											
			.trusty_inline_buttons
				button._one_button Suggest Portfolio
				button._one_button Update Portfolio



</template>

<script>
import iconComponent from '@/components/icon';

export default {
  components: { iconComponent },
  data() {
    return {

    };
  }

};
</script>

<style lang="scss">

#trusty_manage_portfolio {
	h5 {
		margin-top: .2rem;
			margin-bottom: .5rem;
	}

	.trusty_portfolio_tabs {
		font-family: Gotham_Pro;
			.tab-content {
				font-family: Gotham_Pro;
			}


		table { 
			-webkit-user-select: none;
			thead tr th  {
					font-family: Gotham_Pro;
					text-transform: uppercase;
				}

				tbody tr td:first-child {
					width: 50%;
					padding-left: 6vw;
					text-align: left;
					font-family: Gotham_Pro_Medium;
				.portfolio_item {
						padding-top: 5.7vw;	
				}

				.portfolio_item._0 {
						padding-top: 2.2vw;	
				}
				}

				tbody tr td:last-child {
					width: 50%;
					text-align: center;
					font-family: Gotham_Pro;
				}

				tbody tr td {
					text-align: left;
					font-family: Gotham_Pro_Regular;
				}
		}

		.portfolio_item span {
			&._green {
				color: #79c610;
			}

			&._red {
				color: #ff3030;
			}
		}

		.portfolio_asset{
			width: 66px;
			display: inline-block;
			text-align: center;
			margin: 0 1.5vw;
		}
	}
}


@import "./mobile.scss"





</style>