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

$color_bg_grey: #d8d9d9;

#coin_analysis {
  span {
    display: inline-block;
  }
  h3._list_title {
    font-family: Gotham_Pro;
    text-align: center;
    font-size: 4.8vw;
  }

  ._grey_key_list {
    font-family: Gotham_Pro;

    a, a:hover, a:focus {
			color: grey;
			border-color: grey;
    }

    > p {
      margin-top: 0vw;
      margin-bottom: 0vw;
    }

    > p:first-child {
      color: #a3a2a4;
      font-size: 2.7vw;
      margin-bottom: .7vw;
      text-transform: uppercase;
    }
    > p:last-child {
      font-size: 4.3vw;
      margin-bottom: 2.4vw;
    }
  }

  ._grey_key_list:first-child {
    margin-top: 2vw;

  }

  ._team_area .h3 {
    margin-bottom: 3vw;
    padding-left: 4.6vw;
    //-webkit-padding-start: 0;
    color: white;
    font-size: 4.8vw;
  }

  ._scores_indicate  {
    margin-top: 7vw;
    ._black_bg {

      margin-bottom: 5vw;
      background: rgba(0,0,0,0.49);
      padding: 1vw 0 0 0;
      ._indicator {
        background: black;
        padding: .6vw 1.5vw;
        span:not(._show_span) {
          margin-left: 2vw;
          color: white;
          font-size: 4.6vw;
          font-family: Gotham_Pro_Bold;
        }
        ._show_span {
          height: 3vw;
          background: white;
          width: 83%;
        }
      }
    }

    ._title_ind {
      color: white;
      font-family: Gotham_Pro;
      letter-spacing: .07vw;
      font-size: 4.7vw;
      text-align: center;
      padding: 2vw 0;
    }

    ._grey_key_list {
      margin-top: 1vw;
      margin-bottom: 3vw;
    }

     ._points {
      position: relative;

      > span:first-child {
        display: inline-block;
        font-family: Gotham_Pro_Regular;
        font-size: 6.5vw;
        line-height:5vw;
      }

      ._right_tabs {
        position: absolute;
        top:0;
        right: 0;

        .trusty_icon {
          position: absolute;
          background: transparent;
          width: 3.4vw;
          margin-top:0;
          svg {
            fill: black;
          }
        }

        span {
          background: black;
          font-family: Gotham_Pro;
          font-size: 4.8vw;
          padding-left: 1vw;
          padding-right: 5vw;
          height: 6vw;
        }

        span:nth-child(2) {
          background: #ffffff;
          color: black;
          padding-left: 2vw;
          padding-right: 7.8vw;
          height: 6.04vw;

        }

      }
    }
  }

  ._why_area {

    margin-top: .5vw;
    ._top {
      background: white;
      padding: 2.2vw;
    }
    ._grey_key_list p, ._grey_key_list {
      margin-bottom: 0;
      margin-top: 0;
      :last-child {
        color: black;
      }
    }
    ._grey_key_list {
      margin-bottom: 1vw;
    }
    ._underarm {
      background: $color_bg_grey;
      padding: 2.2vw;
      span {
        color: black;
      }
      span:first-child {
        font-family: Gotham_Pro_Bold;
      }
    }
  }

}

</style>
