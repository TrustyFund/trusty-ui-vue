<template lang="pug">

#done
	.tick_container(v-for="(option,index) in infos")
		._tick(@click="checkOption(index)")
			icon(
				name="tick_backup",
				:class="{_disabled_tick: !option.checked }",
				:initialSvgColors="true")
		._info
			p.trusty_help_text(v-html="option.text")

	._bottom_fixed.main_padding
		.tick_container
			._tick(@click="checkTermOfUse()")
				icon(
					name="tick_backup",
					:class="{_disabled_tick: !termOfUse.checked }",
					:initialSvgColors="true")
			._info
				p.trusty_help_text(@click="$router.push({name:'terms-of-use'})" v-html="termOfUse.text")

		.trusty_inline_buttons._one_button(:class="{_disabled: !allChecks }")
			button(@click="done") finish backup

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import icon from '@/components/UI/icon';
// v-if="index !== lastIndex"
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

];

const termOfUse ={
  text:`
I have read, understood, and<br/>gree&nbsp
<span class="_yellow">The terms of use</span>
`,
  checked: false
};


/*eslint-disable*/


export default {

	components: {icon},
  data() {
    return {
      infos,
      termOfUse
    };
  },
  computed: {
  	lastIndex() {
  		return this.infos.length-1
  	},
    allChecks() {
    	return this.infos.every(option=>!!option.checked) && this.termOfUse.checked;
    },
    ...mapGetters({
      userId: 'account/getAccountUserId'
    })
  },
  methods: {
  	...mapActions({
  		storeBackupDate: 'account/storeBackupDate'
  	}),
  	checkOption(index){
  		this.infos[index].checked = !this.infos[index].checked;
  	},
    checkTermOfUse(){
      this.termOfUse.checked = !this.termOfUse.checked;
    },
  	done() {
  		if (this.allChecks) {
	  		const date = new Date();
        const userId = this.userId;
        this.storeBackupDate({ date, userId});
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
