<template lang="pug">

#trusty_transfer

  ._turnover_inputs

    trusty-input(label="send any sum")
      template(slot="input")
        input
      template(slot="right")
        icon-component(name="trusty_arrow_down")
        span.fake_option_width
        select(v-model="coin")
          option(v-for="i in ['BTC','DASH','ETH','USD','RUB']") {{ i }}

    trusty-input(:isOpen="true", label="payment method" className="select_input")
      template(slot="input")
        input(:style="{display:'none'}")
        select(v-model="service")
          option(v-for="option in ['blocktrades','openledger']", :value="option") {{ option }}

    trusty-input(v-if="!isDeposit" label="enter receiving address")
      template(slot="input")
        input

  ._turnover_service

    blocktrades(v-if="service==='blocktrades'", :deposit="isDeposit", accountName="anlopan364test2")
    openledger(v-if="service==='openledger'", :deposit="isDeposit", accountName="anlopan364test2")

    //-trusty-service(v-if="~coin.search(/USD|RUB/ig)")

  template(v-if="!isDeposit")
    ._turnover_info
      .trusty_help_text._yellow
        | Please enter a valid {{ coin }} address
      .trusty_inline_buttons._one_button: button Paste Address
      .trusty_inline_buttons
        button Confirm
        button Cancel
      p.trusty_ps_text
        | Payment gateway service is provided by #[br]
        | Openledger.io at 0% fee

  template(v-else)
    ._turnover_info
      .trusty_help_text._yellow
        | Send {{ coin }} to the address below
      .trusty_cutted_address(v-html="depositAddress")
      .trusty_inline_buttons._one_button: button Copy address
      .trusty_help_text._yellow
        | Push CONFIRM button as soon as you have completed the payment
      .trusty_inline_buttons
        button Confirm
        button Cancel
      p.trusty_ps_text
        | Payment gateway service is provided by #[br]
        | Openledger.io at 0% fee


</template>

<script>
/*eslint-disable*/
import trustyInput from '@/components/form/input';
import iconComponent from '@/components/icon';
import store from '@/store';
import blocktrades from './blocktrades/component';
import openledger from './openledger/component';
import trustyService from './trusty/Deposit';
import { mapActions } from 'vuex';
export default {
  components: { trustyService, trustyInput, iconComponent, blocktrades,openledger },
  watch:{
    service(val){
      this.setTransferService(val)
    },
    coin(val){
      this.changeCoinType(val)
    }
  },
  mounted(){
    this.changeCoinType("BTC")
    this.setTransferService("blocktrades")
  },
  methods: {
    ...mapActions('transfer',[
      'changeCoinType',
      'setTransferService'
    ])
  },
  computed:{
    isDeposit(){
      return this.$route.name == "deposit"
    },
    depositAddress(){
      let exists = this.$store.state.transfer.depositAddress
      let address = exists ? exists.address : null
      if(address){
          let firstCount = Math.floor(address.length/2) - 1
          let start = address.slice(0, firstCount)
          let end = address.slice(firstCount)
          return `<span>${start}</span><br/><span>${end}</span>`
      }
      return "<span>no address</span>"
    }
  },

  mounted(){
    this.service = "blocktrades"
  },

  data() {
    return {
      coin: "BTC",
      service: "",
    };
  }
};

/*eslint-disable*/

</script>

<style lang="scss">

@import "~@/style/mixins";

#trusty_transfer {
  @include trusty_main_padding;
}


.trusty_help_text {
  font-family: Gotham_Pro;
  text-align: center;
  margin-bottom: 10px;
}


@media screen and (max-width: 768px) {
  ._turnover_inputs {
    margin-bottom: 6vw;
  }

  .trusty_inline_buttons {
    margin-bottom: 5vw;
  }

  ._clipboard_value {
    margin-top: 2.3vw;
    overflow: scroll;
    span {
       display: table-cell;
       padding-right: 10px;
    }
  }
  .trusty_help_text {
    font-size: 4.8vw;
    line-height: 6vw;
    margin-bottom: 4.1vw;
  }

  .trusty_cutted_address {
    text-align: center;
    font-family: Gotham_Pro_Bold;
    font-size: 6vw;
    line-height: 7vw;
    margin-bottom: 4.1vw;
  }

}


.trusty_deposit_address {
  display: inline-block;
  margin-bottom: get-vw(8px);
}

.trusty_ps_text {

  font-family: Gotham_Pro;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 3.3vw;
    margin: 3.8vw 0;
    line-height: 4.3vw;
  }

}

@media screen and (min-width: 769px) {
  #trusty_transfer {
    display: flex;
    width: 80%;
    margin: 0 auto;

    ._turnover_inputs,
    ._turnover_info {
      flex: 1;
    }
  }
}


</style>
