<template lang="pug">

.trusty_deposit_fiat_fullscreen
  .trusty_header.cryptobot_header
    .header_title DEPOSIT
  .deposit_paddings
    alpha-input(:isOpen="true", label="please use your online bank to send")
      template(slot="input"): div._simple_text_left {{ order.FiatAmount  + ' ' + order.Currency }}

    alpha-input(:isOpen="true", label="to")
      template(slot="input"): div._simple_text_left {{ order.PaymentMethod }}

    alpha-input(:isOpen="true", label="number")
      template(slot="input"): div._simple_text_left {{ requisites }}

    .trusty_inline_buttons._one_button
      button(
        v-clipboard:copy="requisites"
        v-clipboard:success="onCopy") copy address

    alpha-input(:isOpen="true" label="exchange rate RUB/BTC")
      template(slot="input"): div._simple_text_left.rate {{ amount.rate }}
      template(slot="right")
        label.trusty_place_holder You will receive BTC
        div._right_slash {{ amount.final }}

    p.trusty_help_text._bottom._yellow Push CONFIRM button as soon as#[br] you have completed the payment

    .trusty_inline_buttons
      button(@click="$store.dispatch('app/setModal', 'payment')") Confirm
      button(@click="cancel") Cancel

    p.trusty_ps_text
      | Payment gateway service is provided #[br]
      | by users of Localbitcoins.com

  .modal_wrap(v-if="getModalName === 'payment'")
    .modal_content.main_padding
      p.trusty_help_text Before you continue,#[br] make sure the#[br] payment is done
      .trusty_inline_buttons
        button(@click="markPayed") Done
        button(@click="$store.dispatch('app/setModal', null)") Back

</template>

<script>
import AlphaInput from '@/components/UI/form/alpha';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { AlphaInput },
  name: 'Payment',
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      order: 'cryptobot/getCurrentOrder',
      getModalName: 'app/getModalName'
    }),
    amount() {
      const {
        FiatAmount,
        LBAmount,
        LBFee,
        OperatorFee,
        BotFee
      } = this.order;
      const final = (LBAmount - LBFee - OperatorFee - BotFee).toFixed(5);
      const rate = Math.floor(FiatAmount / final).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return { final, rate };
    },
    requisites() {
      // Remove spaces
      const withoutSpaces = this.order.PaymentRequisites.replace(/ /g, '');
      // Add spaces ¯\_(ツ)_/¯
      return withoutSpaces.replace(/(.{4})/g, '$1 ');
    }
  },
  mounted() {
    this.hideHeader();
  },
  beforeDestroy() {
    this.showHeader();
  },
  methods: {
    ...mapActions({
      cancelOrder: 'cryptobot/cancelOrder',
      payOrder: 'cryptobot/setPayedStatus',
      hideHeader: 'app/hideHeader',
      showHeader: 'app/showHeader'
    }),
    markPayed() {
      this.$store.dispatch('app/setModal', null);
      this.payOrder();
    },
    cancel() {
      this.cancelOrder();
      this.$toast.info('Order canceled');
      this.$router.push({ name: 'entry' });
    },
    onCopy() {
      this.$toast.success('Address copied to clipboard');
    }
  }
};
</script>
