<template lang="pug">

#done
	.tick_container(v-for="text in infos")
		._tick: icon(name="tick_backup", :initialSvgColors="true")
		._info
			p.trusty_help_text(v-html="text")

	.trusty_inline_buttons._one_button
		button copy password

	._bottom_fixed.main_padding
		.tick_container
			._tick: icon(name="tick_backup", :initialSvgColors="true")
			._info
				p.trusty_help_text
					| I have read, understood, and#[br]gree&nbsp
					span._yellow The terms of use

		.trusty_inline_buttons._one_button
			button finish backup

</template>

<script>

import icon from '@/components/UI/icon';
/*eslint-disable*/
const infos = [
  `
		I understand that my funds are<br/>
		help securely on this device, not<br/>
		by a compony, and nobody can<br/>
		recover my backup phrase and password
	`,
  `
		I understand that if I open Trusty,<br/>
		on a new device or clear browser<br/>
		cash, my funds can only be<br/>
		accessed with the backed pharse

	`,
  `
		I undersatand that I need to<br/>
		confirm every transaction with<br/>
		the password
	`
];

/*eslint-disable*/

export default {
	components: {icon},
  data() {
    return {
      infos
    };
  }
};

</script>

<style lang="scss">

#done {
	span._yellow {
		display: inline-block;
		border-bottom: 1px solid #fdf101;
	}
}



</style>
