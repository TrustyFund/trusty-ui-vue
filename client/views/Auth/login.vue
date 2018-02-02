<template lang="pug">

#trusty_auth
    
  .input_area 
    .left
      confirm-password
      trusty-input(label="brainkey" type="textarea")
        template(slot="input")
          textarea
    .right
      ._logo_owl._desk
        icon-component(name="trusty_owl_small_logo")
  
  p._tooltip_p 
    | Please enter account brainkey once for new devices, #[br]
    | 12 words, you backed up, when account was created

  .trusty_buttons
    button Log in
    span._desk(style="display:inline-block; width: 1vw")
    button._grey_style._desk Sign up

  p._tooltip_p._text_center 
    | Before continuing, make sure your device is secure #[br]

  ._bottom_link._mob: span Sign up with new account

  ._logo_owl._mob
    icon-component(name="trusty_owl_small_logo")



  
</template>

<script>
import trustyInput from '../../components/form/input';
import iconComponent from '../../components/icon';
import confirmPassword from './confirm-password';

export default {
  components: { trustyInput, iconComponent, confirmPassword }
};

</script>


<style lang="scss">

@import "~@/style/mixins";

#trusty_auth {
	@include trusty_main_padding; 
}

._logo_owl {
  
  text-align: center;

  span.trusty_owl_small_logo {
     display: inline-block;
     width: 16vw !important;
  }

  span {
    display: inline-block;
  }
  svg {
    fill: white;
  }

}

._bottom_link {
  font-family: "Gotham_Pro";
  text-align: center;
  color: white;
  span  {
    border-bottom: 1px solid white;
  }
}


._tooltip_p {
  font-family: "Gotham_Pro";
  color: white;
}

._bottom_link {
  text-align: center;
  span {
    font-size: 1.3vw;
  }
  &._margins {
    margin-top: 5.8vw;
    margin-bottom: 4vw;
  }
}


@media screen and (min-width: 769px) {

  ._logo_owl {
    line-height: 100%;
    height: 100%;
    padding-top: 0;
    text-align: left;
    padding-left: 3vw;
    
    span { 
      display: inline-block;
      position: relative; 
      top: 60%;
      transform: translateY(-50%);
    }
  }

  ._tooltip_p { 
    
    text-align: center;

  }

  #trusty_auth {
    width: 80vw;
    margin: 0 auto;
  }

  .input_area {
    margin: 10vh auto;
    display: flex;
    justify-content: center;

    .left, .right {
      flex: 1;
    }

    .left {
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 0 12vw 0 8vw;
    }
  }
}

@media screen and (max-width: 768px) {

  ._tooltip_p {
    line-height: 4vw;
    margin-top: 2vw;
    font-size: 3.3vw;
    margin-bottom: 4.6vw;
  }

  ._bottom_link {
    span {
      font-size: 3.3vw;
    }
    &._margins {
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