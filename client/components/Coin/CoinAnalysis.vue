<template lang="pug">

#coin_analysis._belongings

  ._title
      .omise_font OmiseGO analysis

  ._items

    template(v-for="(item, title) in pageData")
      ._list_item
        span.text_button {{ title }}
        icon(name="trusty_arrow_down")

      .wrap_content.main_padding(v-if="title === 'FACTS & FIGURES'", :class="title")

        template(v-for="(value, name) in item")

          template(v-if="name==='preview'")
            ._grey_key_list(v-for="(val, key) in value")
              p {{ key }}
              p {{ val }}

          template(v-if="name==='Product details'")
            h3._list_title {{ name }}
            ._grey_key_list(v-for="(val, key) in value")
              p {{ key }}
              p {{ val }}

          template(v-if="name==='Team'")
            h3._list_title {{ name }}

            ._grey_key_list(v-for="(val, key) in value")

              template(v-if="key!=='ul'")
                p {{ key }}
                p {{ val }}

              template(v-else)
                ._team_area(v-for="(li, keyName) in val")
                    ul.h3: li {{ keyName }}
                    ._grey_key_list(v-for="item in li")
                      p {{ item.question }}
                      p {{ item.answer }}

      .wrap_content.main_padding(v-if="title === 'SCORES'", :class="title")
        template(v-for="(value, key) in item")
          ._scores_indicate
            ._black_bg
              ._title_ind {{ key }} {{ value.indicate === "100%" ? "" : value.indicate }}
              ._indicator
                span._show_span
                span {{ value.indicate }}
            template
              ._grey_key_list(v-for="(point, index) in value.points")
                p(v-html="point.title")
                ._points
                  span {{ point.pointsCount.current }} points
                  span._right_tabs
                    span MAX {{ point.pointsCount.max }}
                    span
                      | Why?
                      icon(name="trusty_arrow_down")
                  ._why_area(v-if="index===0")
                    ._top
                      ._grey_key_list
                        p SLACK
                        p https://omg.omise.co/slack
                      ._grey_key_list
                        p TELEGRAM
                        p N/A
                      ._grey_key_list
                        p ICQ
                        p N/A
                    ._underarm
                        div
                          span 70&nbsp
                          span ANY NOT EMPTY
                        div
                          span 0&nbsp
                          span ALL EMPTY


</template>

<script>
import icon from '@/components/UI/icon';

const pageData = {

  'FACTS & FIGURES': {
    preview: {
      NAME: 'OmiseGO',
      'TRADES UNDER SYMBOL': 'OMG',
      'WHAT IS THE ROLE OF THE COIN?': `
        Payment rights on the platform or people\n
        using the platform & Access to platform
      `,
      'WHAT IS THE TOTAL COIN SUPPLY?': '140,245,398',
      'FIRST USD PRICE PER COIN': '$0.53',
      'COINS DISTRIBUTED IN ICO?': 'N/A',
      'EMISSION RATE': 'No new tokens created',
      BLOCKCHAIN: 'Ethereum',
      'CONSENSUS METHOD': 'Proof of work',
      'TIME FOR BLOCK PROCESSING': 'N/A',
      'TRANSACTIONS PER SECOND': '2,500'
    },

    'Product details': {
      'OPEN SOURCE': 'Yes',
      'GITHUB LINK': 'http://reddit.com/r/omise_go',
      'COMMUNITY SIZE': '91,597',
      'STATUS OF THE PROJECT\n(WORKING PROJECT, DEMO, JUST AN IDEA)': 'Fully working product',
      'RELEASE DATE OF FIRST VERSION OF THE PRODUCT': '2017-06-23',
      'PRODUCT ROADMAP': 'N/A',
    },
    Team: {
      'LINK TO THE TEAM PAGE': 'https://omg.omise.co/#about',
      ul: {
        'Team transparency': [
          {
            question: 'BIOGRAPHY ON WEBSITE FOR EACH TEAM MEMBER',
            answer: 'Yes',
          },
          {
            question: 'BIOGRAPHY ON WEBSITE FOR EACH TEAM MEMBER',
            answer: 'Yes',
          }
        ],
        CEO: [
          {
            question: 'NAME',
            answer: 'Jun Hasegawa',
          },
          {
            question: 'AGE',
            answer: 'N/A'
          },
          {
            question: 'LINKEDIN',
            answer: `
              https://www.linkedin.com/in/junhase/
            `
          },
          {
            question: `
              IS IT MENTIONED THAT THIS CEO WORKS FOR THIS COMPANY<br/>
              ON HIS LINKEDIN PROFILE?
            `,
            answer: 'Jun Hasegawa'
          },
          {
            question: `
              CEO PREVIOUS COMPANIES / ACHIEVEMENTS
            `,
            answer: `
              Founder / CEO of Omise; Founder / CEO of<br/>
              Omise Co.; Ltd., Director of Alpha-do Inc.;<br/>
              CEO / Co-founder of LIFEmee Inc.
            `,
          }, {
            question: 'YEARS OF BUSINESS EXPERIENCE',
            answer: '28',

          },
          {
            question: 'YEARS OF EXPERIENCE AS A CEO (OR COO)',
            answer: '12',
          },
          {
            question: 'MANAGED A MILLION+ USD$ COMPANY BEFORE',
            answer: 'No'
          }
        ]
      }
    },
  },
  SCORES: {
    'Open communication channels': {
      indicate: '100%',
      points: [
        {
          title: `
            ABILITY TO CONTACT THE COMPANY VIA:<br/>
            SLACK, TELEGRAM OR ICQ?
          `,
          pointsCount: {
            current: 70,
            max: 70
          }
        },
        {
          title: `
            ABILITY TO CONTACT THE COMPANY VIA:<br/>
            CONTACT FORM OR EMAIL
            `,
          pointsCount: {
            current: 30,
            max: 30
          }
        }
      ]
    },
    'Team strength': {
      indicate: '33%',
      points: [
        {
          title: `
            HAS A CEO WHO MANAGED MULTI MILLION DOLLAR COMPANIES?
            `,
          pointsCount: {
            current: 0,
            max: 25
          }
        },
        {
          title: `
            HAS A CTO WHO MANAGED MILLION DOLLAR PROJECTS?
            `,
          pointsCount: {
            current: 0,
            max: 20
          }
        },
        {
          title: `
              CEO YEARS OF EXPERIENCE AT C-LEVEL
            `,
          pointsCount: {
            current: 16,
            max: 16
          },
        },
        {
          title: `
            CTO YEARS OF EXPERIENCE AT C-LEVEL
          `,
          pointsCount: {
            current: 16,
            max: 16
          },
        },
        {
          title: `
            DIVERSIFICATION OF THE TEAM<br/>
            (SALES/MARKETING, DEVELOPMENT
          `,
          pointsCount: {
            current: 16,
            max: 16
          },
        },
        {
          title: `
            AVERAGE TEAM AGE
          `,
          pointsCount: {
            current: 16,
            max: 16
          },
        },
        {
          title: `
            TEAM SIZE
          `,
          pointsCount: {
            current: 16,
            max: 16
          },
        }

      ]
    }
  },
};


export default {
  components: { icon },
  data() {
    return {
      pageData
    };
  }
};
</script>

<style lang="scss">



</style>
