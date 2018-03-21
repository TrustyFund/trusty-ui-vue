<template lang="pug">

.trusty_deposit_timer
	._title(v-html="text")
	._timer
		| 0{{minutesRemaining}}
		span
			| :
			span {{ secondsString }}

</template>

<script>
export default {
  props: {
    secondsRemaining: {
      type: Number,
      default: 59
    },
    minutesRemaining: {
      type: Number,
      default: 2
    },
    text: {
      type: String,
      default: 'YOU WILL GET SMTH'
    }
  },

  methods: {

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

