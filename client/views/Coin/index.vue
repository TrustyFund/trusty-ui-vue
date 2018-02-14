<template lang="pug">

#trusty_coin_overview
  .omise_go
    span
    span OmiseGO
    span

  p.trusty_ps_text Overview provided by coincheckup.com

  .coin_info
    .top_values
      section._db_left._db_bottom
        ._val $ 150.01 B
        h4 Mkt. Cap.
      section._db_right._db_left._db_bottom
        ._val Ƀ 115.77 k ($ 995.95 M)
        h4 Vol. 24H
      section._db_left
        ._val $ 8,249.91
        h4 Open 24h
      section._db_right._db_left
        ._val $ 8,031.69 - $ 8,907.59
        h4 Low/High 24h
    .bottom_values

</template>

<script>
  // example of need data from crypto compare
  // https://cryptoqween.github.io/streamer/current/
</script>

<style lang="scss">

$color_red_value: #f42c2e;
$color_green_value: #659d1a;


#trusty_coin_overview {

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
      background: #959ba2;
      font-size: 4.9vw;
      font-family: Gotham_Pro;
      font-weight: initial;
    }

    ._val {
      color: $color_green_value;
      margin: 2vw;
      font-size: 4.2vw;
      font-family: Gotham_Pro;
    }

  }

}

</style>
