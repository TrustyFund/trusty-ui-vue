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
        template(v-for="(value, name) in item.data")
          ._two_column_row
            span.trusty_small_font {{ name }}
            span.trusty_small_font {{ value }}

      .wrap_content(v-if="title === 'historical performance'", :class="title")
        template(v-for="(value, name) in item.data")
          ._four_column_row
            section
              ._definition
                p
                  span {{ name }}
                  span(v-for="columnName in value.columns") {{ columnName }}
                p(v-for="(it, tit) in value", v-if="tit !== 'columns'")
                  span {{ tit }}
                  span(v-for="val in it") {{ val }}

      .wrap_content(v-if="title==='trading history'")

        ._two_column_row
          span.trusty_small_font DATE CHANGE
          ._date_picker
            span.trusty_small_font 17-10-16 – 17-10-23
            icon(name="trusty_arrow_down")

        ._six_column_row
          span(v-for="title in ['date','open','high','low', 'vol.']") {{ title }}

        template(v-for="it in item.data")
          ._six_column_row
            span(v-for="val in it") {{ val }}


      .wrap_content(v-if="title==='vc information'")

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
            span {{question.text}}
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
          PREVIOUSLY BACKED BY (ANOTHER) VENTURE\n
          CAPITAL FUND (VC FIRM) AND/OR ANGEL\n
          INVESTORS WITH A BIG NAME?
        `,
        answer: 'yes'
      },
      {
        text: `
          DOES THE COMPANY PRESENT ITS COMPLETE\n
          FINANCIAL STATEMENTS?
        `,
        answer: 'no'
      },
      {
        text: `
          DOES THE COMPANY GIVE INSIGHTS IN ITS COSTS?\n
          HOW MUCH IT WILL SPEND A MONTH (ALSO\n
          KNOWN AS THE BURN RATE)?
        `,
        answer: 'no'
      },
      {
        text: `
          DOES THE COMPANY GIVE ITS FINANCIAL/GROWTH\n
          PREDICTIONS / PREDICTIONS FOR PROFIT AND\n
          GROWTH?
        `,
        answer: 'no'
      },
      {
        text: `
          DOES THE COMPANY EXPLAIN ITS BENEFITS\n
          OPPOSED TO THEIR COMPETITORS (IF ANY)?
        `,
        answer: 'yes'
      },
      {
        text: `
          DOES THE COMPANY HAVE / LIST STRATEGIC\n
          PARTNERSHIPS)?
        `,
        answer: 'yes'
      },
      {
        text: `
          DOES THE COMPANY HAVE / LIST PATENTS?\n
        `,
        answer: 'no'
      },
      {
        text: `
        DID THE COMPANY GIVE OUT ANY REAL EQUITY\n
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
          DOES THE COMPANY PRESENT ITS SALES PLAN /\n
          MARKETING PLAN / GO TO MARKET STRATEGY IN\n
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

#coin_investment {
  ._two_column_row {
      margin-top: 1vw;
      margin-bottom: 1.6vw;
      span:last-child {
        float: right;
        display: inline-block;
      }
  }
}
</style>
