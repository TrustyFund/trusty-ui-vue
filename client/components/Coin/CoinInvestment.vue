<template lang="pug">
#coin_investment._belongings

  ._title
    .omise_font OmiseGO price predictions

  ._items

    template(v-for="(item, title) in options")

      ._list_item
        span.text_button {{ title }}
        icon(name="trusty_arrow_down")

      .wrap_content.main_padding(v-if="title === 'general & averages'", :class="title")
        template(v-for="(value, name,index) in item.data")
          ._two_column_row
            span.trusty_small_font {{ name }}
            span.trusty_small_font(:class="{_green:index%2===0, _red:index%2!==0}") {{ value }}

      .wrap_content.main_padding(v-if="title === 'historical performance'", :class="title")
        template(v-for="(value, name) in item.data")
          ._four_column_row
            section
              ._row_area
                p._black_title
                  span._long_name {{ name }}
                  span(v-for="columnName in value.columns") {{ columnName }}
                p._box_area(v-for="(it, tit) in value", v-if="tit !== 'columns'")
                  span._long_name {{ tit }}
                  span(v-for="val in it") {{ val }}

      .wrap_content.main_padding(v-if="title==='trading history'")

        ._two_column_row
          span.trusty_small_font DATE CHANGE
          ._date_picker
            span.trusty_small_font 17-10-16 – 17-10-23
            icon(name="trusty_arrow_down")

        ._six_column_row
          span._grey_little(v-for="title in ['date','open','high','low','close','vol.']") {{ title }}

        ._six_column_row(v-for="it in item.data")
          span(v-for="val in it") {{ val }}


      .wrap_content.main_padding(v-if="title==='vc information'")

        ._vc_info
          ._vc_title
            | Basic questions that Angel Investors #[br]
            | and Venture capital firms ask in #[br]
            | their due diligence process
          p
            | Note that these are only a limited amount of questions#[br]
            | that we ask. A normal Angel Investor/VC due diligence#[br]
            | process has significant more required information.

        ._vc_questions
          ._q_row(v-for="question in item.data")
            span(v-html="question.text")
            span {{question.answer}}

</template>

<script>
import icon from '@/components/icon';

const options = {
  'general & averages': {
    type: 'list',
    data: {
      'Coin age (months)': '3',
      'Volatility 30d': '24.68%',
      'Volatility 7d': '11.92%',
      'CMGR[$]': '119.13%',
      'Cumulative Return': '1,384.53%',
      'Winning months': '17.00%',
      'Max. drawdown in a day': '-26.15%',
      'Max. growth in a day': '63.33%',
      'Max. growth in a month': '1,074.23%'
    }
  },
  'historical performance': {
    type: 'date middle',
    data: {
      year: {
        columns: ['2015', '2016', '2017'],
        'Returns by year': {
          2015: 'N/A',
          2016: 'N/A',
          2017: 'N/A'
        },
      },
      month: {
        columns: ['2015', '2016', '2017'],
        Ja: {
          2015: 'N/A',
          2016: 'N/A',
          2017: 'N/A'
        },
        Fe: {
          2015: 'N/A',
          2016: 'N/A',
          2017: 'N/A'
        },
        Mr: {
          2015: 'N/A',
          2016: 'N/A',
          2017: 'N/A'
        },
        Ap: {
          2015: 'N/A',
          2016: 'N/A',
          2017: 'N/A'
        },
        Ma: {
          2015: 'N/A',
          2016: 'N/A',
          2017: 'N/A'
        },
        Jn: {
          2015: 'N/A',
          2016: 'N/A',
          2017: 'N/A'
        },
        Ju: {
          2015: 'N/A',
          2016: 'N/A',
          2017: 'N/A'
        },
        Au: {
          2015: 'N/A',
          2016: 'N/A',
          2017: '445.45%'
        },
        Se: {
          2015: 'N/A',
          2016: '-15.34%',
          2017: 'N/A'
        },
        Oc: {
          2015: 'N/A',
          2016: 'N/A',
          2017: 'N/A'
        },
        No: {
          2015: 'N/A',
          2016: 'N/A',
          2017: 'N/A'
        },
        De: {
          2015: 'N/A',
          2016: 'N/A',
          2017: 'N/A'
        },
      },
      week: {
        columns: ['2015', '2016', '2017'],
        'Ja 1st – Ja 8th': {
          2015: 'N/A',
          2016: '135.23%',
          2017: '-0.5%'
        },
        'Ja 8th – Ja 15th': {
          2015: 'N/A',
          2016: '135.23%',
          2017: '-0.5%'
        },
        'Ja 15th - Ja 22nd': {
          2015: 'N/A',
          2016: '135.23%',
          2017: '-0.5%'
        },

      }
    }
  },
  'trading history': {
    data: [
      {
        date: 'Fr, 10-20-17',
        open: '$7.84',
        high: '$7.35',
        low: '$7.41',
        close: '$7.41',
        'vol.': '$4,434,893'
      },
      {
        date: 'Fr, 10-19-17',
        open: '$7.83',
        high: '$7.15',
        low: '$7.45',
        close: '$7.41',
        'vol.': '$4,334,893'
      },
      {
        date: 'Fr, 10-18-17',
        open: '$6.84',
        high: '$6.85',
        low: '$7.45',
        close: '$7.41',
        'vol.': '$4,434,893'
      },
      {
        date: 'Fr, 10-17-17',
        open: '$7.84',
        high: '$7.85',
        low: '$7.45',
        close: '$7.41',
        'vol.': '$4,434,893'
      }
    ]
  },
  'vc information': {
    data: [
      {
        text: `
          PREVIOUSLY BACKED BY (ANOTHER) VENTURE<br/>
          CAPITAL FUND (VC FIRM) AND/OR ANGEL<br/>
          INVESTORS WITH A BIG NAME?
        `,
        answer: 'yes'
      },
      {
        text: `
          DOES THE COMPANY PRESENT ITS COMPLETE<br/>
          FINANCIAL STATEMENTS?
        `,
        answer: 'no'
      },
      {
        text: `
          DOES THE COMPANY GIVE INSIGHTS IN ITS COSTS?<br/>
          HOW MUCH IT WILL SPEND A MONTH (ALSO<br/>
          KNOWN AS THE BURN RATE)?
        `,
        answer: 'no'
      },
      {
        text: `
          DOES THE COMPANY GIVE ITS FINANCIAL/GROWTH<br/>
          PREDICTIONS / PREDICTIONS FOR PROFIT AND<br/>
          GROWTH?
        `,
        answer: 'no'
      },
      {
        text: `
          DOES THE COMPANY EXPLAIN ITS BENEFITS<br/>
          OPPOSED TO THEIR COMPETITORS (IF ANY)?
        `,
        answer: 'yes'
      },
      {
        text: `
          DOES THE COMPANY HAVE / LIST STRATEGIC<br/>
          PARTNERSHIPS)?
        `,
        answer: 'yes'
      },
      {
        text: `
          DOES THE COMPANY HAVE / LIST PATENTS?<br/>
        `,
        answer: 'no'
      },
      {
        text: `
        DID THE COMPANY GIVE OUT ANY REAL EQUITY<br/>
        (NOT TOKENS OR COINS) BUT REAL SHARES?
        `,
        answer: 'no'
      },
      {
        text: `
          DOES THE COMPANY HAVE / LIST TRADEMARKS?
        `,
        answer: 'no'
      },
      {
        text: `
          DOES THE COMPANY PRESENT ITS SALES PLAN /<br/>
          MARKETING PLAN / GO TO MARKET STRATEGY IN
          ANY WAY?
        `,
        answer: 'yes'
      }

    ]
  }
};

export default {
  components: { icon },
  data() {
    return {
      options
    };
  }
};

</script>

<style lang="scss">
$color_grey: #b1b1b1;
$color_green: #7ac705;
$color_red: #f52c2f;
#coin_investment {
  span {display: inline-block};
  ._red {
    color: $color_red;
  }
  ._green {
    color: $color_green;
  }
  ._two_column_row {
      margin-top: 1.4vw;
      margin-bottom: 1.7vw;
      span:last-child {
        float: right;
        display: inline-block;
      }
  },

  .trading.history {

    ._vc_info {
      font-family: Gotham_Pro;
      ._vc_title {
        margin-top: 2vw;
        font-size: 4.7vw;
        text-align: center;
        color: white;
        line-height: 5.8vw;
      }

      p {
        font-size: 3.25vw;
      }

    }

    ._vc_questions {
      font-family: Gotham_Pro;
      ._q_row {
        margin-top: 2vw;
        margin-bottom: 2vw;
        span:first-child {
          color: $color_grey;
          width: 90%;
          line-height: 3.5vw;
          font-size: 2.7vw;
        }

        span:last-child {
          width: 10%;
        }
      }
    }


    ._six_column_row {
      padding-bottom: 1.5vw;
      padding-top: 1.2vw;
      letter-spacing: .2vw;
      font-family: Gotham_Pro;
      display: flex;
      span {
        display: inline-block;
        font-size: 3vw;
        flex: 1;
        text-align: center;
      }
      span:first-child {
        text-align: left;
        flex: 2;
      }
      span:last-child {
        text-align: right;
        flex: 2;
      }
      span._grey_little {
        color: #b1b1b1;
        text-transform: uppercase;
      }
    }
  }

  .historical.performance ._row_area {
    font-family: Gotham_Pro;
    font-size: 4.2vw;
    span { display: inline-block; }
    p {
      padding-left:2vw;
      padding-right: 2vw;
    }
    ._box_area {
      display: flex;
      font-family: Gotham_Pro;
      font-size: 3.7vw;
      span:not(._long_name) {
        flex: 2;
        text-align: right;
      }
      span:first-child {
        flex: 4;
      }

    }
    ._black_title {
      padding-top:1.7vw;
      padding-bottom: 1.7vw;
      background:#0e0c0f;
      display: flex;
      span:not(._long_name) {
        flex: 2;
        text-align: right;
      }
      span._long_name {
        text-transform: uppercase;
        flex: 4;
      }
    }
  }
}

</style>
