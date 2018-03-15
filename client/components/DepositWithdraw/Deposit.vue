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
        select(v-model="service")
          option(v-for="method in methods", :value="method") {{ method }}

  ._turnover_service
    component(:is="service")

</template>

<script>
import trustyInput from '@/components/UI/form/input';
import iconComponent from '@/components/UI/icon';
import openledger from './Openledger/Deposit';
import './style.scss';

const methodsByGate = {
  trusy: ['SBERBANK', 'TINKOFF'],
  openledger: ['openledger']
};

export default {
  components: { trustyInput, iconComponent, openledger },
  computed: {
    gateway() {
      if (this.selectedcoin === 'RUB') {
        return 'trusy';
      }
      return 'openledger';
    },
    methods() {
      return methodsByGate[this.gateway];
    },
    depositAddress() {
      const exists = this.$store.state.transfer.depositAddress;
      const address = exists ? exists.address : null;
      if (address) {
        const firstCount = Math.floor(address.length / 2) - 1;
        const start = address.slice(0, firstCount);
        const end = address.slice(firstCount);
        return `<span>${start}</span><br/><span>${end}</span>`;
      }
      return '<span>no address</span>';
    }
  },
  data() {
    return {
      selectedcoin: 'BTC',
      service: 'openledger',
      amount: '',
      coins: ['BTC', 'ETH', 'RUB']
    };
  }
};
</script>
