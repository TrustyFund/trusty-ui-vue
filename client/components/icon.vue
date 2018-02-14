<template lang="pug">

span.trusty_icon(v-html="icons[name]", :class="classes")

</template>


<script>
const names = [
  'trusty-logo-text',
  'trusty_arrow',
  'trusty_arrow_back',
  'trusty_options',
  'trusty_arrow_down',
  'trusty_arrow_down_landing',
  'trusty_input_close',
  'trusty_portfolio_arrow_right',
  'trusty_owl_small_logo',
  'trusty_plus',
  'trusty_minus',
  'mf_minus',
  'mf_plus',
  'full_plus',
  'full_minus',
  'trusty_fund_logo',
  'tick_backup',
  'account_backup_ico_photo',
  'account_backup_ico_safe'
];

const icons = {};
names.forEach(name => {
  icons[name] = require(`../style/icons/${name}.svg`); // eslint-disable-line global-require
});


export default {

  props: {
    name: {
      default: '',
      type: String
    },
    className: {
      default: '',
      type: String
    },
    initialSvgColors: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      icons
    };
  },
  computed: {
    classes() {
      const white = !this.initialSvgColors ? '_white' : '';
      return this.name + ' ' + this.className + ' ' + white;
    }
  }

};

</script>

<style lang="scss">

.trusty_icon {
	display: inline-block;
	svg {
		width: 100% !important;
		height: auto;
	}

	&._white svg,
	&._white svg path {
		fill: white;
	}

}
</style>
