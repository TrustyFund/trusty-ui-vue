<template lang="pug">
#trusty_transfer
  ._turnover_inputs(:class='{"_margin_bottom": !isTrustyTransfer}')

    trusty-input(label="send any sum")
      template(slot="input")
        input(v-model.number="amount")
      template(slot="right")
        icon-component(name="trusty_arrow_down")
        span.fake_option_width
        select(v-model="coin")
          option(v-for="i in ['BTC','DASH','ETH','USD','RUB']") {{ i }}

    trusty-input(:isOpen="true", label="payment method" className="select_input")
      template(slot="input")
        input(:style="{display:'none'}")
        select(v-model="service")
          option(v-for="option in transferServices", :value="option") {{ option }}

    trusty-input(label="enter receiving address")
      template(slot="input")
        input

  ._turnover_service(v-if="isTrustyTransfer")

    span trusty withdraw


  template(v-if="!isTrustyTransfer")
    div
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
</template>

<script>
import trustyInput from '@/components/UI/form/input';
import iconComponent from '@/components/UI/icon';
import './style.scss';

export default {
  data() {
    return {
      coin: 'BTC',
      service: 'blocktrades',
      amount: '',
    };
  },
  components: { trustyInput, iconComponent },
  computed: {
    transferServices() {
      return this.isTrustyTransfer ?
        ['SBERBANK', 'ALIPAY', 'TINKOFF']
        :
        ['blocktrades', 'openledger'];
    },
    isTrustyTransfer() {
      return (this.coin === 'USD' || this.coin === 'RUB');
    },

  }
};

</script>
