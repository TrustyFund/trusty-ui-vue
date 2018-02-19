<template lang="pug">
  
#trusty_profile
  
  .useful_wrap

    .trusty_inline_buttons._mob
      button DEPOSIT
      button WITHDRAW

    .trusty_total_funds
      p account name
      h3._text_center: span 4$
    
    ._wrap_desk_buttons._desk
      .trusty_inline_buttons
        button DEPOSIT
        button WITHDRAW
      .trusty_inline_buttons._one_button: button MANAGE FUND

    .trusty_inline_buttons._mob._one_button: button MANAGE FUND

  
  .table_wrap
    Portfolio( 
      v-if="userBalances"
      base-id="1.3.0"
      fiat-id="1.3.121"
     :days="7")

</template>

<script>
import Portfolio from '@/components/Portfolio/Portfolio';

export default {
  data() {
    return {
      username: '',
      userBalances: false
    };
  },
  components: {
    Portfolio
  }
};
</script>

<style lang="scss">

@import "~@/style/mixins";

#trusty_profile {
  @include trusty_main_padding;
  @media screen and (min-width: 768px) {
    max-width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row-reverse;
    > div {
      flex: 1;
    }
  }
  .table_wrap {
    width: 100%;
  }
  .trusty_total_funds {
    margin-top: 1.3vw;
    margin-bottom: 1.2vw;
    p {
      font-family: 'Gotham_Pro_Regular';
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 0; 
    }
    h3 {
      font-family: 'Gotham_Pro_Medium';
      margin-top: 0;
      margin-bottom: 0;
      line-height: initial;
    }
  }
}


@media screen and (max-width: 768px){
  #trusty_profile .trusty_total_funds {
    margin-top: 4.3vw;
    margin-bottom: 5.2vw;
    h3 { font-size: 13.4vw; }
    .trusty_profile_info { padding: 0 3.6vw; }
    p { font-size: 4.2vw; }
  }
}

@media screen and (min-width: 769px) {

  #trusty_profile {
    ._wrap_desk_buttons, .trusty_table {
      width: 80%;
      margin: 0 auto;
    }

    .trusty_table {
      margin-top: 1vw;
    }

  }
}

  


</style>
