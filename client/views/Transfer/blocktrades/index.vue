<template lang="pug">

#app_deposit_blocktrades



</template>

<script>
/*eslint-disable */
/*Work in process*/

import Connects from './connects';

export default {
	props:["accountName"],
	computed:{
		coinType(){ return this.$store.state.transfer.coinType }
	},
	watch:{
		coinType(val){
			this.blocktrades.onInputCoinTypeChanged("deposit", val)
			this.$store.commit("change_deposit_address", this.blocktrades.state.input_address_and_memo )
		}
	},
  data() {
    return {
			blocktrades:{}
    };

  },

  beforeMount(){

	  	this.blocktrades = new Connects({
				gateway: 'blocktrades',
				issuer_account: 'blocktrades',
				// account:{account},
				accountName: this.accountName,
				initial_deposit_input_coin_type: this.coinType.toLowerCase(),
				initial_deposit_output_coin_type: 'bts',
				initial_deposit_estimated_input_amount: '1.0',
				initial_withdraw_input_coin_type: 'bts',
				initial_withdraw_output_coin_type: this.coinType.toLowerCase(),
				initial_withdraw_estimated_input_amount: '100000',
				initial_conversion_input_coin_type: 'bts',
				initial_conversion_output_coin_type: 'bitbtc',
				initial_conversion_estimated_input_amount: '1000',
			})


      this.blocktrades.componentWillMount().then(()=>{
        let address = this.blocktrades.state.input_address_and_memo
        this.$store.commit("change_deposit_address",address)
      })

  }
};

/*eslint-disable */
</script>

<style lang="css" scoped>



</style>
