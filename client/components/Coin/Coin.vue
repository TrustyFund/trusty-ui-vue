<template lang="pug">

#trusty_coin_overview


  ._head_title

    div._indicators
      span._price {{ format(getStats.price) }}
      span._24change
        span {{ change24 }}%&nbsp
        span 24H


  .coin_info.main_padding
    .top_values

      section._db_left._db_bottom
        h4 Mkt. Cap.
        ._val: span._mark {{ format(getStats.marketcap) }}
      section._db_right._db_left._db_bottom
        h4 Vol. 24H
        ._val: span._mark {{ format(getStats.total24) }}
      section._db_left
        h4 Open 24H
        ._val: span._mark {{ format(getStats.open24Hour) }}

      section._db_right._db_left
        h4 Low/High 24H
        ._val: span._mark {{ format(getStats.low24Hour) }} - {{ format(getStats.high24Hour) }}

  #coin_analysis._belongings

    .content_area(:class="{_opened_article: opened==='about asset issuer'}")
      ._items(@click="opened = opened==='about asset issuer' ? '':'about asset issuer'")
        ._list_item
          span.text_button about asset issuer
          icon(name="trusty_arrow_down")
        .wrap_content.main_padding
          ._grey_key_list
            p description
            p {{getBitsharesDescription}}

    .content_area(:class="{_opened_article: opened==='about'}")
      ._items(@click="opened = opened==='about' ? '':'about'")
        ._list_item
          span.text_button ABOUT
          icon(name="trusty_arrow_down")

      .wrap_content.main_padding

        ._grey_key_list(v-for="(val, key) in getSnapShot" v-if="val")
          template(v-if="key !== 'image'&&key!=='ico'")
            p {{ parseCamel(key) }}
            p(v-html="val") {{ val }}
          template(v-if="key==='ico'")
            h3._list_title {{ key }}
            ._grey_key_list
              p STATUS
              p {{ val.status}}
            ._grey_key_list
              p white paper
              p(v-html="val.whitePaper")


    .content_area(:class="{_opened_article: opened==='social'}")
      ._items(@click="opened = opened==='social' ? '':'social'")
        ._list_item
          span.text_button SOCIAL
          icon(name="trusty_arrow_down")

      .wrap_content.main_padding

        template(v-for="(val, key) in getSocial" v-if="val")
          template(v-if="key!=='code'")
            template(v-if="key!=='symbol'&&key!=='name'")
              h3._list_title {{ key }}
              ._grey_key_list(v-for="(one, k) in val" @click="showLink(one)")
                p {{ parseUnderscore(k) }}
                p(v-html="one")
          template(v-else)
            h3._list_title {{ key }}
            ._grey_key_list(v-for="(one, k) in val", @click="showLink(one.url)")
              p {{ one.url }}
              p updated {{ one.lastUpdate}}


  p.trusty_ps_text Overview provided by cryptocompare.com


</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import icon from '@/components/UI/icon';

export default {
  mounted() {
    this.preloadData();
  },
  props: {
    symbol: {
      type: String,
      required: true
    },
    assetId: {
      default: '1.3.1999',
      type: String
    }
  },
  data() {
    return {
      coin: '',
      opened: '',
    };
  },
  computed: {
    change24() {
      const num = this.getStats.change24Percent;
      const mark = parseFloat(num).toFixed(1);
      if (mark > 0) {
        return '+' + this.format(num);
      }
      return this.format(num);
    },
    ...mapGetters({
      getStats: 'assetInfo/getStats',
      getSocial: 'assetInfo/getSocial',
      getSnapShot: 'assetInfo/getSnapShot',
      getAssetById: 'assets/getAssetById'
    }),
    getSymbol() {
      return this.symbol.toUpperCase();
    },
    getBitsharesDescription() {
      const assetObj = this.getAssetById([this.assetId]);
      if (!assetObj.options) {
        return '';
      }
      try {
        const { description } = assetObj.options;
        const descriptionObj = JSON.parse(description);
        const bitsharesDescription = descriptionObj.main;
        return bitsharesDescription;
      } catch (ex) {
        return '';
      }
    }
  },

  methods: {
    showLink(link) {
      if (link.indexOf('http') !== -1) { window.open(link); }
    },
    async preloadData() {
      this.fetchStats(this.getSymbol);
      this.fetchSnapshot(this.getSymbol);
      this.fetchSocial(this.getSymbol);
    },

    isNumeric(n) {
      // eslint-disable-next-line
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    commaFormat(num) {
      const n = num.toString();
      const p = n.indexOf('.');
      return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, ($0, i) => {
        return p < 0 || i < p ? ($0 + ',') : $0;
      });
    },
    format(string) {
      if (string) {
        const nums = string.split(' ');
        nums.forEach((item, index) => {
          const maybeNumber = item.replace(/,/g, '');
          if (this.isNumeric(maybeNumber)) {
            nums[index] = this.commaFormat(parseFloat(maybeNumber).toFixed(1));
          }
        });
        return nums.join(' ');
      }
      return string;
    },
    ...mapActions({
      fetchStats: 'assetInfo/fetchStats',
      fetchSocial: 'assetInfo/fetchSocial',
      fetchSnapshot: 'assetInfo/fetchSnapshot',
    }),
    parseUnderscore(string) {
      if (typeof string === 'string') {
        return string.replace(/_/g, ' ');
      }
      return '';
    },
    parseCamel(string) {
      return string
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3');
    }
  },
  components: {
    icon
  }
};

</script>

<style lang="scss">
@import "./style";
$color_red_value: #f42c2e;
$color_green_value: #659d1a;


.text_button {
  color: white;
  font-family: Gotham_Pro_Regular;
  font-size: 4.8vw;
  text-transform: uppercase;
}

#trusty_coin_overview {

  height: inherit;

  ._belongings {

    ._list_item:first-child {
      border-top: 1px solid white;

    }


    .content_area:first-child,
    .content_area:nth-child(2) {
      ._list_item {
        border-bottom: 0;
      }
    }

    ._list_item {
      padding-top: 3vw;
      padding-bottom: 3vw;
      border-bottom: 1px solid white;


    }


    .wrap_content {
      overflow: hidden;
		  transition: max-height .3s ease-in-out;
		  overflow: hidden;
		  max-height: 0;
    }

    .trusty_arrow_down {
    	transition: all .3s ease-in-out;
    }

    .content_area._opened_article {

      ._list_item {
      	transition: all .3s;
        border-bottom: none;
      }

      .trusty_arrow_down {
        transform: rotate(180deg);
      }

      .wrap_content {
      	transition: max-height .3s ease-in-out;
        max-height: 2000px;
      }


    }

    ._title {
      padding-top: 1vw;
      padding-bottom: 6vw;
      color: white;
      ._font {
        text-align: center;
        font-size: 6vw;
        letter-spacing: .25vw;
      }
    }
    .trusty_icon {
      float: right;
      width: 4.1vw;
      vertical-align: middle;
      margin-right: 4vw;
      margin-top: .4vw;
    }
    .text_button {
      padding-left: 3.6vw;
    }
  }

  .trusty_ps_text {
    margin-top: 1.7vw;
    margin-bottom: 3vw;
  }

  .coin_info {
    margin-bottom: 3vw;
  }

  .top_values {

    display: flex;
    flex-wrap: wrap;
    //justify-content: center;

    section {
      box-sizing: border-box;
      //width: 50%;
      margin-right: 2vw;
      text-align: center;

    }

    &._bordered {
      section {
        border: 1px solid #606365;
        &._db_right {
          border-right: none;
        }
        &._db_left{
          border-left: none;
        }
        &._db_bottom{
          border-bottom: none;
        }
      }
    }

    h4 {
      //color: black;
      margin: 0;
      //background: #c6c8cc;
      font-size: 4.9vw;
      font-family: Gotham_Pro;
      font-weight: initial;


      text-align: left;
      font-size: 3.8vw;
    }

    ._val  {

      span._mark {
        padding: 2vw 2vw 2vw 2vw;
        //background: black;
        border: 1px solid white;
        color: white !important;
      }
    }

    ._val, ._val span {

      height: 12vw;
      line-height: 12vw;
      color: $color_green_value;
      font-size: 4.2vw;
      font-family: Gotham_Pro;

      .coin_head_trend_dn,
      .coin_head_trend_up {
        width: 5vw;
        margin: 0 1.6vw;
      }


    }

  }


  ._font {
    font-family: Gotham_Pro;
    font-size: 7vw;
    height: 100%;
    margin: auto 2vw;
    color: white;
  }

  ._head_title {

    text-align: center;
    padding-top: 1.9vw;

    span {
      display: inline-block;
      vertical-align: middle;
    }

    .coin_head_ogo {
      width: 8.6vw;
    }

    .coin_head_omg {
      padding-top: 1vw;
      width:13vw;
    }

    ._font:first-letter {
      text-transform: uppercase;
    }

    ._indicators {
      margin-bottom: 6vw;

      > span {
        vertical-align: middle;
        color: white;
      }

      span._price {
        margin: 2vw 0;
        font-size: 7.7vw;
        font-family: Gotham_Pro_Bold;
      }

      span._24change {
        display: block;
        font-size: 5vw;
        font-family: Gotham_Pro_Regular;
        margin-left: 2vw;
        > span:nth-child(2){
          font-size: 3.6vw;
          font-family: Gotham_Pro;
        }
      }
    }

  }

  .coin_vista {
    margin-top: 6.5vw;
  }

  button:active,  button:focus {
    background: white;
    color: black;
  }

}

</style>
