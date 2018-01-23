<template lang="pug"> 

.trusty_header(@click='navigateBackAction')

    .trusty_header_logo(
        @click="router.push('/')",
        v-html="logo")

    ._back(@click='this.navigateBackAction')
      //-icon-component(name="trusty_arrow_back") 

    ._options(
        v-if="isProfilePage"
        @click='navigateToBackupAction')
        //-icon-component(name="trusty_options")

    .header_title {{getHeaderTitle}}

</div>
  
  
</template>


<script>


export default {
  data() {
    return {
      isProfilePage: window.location.pathname.indexOf('home') !== -1,
      logo: ''// require('./style/images/trusty_fund_logo.svg');

    };
  },

  methods: {
    navigateBackAction() {
      this.$router.push({ name: 'home' });
    },
  },
  computed: {
    getHeaderTitle() {
      const headerTitles = {
        signup: 'signup',
        login: 'login',
        'deposit details': 'deposit',
        withdraw: 'withdraw',
        'manage fund': 'manage',
        'terms of use': 'terms-of-use',
        'unlock account': 'unlock',
        'recent transactions': 'transactions',
        'backup phrase': 'backup'
      };
      let title = '';
      Object.keys(headerTitles).forEach(k => {
        if (window.location.pathname.indexOf(headerTitles[k]) !== -1) { title = k; }
      });
      return title;
    }
  }
};

</script>

<style lang="scss">
  
$header_size_desk: 50px;
$header_size: 12vw;
$white_color: #e6e6e6;
$background_color: #1b1f22;


.trusty_header_fake {

  width: 100%;

  .trusty_header {
    position: relative;
    z-index: 100;
    opacity: 0;
  }

}


.trusty_header {
    color: white;
     width: 100%;
     height: $header_size;
     top:0;
     left:0;
     right: 0;
     z-index: 1200;
   //border-bottom: 1px solid $white_color;
   .header_title {
    display: block;
    text-align: center;
    font-family: Gotham_Pro_Regular;
    text-transform: uppercase;
    line-height: $header_size;
                   font-weight: bold;
    @media screen and (max-width: 750px){
      font-size: 4.8vw;
    }
  
   }
   span._back {
  
    position: absolute;
    top:0;
    left:0;
    display: inline-block;
    width: 12vw !important;
        height: 12vw !important;
  
   }
           span._options {
    position: absolute;
    top:0;
    right:0;
    display: inline-block;
    width: 12vw !important;
                   height: 12vw !important;
       }
  
   @media screen and (min-width: 768px) {
    height: $header_size_desk;
    .header_title {
      font-size: 32px;
    }
  
   }
}

.trusty_arrow_back {
  position: absolute !important;
  width: 12vw !important;
  height: 12vw !important;
  line-height: 13.5vw;
  top: .4vw !important;
    left: -.2vw !important;
  text-align: center;
  svg {
    display: inline-block;
    height: 45% !important;
  }
  @media screen and (min-width: 768px) {
    height: $header_size_desk !important;
    widht: $header_size_desk !important;
  }
}

.trusty_options {

  svg {
    display: inline-block;
    height: 40% !important;
    width: 40% !important;
  }

}


.trusty_header_logo {
  svg { 
    fill: $white_color; 
  }
  @media screen and (min-width: 751px) {
    width: 200px;
  }
}

.trusty_header_arrow {
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  transform: scale(-1, 1);
  height: $header_size;
  width: $header_size;
  background: transparent;
  outline: none;
  border: none;
  svg {
    fill: #ffffff;
  }

}


</style>



