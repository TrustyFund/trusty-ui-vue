<template lang="pug">
#rub_withdraw
  TrustyInput(
    label="enter receiver's address",
    v-model="address")
  .trusty_inline_buttons
    button(@click="withdraw") Confirm
    button(@click="$router.push({ name: 'entry'})") Cancel
  p.trusty_ps_text
    | Payment gateway service is provided by #[br]
    | Openledger.io at 0% fee
</template>

<script>
// Здесь мы примем на вход сумму рублей, сколько битков,
// Номер карты получаем из инпута и
// отправляем транзакцию:
// 44500:Master card:42760023145112
import TrustyInput from '@/components/UI/form/input';

export default {
  components: {
    TrustyInput
  },
  props: ['amount', 'coin'],
  data() {
    return {
      address: ''
    };
  },
  methods: {
    withdraw() {
      console.log('withdraw', this.amount, this.coin, this.address);
    }
  }
};
</script>