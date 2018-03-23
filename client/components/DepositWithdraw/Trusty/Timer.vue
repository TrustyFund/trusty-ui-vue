<template lang="pug">

.trusty_deposit_timer
	._title(v-html="text")
	._timer
		| 0{{minutesRemaining}}
		span
			| :
			span {{ secondsString }}
	.trusty_inline_buttons._one_button
		button(@click="cancelOrder") cancel order

</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      secondsRemaining: 59,
      minutesRemaining: 2,
      text: 'YOU WILL GET DEPOSIT DETAILS IN <br /> UNDER 3 MINUTES'
    };
  },

  methods: {
    ...mapActions({
      cancelOrder: 'cryptobot/cancelOrder'
    }),

    tick() {
      let newMinutes = this.minutesRemaining;
      let newSeconds = this.secondsRemaining - 1;

      if (newSeconds % 60 === 0 && newMinutes !== 0) {
        newMinutes = this.minutesRemaining - 1;

        if (newMinutes >= 0) {
          newSeconds = 60;
        }
      }

      this.secondsRemaining = newSeconds;
      this.minutesRemaining = newMinutes;

      if (this.secondsRemaining <= 0 && this.minutesRemaining <= 0) {
        clearInterval(this.interval);
      }
    }


  },

  computed: {
    secondsString() {
      const seconds = this.secondsRemaining;
      return (this.secondsRemaining < 10) ? '0' + seconds : seconds;
    }
  },

  mounted() {
    this.interval = setInterval(this.tick, 1000);
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

};

</script>

<style lang="scss">



@media screen and (max-width: 768px) {

	.trusty_deposit_timer {
		color: white;
		text-align: center;
		._title {
			font-size: 4.4vw !important;
		    font-family: "Gotham_Pro_Regular";
		    line-height: 5.5vw;
		}

		._timer {
			margin: 4vw;
			font-family: "Gotham_Pro";
			font-size: 17vw;		}
	}

}

</style>

