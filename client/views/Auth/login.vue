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
import trustyInput from '../../components/trusty-input';
import iconComponent from '../../components/icon';

export default {
  components: { trustyInput, iconComponent }
};

</script>


<style lang="scss">

@import "../../style/mixins";

#trusty_auth {
	@include trusty_main_padding; 
}

.trusty_buttons {
  
  text-align: center;

  button {
    font-family: "Gotham_Pro_Regular";
    font-size: 1.3rem;
    margin-bottom: 0px !important;
    font-weight: bold;
    padding: initial !important;
    line-height: initial !important;

  }

  @media screen and (max-width: 768px) {
    button {
      color: #2a2a2a;
      width: 100%;
      font-size: 5vw;
      background: white !important;
      height: 13vw !important;
    }
  }

}

._logo_owl {
  text-align: center;
  span {
    display: inline-block;
  }
  svg {
    fill: white;
  }
}

._tooltip_p {
  font-family: "Gotham_Pro";
}

._bottom_link {
  font-family: "Gotham_Pro";
  text-align: center;
  color: white;
  span  {
    border-bottom: 1px solid white;
  }
}

@media screen and (max-width: 768px) {

  ._tooltip_p {
    color: white;
    line-height: 4vw;
    margin-top: 2vw;
    font-size: 3.3vw;
    margin-bottom: 4.6vw;
  }

  ._bottom_link {
    text-align: center;
    span {
      font-size: 3.3vw;
    }
    &._second {
      margin-top: 5.8vw;
      margin-bottom: 4vw;
    }
  }

  ._logo_owl {
    text-align: center;
    padding-top: 6vw;
    span.trusty_owl_small_logo {
       display: inline-block;
       width: 34vw !important;
    }
  }
  
}

</style>