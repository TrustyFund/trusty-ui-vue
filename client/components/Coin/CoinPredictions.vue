<template lang="pug">

#coin_predictions._belongings

  ._title
    .omise_font OmiseGO price predictions

  ._items

    template(v-for="(item, title) in texts")
      ._list_item
        span.text_button {{ title }}
        icon(name="trusty_arrow_down")

      //WORLDWIDE MONEY--------------------------------------------------
      .wrap_content.main_padding(v-if="title === 'WORLDWIDE MONEY'", :class="title")

        template(v-for="(listItem, name) in item.ul")
          template(v-if="name=='WORLDWIDE MONEY'")
            h4 {{ name }}
            ._three_column_row
              ._wrap_titles
                div.trusty_small_font Description
                div.trusty_small_font
                  | OmiseGO#[br]
                  | compared#[br]
                  | to total#[br]
                  | amount of#[br]
                  | M# money#[br]
                  | worldwide
              ._wrap_titles
                div.trusty_small_font Crypto market
                div.trusty_small_font
                  | % of the#[br]
                  | worldwide#[br]
                  | market
              ._wrap_titles
                div
                  | Price of OmiseGO when X% of Total M##[br]
                  | money flows into the Crypto Market and#[br]
                  | OmiseGO keeps its current Market Share
                div The X% val. is represented below, $(USD)

            ._three_column_row(v-for="coin in listItem")
              ._group_two
                span {{ coin.description }}
                span {{ coin.cryptoMarket }}
              ._group_six
                span(v-for="one in coin.percentageFlow") {{ one }}

          template(v-if="name=='SOURCES'")
            h4 {{ name }}
            template(v-for='(source, key) in listItem')
              template(v-if="key=='Total amount of money'")
                ._two_column_row(v-for="one in source")
                  span
                    span {{ key }}
                    span {{ one.name }}
                  span {{ one.val }}
              template(v-else)
                ._text_area(v-for="one in source")
                  p
                    span
                      span {{ key }}
                      span {{ one.name }}
                    span {{ one.val }}
                  p {{ one.description }}


      //COINS’S GROWTH-----------------------------------------------
      .wrap_content.main_padding(v-if="title === 'BITCOIN’S GROWTH'", :class="title")

        p.trusty_big_font
          | Predictions if OmiseGO has a similar#[br]
          | growth pattern as Bitcoin

        template(v-for="(listItem, name) in item.ul")
          template(v-if="name=='AVERAGE GROWTH OF BTC'")
            h4 {{ name }}
            ._three_column_row
              h4 {{ listItem.title }}
              ._five_column_row(v-for="row in listItem.table")
                span(v-for="one in row") {{ one }}
          template(v-if="name=='SOURCES'")
            h4 {{ name }}



      //OTHER TECH GROWTH-------------------------------------------

      .wrap_conent.main_padding(v-if="title==='OTHER TECH GROWTH'", :class="title")
        p.trusty_big_font
          | Predictions Based on growth patterns
          | of other world changing technology:
          | The Internet, The Mobile phone,
          | Google & Facebook. Sorted by
          | Average growth

        template(v-for="(listItem, name) in item.ul")

          template(v-if="name=='PREDICTIONS'")
            h4 {{ name }}
            ._four_column_row: span(v-for="tit in listItem.table.titles") {{ tit }}
            ._four_column_row(v-for="item in listItem.table.items")
              p {{item.conditionText}}
              span(v-for="val in item.values") {{ val }}

          template(v-if="name=='SOURCES'")
            h4 {{ name }}
            ._source(v-for="(source,sourceName) in listItem")
              ._title {{ sourceName }}
                template(v-if="sourceName.indexOf('Moore') !== -1")
                  p.trusty_little_font {{ source.text }}
                template(v-else)
                  ._list
                    ._link
                      span Source
                      span {{ source.Source }}
                    .table
                      ._table_rows(v-for="th in source.table.titles") {{ th }}
                      ._table_rows(v-for="row in source.table.data")
                        span(v-for="one in row") {{ one }}

</template>

<script>

import icon from '@/components/icon';

const texts = {

  'WORLDWIDE MONEY': {
    ul: {
      'WORLDWIDE MONEY': [
        {
          description: 'M0',
          cryptoMarket: '2.5564',
          percentageFlow: ['16.28', '32.57', '65.13', '130.27', '260.54', '521.27']
        },
        {
          description: 'M1',
          cryptoMarket: '2.5564',
          percentageFlow: ['16.28', '32.57', '65.13', '130.27', '260.54', '521.27']
        },
        {
          description: 'M1',
          cryptoMarket: '2.5564',
          percentageFlow: ['16.28', '32.57', '65.13', '130.27', '260.54', '521.27']
        }
      ],
      SOURCES: {
        'Total amount of money': [
          {
            name: 'in Crypto market',
            val: '$164,574,763,509'
          },
          {
            name: 'in OmiseGO',
            val: '$706,365,011'
          }
        ],
        'Estimated Total amount of M0': [
          {
            name: 'Money worldwide December 2016',
            val: '$6,700,000,000,000',
            description: `
              M0: The total of all physical currency, plus accounts at
              the central bank which can be exchanged for physical
              currency. Source: Comparison multiple sources on the
              internet. Source is not fully confirmed by a government
              instance
            `
          }
        ]
      }
    }
  },
  'BITCOIN’S GROWTH': {
    ul: {
      'AVERAGE GROWTH OF BTC': {
        title: `
          Predictions. If OmiseGO has X% of Bitcoin's previous average growth\n
          per year, $(USD)
        `,
        table: [
          ['P.C.', '2018', '2019', '2020', '2021'],
          ['if 1%', '7.57', '7.73', '7.89', '8.06'],
          ['if 1%', '7.57', '7.73', '7.89', '8.06'],
          ['if 1%', '7.57', '7.73', '7.89', '8.06']
        ]
      },
      SOURCES: {

      }
    }
  },
  'OTHER TECH GROWTH': {
    ul: {
      PREDICTIONS: {
        table: {
          titles: ['2018', '2019', '2020', '2021'],
          items: [
            {
              values: ['14.81', '118.51', '237.03', '474.06'],
              conditionText: `
                If OmiseGO grows according to Moore's law, $(USD)
              `
            },
            {
              values: ['14.81', '118.51', '237.03', '474.06'],
              conditionText: `
                If OmiseGO has the average YoY growth that the Internet went
                through by amount of users (in its adoption phase 1995 / march
                2017)
              `
            },
            {
              values: ['14.81', '118.51', '237.03', '474.06'],
              conditionText: `
                If OmiseGO has the average YoY growth that Google went through
                (in its adoption phase 2000 / 2015)
              `
            },
            {
              values: ['14.81', '118.51', '237.03', '474.06'],
              conditionText: `
                If OmiseGO has the average YoY growth that Facebook went
                through (in its adoption phase 2004 / 2016)
              `
            },
            {
              values: ['14.81', '118.51', '237.03', '474.06'],
              conditionText: `
                If OmiseGO has the average YoY growth that the Mobile Phone went
                through (in its adoption phase 1993 / 2013)
              `
            }
          ]
        }
      },
      SOURCES: {
        "Moore's law": {
          text: `
            Some financial analysts came to the conclusion that
            Bitcoin is currently following Moore's law in it's adoption
            rate. Moore's law refers to an observation made by Intel
            co-founder Gordon Moore in 1965. He noticed that the
            number of transistors per square inch on integrated
            circuits had doubled every year since their invention.
            Moore's law predicts that this trend will continue into the
            foreseeable future
          `,
        },
        'Facebook usage': {
          Source: `
            https://www.yahoo.com/news/number-active-users-faceb
            ook-over-years-214600186--finance.html
          `,
          table: {
            titles: [
              'year',
              `
                MEASURED MONTHLY
                ACTIVE USERS
              `,
              'MULTIPLIER',
              `
                YEAR ON YEAR
                GROWTH
              `
            ],
            data: [
              ['2007', '350,000,000.00', '233.33%', '+133.33%'],
              ['2008', '350,000,000.00', '233.33%', '+133.33%'],
              ['2009', '350,000,000.00', '233.33%', '+133.33%']
            ]
          }
        },
        'Google usage': {
          Source: `
            http://www.internetlivestats.com/google-search-statistics
          `,
          table: {
            titles: [
              'year',
              `
                AMOUNT OF SEARCHES
                PER YEAR IN * MILLION
              `,
              'MULTIPLIER',
              `
                YEAR ON YEAR
                GROWTH
              `
            ],
            data: [
              ['2001', '9,238.00', '297.40%', '+197.40%'],
              ['2001', '9,238.00', '297.40%', '+197.40%'],
              ['2001', '9,238.00', '297.40%', '+197.40%'],
            ]
          },
        },
        'Internet usage': {
          Source: 'http://www.internetworldstats.com/stats.htm',
          table: {
            titles: [
              'year',
              `
                AMOUNT
                OF USERS
                IN MILLONS
              `,
              'MULTIPLIER',
              `
                % OF
                WORLD
                POPULATION
              `,
              'MULTIPLIER'
            ],
            data: [
              ['De, 1996', '36', '225.00%', '0.9', '225.00%'],
              ['De, 1996', '36', '225.00%', '0.9', '225.00%'],
              ['De, 1996', '36', '225.00%', '0.9', '225.00%']
            ]
          }
        }
      }
    }
  }
};


export default {
  components: { icon },
  data() {
    return {
      texts
    };
  }
};
</script>

<style lang="scss">

$color_grey: #b1b1b1;

#coin_predictions {

  .WORLDWIDE.MONEY {
    ._three_column_row {
      display: flex;
      ._wrap_titles:first-child, ._wrap_titles:nth-child(2) {
        flex: 1;
      }
      ._wrap_titles:nth-child(3) {
        flex: 2;
      }
    }
  }
}
//white-space: pre;
</style>
