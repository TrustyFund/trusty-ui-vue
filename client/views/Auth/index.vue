<template lang="pug">

#trusty_auth

  trusty-input(label="password")
    template(slot="input")
      input

  trusty-input(label="confirm password")
    template(slot="input")
      input

  trusty-input(label="brainkey")
    template(slot="input")
      input

  
</template>

<script>
import trustyInput from '../../components/trusty-input';

export default {
  components: { trustyInput }
};

</script>


<style lang="scss">

@import "../../style/mixins";

#trusty_auth {
	@include trusty_main_padding; 
}

</style>