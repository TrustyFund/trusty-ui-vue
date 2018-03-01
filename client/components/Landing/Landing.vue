<template lang="pug">
div
  div.trusty_fixed_background_div
  div#landing
    div.logo_starter
      div.top_buttons
        a
          span SignUp
        a
          span Info
        a
          span LogIn

      div.bottom_content
        div._logo_text._mob
          svg(src='./vendor/img_trusty_logo_last.svg')
        div.wrap_img_profile._desk
          img(src='./vendor/img_user_page.png')
        div._desk_right
          div._logo._desk
          div._logo_text._desk
          p._slogan
          p._description
          a._desk
            button INVEST NOW            
      div._fixed_bottom._mob
        a
          button INVEST NOW
        div.trusty_down_arrow
          span
            svg(src='./vendor/trusty_arrow_down.svg')

    div.land_slides
      template(v-for="(slide, index) in slides")
        div.land_slide(v-bind:class="slideClass(index)" v-bind:id="slideClass(index)")
          div.trusty_down_arrow(v-if="index === 0")
            span(v-html="arrowDown")
          div.image_area
            div
              img._image(:src="slide.image")
          div.text_area
            h1(v-html="slide.title")
            div._body(v-if="slide.text" v-html="slide.text")
          div.trusty_down_arrow(v-if="index > 0")
            span(v-html="arrowDown")

    div.last_text#last_screen
      p 
        | First time in history
        br._mob  
        | everybody
        br._desk   
        |   can invest
        br._mob 
        |  in a globally disruptive,
        br
        | yet infant, technology
      a.wrap_button
        button INVEST NOW
      p
        | Depositing into Trusty.Fund
        br._mob 
        |  now is like
        br._desk
        |  early investing
        br._mob
        |  in internet companies,
        br._desk
        |  when 20 million people
        br._mob
        |  used internet
      a.wrap_button
        button FAQ

    div.bottom_info
      section
        | The above references are for information purposes only.
        br._mob
        |  They are not intended to be investment advices.
        br
        | Trusty.Fund provides a trustless service for its clients to manage and
        br._mob
        | store funds on the BitShares blockchain via trusted gateways.
      section 2018 Trusty.Fund

</template>

<script>
import './style.scss';

const slide1 = require('./vendor/how.gif');
const slide2 = require('./vendor/network.gif');
const slide3 = require('./vendor/wallet1.gif');
const slide4 = require('./vendor/img_1click_to_invest.png');
const slide5 = require('./vendor/img_chng_portfolio.png');
const slide6 = require('./vendor/img_index.png');
const slide7 = require('./vendor/wallet2.gif');
const arrowDown = require('./vendor/trusty_arrow_down.svg');


export default{
  data() {
    return {
      slides: [
        {
          image: slide1,
          title: 'How To Use',
          text: null
        },
        {
          image: slide2,
          title: 'Easy To Create A<br> Decentralized Account',
          text: 'Click Signup, create password<br> and your account will be secured <br>' +
                'by the BitShares.org blockchain. <br> You own the private key'
        },
        {
          image: slide3,
          title: 'Deposit Fiat<br>Or Cryptocurrencies',
          text: 'Invest USD, RUB, EUR, CNY at the best exchange rate or pay 0% ' +
                'commission to deposit cryptocurrencies directly'
        },
        {
          image: slide4,
          title: 'One-Click To<br> Buy A Portfolio Of Cryptos',
          text: 'After deposit, you are a click<br> away from your own customized<br>' +
                'portfolio of crypto assets.<br> Forget the hassle of buying<br> assets separately'
        },
        {
          image: slide5,
          title: 'One-Click<br>To Manage Your Portfolio',
          text: 'Manage your portfolio by mirroring<br> trades of ranked portfolio<br> managers, ' +
                'applying index rules or<br> using the portfolio rebalancing tool'
        },
        {
          image: slide6,
          title: 'One-Click<br>To Fix Your Income In USD',
          text: 'Fix your income to wait out price<br> hyper volatility. Just click to<br> ' +
                'transfer your funds in<br> USD, EUR, CNY, Gold, etc.'
        },
        {
          image: slide7,
          title: 'Withdraw Fiat<br> Or Cryptocurrencies',
          text: 'Withdraw funds in USD, RUB, EUR, CNY<br class="_desk" /> directly to a bank card' +
                ', payment service<br class="_desk" />  account or send cryptocurrencies' +
                '<br class="_desk" />  to a crypto wallet'
        }
      ],
      arrowDown
    };
  },
  methods: {
    slideClass(index) {
      const addString = index + 1;
      return 'sl_id-' + addString;
    },
  }
};
</script>