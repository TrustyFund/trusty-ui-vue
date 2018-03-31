<template lang="pug">
._turnover_info
  .trusty_help_text._yellow
    | Send {{ payload.coin }} to the address below
  .spinner_container(v-show="pendingAddress")
    Spinner
  .trusty_cutted_address(v-html="depositAddress" v-show="!pendingAddress")
  .trusty_inline_buttons._one_button(
    v-clipboard:copy="this.address"
    v-clipboard:success="onCopy"
    :class="{ '_disabled': noAdress }"
  ): button Copy address
  ._yellow.trusty_ps_text(v-show="getCoinData")
    | IMPORTANT: Send not less than {{ getCoinData }} {{ payload.coin }} to this deposit address.
    | Sending less than {{ getCoinData }} {{ payload.coin }} or any other currency will result
    | in the loss of your deposit.
  .trusty_help_text._yellow
    | Push CONFIRM button as soon as you have completed the payment
  .trusty_inline_buttons(:class="{ '_disabled': noAdress }")
    button(@click="handleConfirm") Confirm
    button(@click="$router.push({ name: 'entry'})") Cancel
  p.trusty_ps_text
    | Payment gateway service is provided by #[br]
    | Openledger.io at 0% fee

</template>

<script>
import trustyInput from '@/components/UI/form/input';
import { mapGetters, mapActions } from 'vuex';
import iconComponent from '@/components/UI/icon';
import Spinner from '@/components/UI/Spinner';

export default {
  props: ['payload', 'fee'],
  components: {
    trustyInput,
    iconComponent,
    Spinner
  },
  data() {
    return {};
  },
  beforeMount() {
    this.fetchCoins();
    this.fetchAddress({ asset: this.payload.coin });
  },
  computed: {
    depositAddress() {
      if (this.address) {
        const firstCount = Math.floor(this.address.length / 2) - 1;
        const start = this.address.slice(0, firstCount);
        const end = this.address.slice(firstCount);
        return `<span>${start}</span><br/><span>${end}</span>`;
      }
      return '<span>No address</span>';
    },
    getCoinData() {
      const coin = this.payload.coin.toLowerCase();
      const coins = this.coinsData;
      if (coins[coin] !== undefined) {
        const { gateFee } = coins[coin];
        if (gateFee > 0) {
          return gateFee * 2;
        }
        return false;
      }
      return false;
    },
    noAdress() {
      return !this.address || this.pendingAddress;
    },
    ...mapGetters({
      address: 'openledger/getDepositAddress',
      coinsData: 'openledger/getCoinsData',
      pendingAddress: 'openledger/getAddressPending'
    })
  },
  methods: {
    ...mapActions({
      fetchAddress: 'openledger/fetchDepositAddress',
      fetchCoins: 'openledger/fetchCoins'
    }),
    onCopy() {
      this.$toast.success('Address copied to clipboard');
    },
    handleConfirm() {
      this.$toast.success('Waiting for your deposit');
      this.$router.push({ name: 'entry' });
    }
  },
  watch: {
    payload(payload) {
      this.fetchAddress({ asset: payload.coin });
    }
  }
};
</script>

<style scoped lang="scss">
.trusty_help_text {
  padding-top: 2vh;
}

.deposit_text {
  font-size: 3vw;
  padding-bottom: 3vw;
}

.trusty_inline_buttons {
  margin-bottom: 4.1vw;
  overflow: none!important;
  line-height: 13.2vw!important;
}
._turnover_info {
  .spinner_container {
    height: 13.5vw;
    position: relative;
  }
  ._disabled {
    pointer-events: none;
  }
}
</style>
