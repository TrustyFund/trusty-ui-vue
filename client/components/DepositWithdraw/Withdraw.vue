<template lang="pug">
#trusty_transfer
  ._turnover_inputs
    trusty-input(label="send any sum")
      template(slot="input")
        input(v-model.number="amount")
      template(slot="right")
        icon-component(name="trusty_arrow_down")
        span.fake_option_width
        select(v-model="selectedcoin")
          option(v-for="coin in coins") {{ coin }}

    trusty-input(:isOpen="true", label="payment method" className="select_input")
      template(slot="input")
        input(:style="{display:'none'}")
        select(v-model="paymentmethod" )
          option(v-for="method in methods", :value="method") {{ method }}

    trusty-input(label="enter receiving address")
      template(slot="input")
        input

  ._turnover_service
    component(:is="gateway" :payload="selectedcoin")
</template>

<script>
import trustyInput from '@/components/UI/form/input';
import iconComponent from '@/components/UI/icon';
import openledger from './Openledger/Withdraw';
import './style.scss';

const methodsByGate = {
  openledger: ['openledger']
};

export default {
  data() {
    return {
      selectedcoin: 'BTC',
      coins: ['BTC', 'ETH', 'LTC', 'NEO'],
      paymentmethod: 'openledger',
      amount: '',
    };
  },
  components: { trustyInput, iconComponent, openledger },
  computed: {
    gateway() {
      return 'openledger';
    },
    methods() {
      return methodsByGate[this.gateway];
    }

  }
};

</script>
