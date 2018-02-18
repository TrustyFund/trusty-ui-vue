<template lang="pug">

#trusty_coin_overview

  .omise_go
    icon(name="coin_head_ogo", :originalColors="true")
    span.omise_font OmiseGO
    icon(name="coin_head_omg", :originalColors="true")

  p.trusty_ps_text Overview provided by cryptocompare.com

  .coin_info
    .top_values
      section._db_left._db_bottom
        ._val $ 150.01 B
        h4 Mkt. Cap.
      section._db_right._db_left._db_bottom
        ._val Ƀ 115.77 k ($ 995.95 M)
        h4 Vol. 24H
      section._db_left
        ._val
          span $ 8,249.91
          icon(v-if="true" name="coin_head_trend_dn", :originalColors="true")
          icon(v-else name="coin_head_trend_up", :originalColors="true")
        h4 Open 24h

      section._db_right._db_left
        ._val $ 8,031.69 - $ 8,907.59
        h4 Low/High 24h
    .bottom_values

  .coin_vista.main_padding
    .trusty_inline_buttons
      button analises
      button investments

    .trusty_inline_buttons
      button prediction
      button purpose

    .trusty_inline_buttons
      button resourses
      button news

  template
    predictions

</template>

<script>
import icon from '@/components/icon';
import investment from './CoinInvestment';
import predictions from './CoinPredictions';
// import analysis from '@/CoinAnalysis';
// import Pre


export default {
  components: {
    icon, investment, predictions
  }
};
// example of need data from crypto compare
// https://cryptoqween.github.io/streamer/current/
</script>

<style lang="scss">

$color_red_value: #f42c2e;
$color_green_value: #659d1a;


.text_button {
  color: white;
  font-family: Gotham_Pro_Regular;
  height: 13vw !important;
  line-height: 12.2vw;
  font-size: 4.8vw;
  text-transform: uppercase;
}

#trusty_coin_overview {
  height: inherit;


  ._belongings {

    ._list_item:first-child {
      border-top: 1px solid white;
    }
    ._list_item {
      border-bottom: 1px solid white;
    }

    ._title {
      padding-top: 1vw;
      padding-bottom: 6vw;
      color: white;
      .omise_font {
        text-align: center;
        font-size: 6vw;
        letter-spacing: .25vw;
      }
    }
    .trusty_icon {
      float: right;
      width: 4.1vw;
      vertical-align: middle;
      margin-top: 4vw;
      margin-right: 4vw;
    }
    .text_button {
      padding-left: 4vw;
    }
  }

  .trusty_ps_text {
    margin-top: 1.7vw;
    margin-bottom: 3vw;
  }

  .top_values {

    display: flex;
    flex-wrap: wrap;

    section {
      box-sizing: border-box;
      width: 50%;
      text-align: center;
      border: 1px solid #606365;

      &._db_right {
        border-right: none;
      }
      &._db_left{
        border-left: none;
      }
      &._db_bottom{
        border-bottom: none;
      }

    }

    h4 {
      color: black;
      margin: 0;
      background: #c6c8cc;
      font-size: 4.9vw;
      font-family: Gotham_Pro;
      font-weight: initial;
    }

    ._val, ._val span {
      height: 12vw;
      line-height: 12vw;
      color: $color_green_value;
      font-size: 4.2vw;
      font-family: Gotham_Pro;

      .coin_head_trend_dn,
      .coin_head_trend_up {
        width: 5vw;
        margin: 0 1.6vw;
      }


    }

  }


  .omise_font {
    font-family: Gotham_Pro;
    font-size: 7vw;
    height: 100%;
    margin: auto 2vw;
  }

  .omise_go {
    text-align: center;
    padding-top: 1.9vw;
    span {
      display: inline-block;
      vertical-align: middle;
    }

    .coin_head_ogo {
      width: 8.6vw;
    }

    .coin_head_omg {
      padding-top: 1vw;
      width:13vw;
    }
  }

  .coin_vista {
    margin-top: 6.5vw;
  }

}

</style>
