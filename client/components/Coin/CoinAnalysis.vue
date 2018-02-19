<template lang="pug">
#coin_predictions

</template>

<script>


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
              LINKEDIN
            `
          },
          {
            question: `
              IS IT MENTIONED THAT THIS CEO WORKS FOR THIS COMPANY
              ON HIS LINKEDIN PROFILE?
            `,
            answer: 'Jun Hasegawa'
          },
          {
            question: `
              CEO PREVIOUS COMPANIES / ACHIEVEMENTS
            `,
            answer: `
              Founder / CEO of Omise; Founder / CEO of
              Omise Co.; Ltd., Director of Alpha-do Inc.;
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
            ABILITY TO CONTACT THE COMPANY VIA:
            SLACK, TELEGRAM OR ICQ?
          `,
          pointsCount: {
            current: 70,
            max: 70
          }
        },
        {
          title: `
            ABILITY TO CONTACT THE COMPANY VIA:
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
            DIVERSIFICATION OF THE TEAM
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

  data() {
    return {
      pageData
    };
  }
};
</script>

<style lang="scss">
#coin_predictions {



}

</style>
