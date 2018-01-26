<template lang="pug">

#trusty_auth

  trusty-input(label="new account name")
    template(slot="input")
      input

  trusty-input(label="enter password")
    template(slot="input")
      input

  trusty-input(label="brainkey" type="confirm password")
    template(slot="input")
      textarea
  
  p._tooltip_p._yellow
    | Write down your password, it CAN'T BE RECOVERED 

  .trusty_buttons
    button Signup

  p._tooltip_p._text_center 
    | Before continuing, make sure your device is secure

  ._bottom_link: span Log in with existing account

  ._bottom_link._margins: span I accept Terms of use

  ._logo_owl
    icon-component(name="trusty_owl_small_logo")

</template>

<script>
import trustyInput from '@/components/trusty-input';
import iconComponent from '@/components/icon';

export default {
  components: { trustyInput, iconComponent }
};

</script>

