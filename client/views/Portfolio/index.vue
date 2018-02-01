<template lang="pug">

#trusty_manage_portfolio

	.trusty_portfolio_tabs
	 
		.tabs-header-container
			.tab-link.tab-link-active Manual
			.tab-link Index
			.tab-link Mirror

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
								a._plus.normal.portfolio_asset._disable
									icon-component(name="trusty_plus")
					tr
						td 
							.portfolio_item._index
								.fake_line_height
								span BTC
								icon-component(name="trusty_portfolio_arrow_right")
						td
							.portfolio_item._index
								.fake_line_height
								a._minus.normal.portfolio_asset
									icon-component(name="trusty_minus")
								span.normal.portfolio_asset 10%
								a._plus.normal.portfolio_asset._disable
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
		font-weight: normal;
		font-style: normal;
		font-family: Gotham_Pro;
		color: white;
		text-align: center;
		margin-top: .2rem;
		font-size: 1.125rem;
	    margin-bottom: 0.5rem;
	    line-height: 1.4;
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
				color: white;
			}

			tbody tr td:first-child {
				width: 50%;
				padding-left: 6vw;
				text-align: left;
				font-family: Gotham_Pro_Medium;
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

			tr {
				padding-bottom: 0 !important;
			}
		}

		.portfolio_item span {
			color: white;
			&._green {
				color: #79c610;
			}

			&._red {
				color: #ff3030;
			}

			svg {
				fill: #9ea2a5;
			}
		}

		.portfolio_asset{
			vertical-align: middle;
			display: inline-block;
			text-align: center;
			margin: 0 1.5vw;
		}
	}
}



.tab-link {
	width: 33.33333%;
	float: left;
	text-align: center;
}

.tabs-container:after {
  content: "";
  display: table;
  clear: both;
}

.tabs-header-container{
	border-bottom: 1px solid white;
	height: 25px;
}

.tabs-content-container{
	padding-top: 15px;
}

.tab-link-active{
	border-bottom: 3px solid white;
}

.tab-link{
	height: 100%;
	text-transform: uppercase;
	color: white;
}

.managePortfolio{
	width: 100%;
}

.greater:not(a){
	font-family: "Gotham_Pro_Medium";
	color: #269c26;
	//color: #79c610;
	transform: translateY(-2px);
}

.less:not(a){
	font-family: "Gotham_Pro_Bold";
	color: #ff3030;
	//color: #ff3030;
}

.managePortfolio td{
	text-align: center;
}

.wrong-total{
	color: #ff3030;
	font-family: Gotham_Pro_Medium !important;
}

.trusty_inline_button_reverse{
	text-align: center;

	button {
		font-family: Gotham_Pro_Medium;
		display: inline-block;
		width: 70vw;
		margin: initial !important;
		background-color: Transparent;
    	background-repeat:no-repeat;
    	border: 1px solid white;
		height: 50px;
		color: white;
	}

	.disabled{
	    opacity: 0.5;
	    cursor: default;
	    pointer-events: none;
	}
}

.trusty_inline_button{
	text-align: center;

	button {
		font-family: Gotham_Pro_Medium;
		display: inline-block;
		width: 70vw;
		margin: initial !important;
		background-color: #fff !important;
		height: 50px;
		color: black;
	}

	.disabled{
	    opacity: 0.5;
	    cursor: default;
	    pointer-events: none;
	}
}

.arrowright{

	transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    border: solid white;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 5px;

}

@import "./mobile.scss"

</style>