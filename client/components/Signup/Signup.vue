<template lang="pug">

#trusty_auth


  .input_area 
    .left

      trusty-input(label="new account name")
        template(slot="input")
          input

      trusty-input(label="enter email")
        template(slot="input")
          input
            
      ConfirmPassword

    .right
      ._logo_owl._desk
        Icon(name="trusty_owl_small_logo")

  
  p._tooltip_p._yellow
    | Write down your password, it CAN'T BE RECOVERED 

  .trusty_buttons
    button Sign up

  p._tooltip_p._text_center 
    | Before continuing, make sure your device is secure

  ._bottom_link(@click="$router.push({ name: 'login' })"): span Log in with existing account

  ._bottom_link._margins: span I accept Terms of use

  ._logo_owl._mob
    Icon(name="trusty_owl_small_logo")

</template>

<script>
import trustyInput from '@/components/UI/form/input';
import Icon from '@/components/UI/icon';
import ConfirmPassword from '@/components/UI/ConfirmPassword';

export default {
  components: { trustyInput, Icon, ConfirmPassword }
};

</script>

