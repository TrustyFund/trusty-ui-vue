<template lang="pug">

#trusty_auth

  trusty-input(label="password")
    template(slot="input")
      input

  trusty-input(label="confirm password")
    template(slot="input")
      input

  trusty-input(label="brainkey" type="textarea")
    template(slot="input")
      textarea
  
  p._tooltip_p 
    | Please enter account brainkey once for new devices, #[br]
    | 12 words, you backed up, when account was created

  .trusty_buttons
    button Log in

  p._tooltip_p._text_center 
    | Before continuing, make sure your device is secure #[br]

  ._bottom_link: span Sign up with new account

  ._logo_owl
    icon-component(name="trusty_owl_small_logo")



  
</template>

<script>
import trustyInput from '@root/components/trusty-input';
import iconComponent from '../../components/icon';

export default {
  components: { trustyInput, iconComponent }
};

</script>

