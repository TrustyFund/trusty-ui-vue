<template lang="pug">

#done
	.tick_container(v-for="(option,index) in infos" v-if="index !== lastIndex")
		._tick(@click="checkOption(index)")
			icon(
				name="tick_backup",
				:class="{_disabled_tick: !option.checked }",
				:initialSvgColors="true")
		._info
			p.trusty_help_text(v-html="option.text")

	._bottom_fixed.main_padding
		.tick_container
			._tick(@click="checkOption(lastIndex)")
				icon(
					name="tick_backup",
					:class="{_disabled_tick: !infos[lastIndex].checked }",
					:initialSvgColors="true")
			._info
				p.trusty_help_text(@click="$router.push({name:'terms-of-use'})" v-html="infos[lastIndex].text")

		.trusty_inline_buttons._one_button(:class="{_disabled: !allChecks }")
			button(@click="done") finish backup

</template>

<script>
import { mapActions } from 'vuex';

import icon from '@/components/UI/icon';
/*eslint-disable*/
const infos = [
{
	text: `
I understand that my funds are<br/>
help securely on this device, not<br/>
by a compony, and nobody can<br/>
recover my backup phrase and password
	`,
	checked: false
},
{
	text:`
I understand that if I open Trusty,<br/>
on a new device or clear browser<br/>
cash, my funds can only be<br/>
accessed with the backed pharse
	`,
	checked: false
},
{
	text:`
I have read, understood, and<br/>gree&nbsp
<span class="_yellow">The terms of use</span>
`,
	checked: false
}

];

/*eslint-disable*/

export default {
	components: {icon},
  data() {
    return {
      infos,
    };
  },
  computed: {
  	lastIndex() {
  		return this.infos.length-1
  	},
    allChecks() {
    	return this.infos.every(option=>!!option.checked)
    }
  },
  methods: {
  	...mapActions({
  		storeBackupDate: 'account/storeBackupDate'
  	}),
  	checkOption(index){
  		this.infos[index].checked = !this.infos[index].checked;
  	},
  	done() {
  		if (this.allChecks) {
	  		const date = new Date();
	  		this.storeBackupDate({ date });
				this.$emit('doneBackup');
  		}
  	}
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
