<template lang="pug">
  .mirror-container
    .mirror-list
      span(@click="$router.push({ name: 'manage-traders' })") Popular Traders
      .mirror-card(v-for="item in indexData.users_popular")
        .mirror-card-image
          img(:src="item.profile_image_url")
        .mirror-card-info
          span.card-name {{item.username}}
          span.card-info {{item.copier_count}} copiers
        .mirror-card-statistics
          span.card-status(:class="'risk-'+item.risk_score") Risk {{ item.risk_score }}
          span.card-statistics {{ item.performance_this_month.includes('-') || item.performance_this_month ? item.performance_this_month : '+' + item.performance_this_month }}%

    .mirror-list
      span Successful Traders
      .mirror-card(v-for="item in indexData.users_successful")
        .mirror-card-image
          img(:src="item.profile_image_url")
        .mirror-card-info
          span.card-name {{item.username}}
          span.card-info {{item.copier_count}} copiers
        .mirror-card-statistics
          span.card-status(:class="'risk-'+item.risk_score") Risk {{ item.risk_score }}
          span.card-statistics {{ item.performance_this_month.includes('-') ||item.performance_this_month  ? item.performance_this_month : '+' + item.performance_this_month }}%

    .mirror-list
      span Discussed Trades
      .mirror-card(v-for="item in indexData.positions_discussed")
        .mirror-card-image.trade(:class="item.direction == 'short' ? 'red' : 'blue'")
          span.card-symbol {{ item.symbol }}
          icon-component(
            name="diagonal_arrow",
            className="diagonal_arrow",
            v-bind:className="item.direction == 'short' ? 'card-fall' : 'card-grow'" )
          span.card-leverage {{ item.leverage }}
        .mirror-card-info
          span.card-name {{item.username}}
          span.card-info {{item.comment_count}} comments
        .mirror-card-statistics
          span.card-status.is-open {{ isOpened(item.is_open) }}
          span.card-statistics(:class="item.profit_loss_percent.includes('-') ? 'red' : 'blue'") {{ !item.profit_loss_percent.includes('-') ? '+' + item.profit_loss_percent : item.profit_loss_percent }}%
</template>

<script>
import iconComponent from '@/components/UI/icon';

const indexData = require('./index-data.json');

export default {
  components: {
    iconComponent
  },
  data() {
    return {
      indexData
    };
  },
  methods: {
    isOpened(condition) {
      return condition === true ? 'Open' : 'Closed';
    }
  }
};

</script>

<style lang="scss">
.mirror-container {
  padding: 0 6.3vw;
}

.mirror-list {
  margin-bottom: 15px;

  > span {
    margin-bottom: 2.3vw;
    display: block;
  }
  .mirror-card {
    display: flex;

    margin-bottom: 15px;

    span {
      margin: 0;
    }
    .mirror-card-image {
      flex-basis: 30%;
      &.trade {
        display: flex;
        flex-direction: column;

        text-align: center;
        padding: 2.3vw 0;
      }
      &.red {
        background: rgba(210, 18, 18, 0.7);
      }
      &.blue {
        background: rgba(35, 76, 208, 0.7);
      }

      img {
        display: block;
        width: 100%;
      }

      .diagonal_arrow {
        width: 18px;

        margin: 10px auto 5px auto;
        &.card-fall {
          transform: rotate(90deg);
        }
      }
    }
    .mirror-card-info, .mirror-card-statistics {
      display: flex;
      flex-basis: 35%;

      flex-wrap: wrap;

      // background: rgba(253, 241, 1, 0.3);
      background: rgba(255, 255, 255, 0.1);
      padding: 2.3vw;

      > span {
        width: 100%;
        &:first-child {
          margin-bottom: auto;
        }
        &:last-child {
          margin-top: auto;
        }
      }
    }
    .mirror-card-statistics {

      .card-statistics {
        width: auto;
        margin-left: auto;
        &.red {
          color: rgba(210, 18, 18, 0.7);
        }
        &.blue {
          color: rgba(35, 76, 208, 0.7);
        }
      }
      .card-status {
        width: auto;
        margin-left: auto;
        padding: 5px;
        &.is-open {
          width: 100%;
          padding: 0;

          text-align: right;
        }
        &.risk-0 {
          opacity: 0;
        }
        &.risk-1 {
          background: rgba(35, 76, 208, 0.7);
        }
        &.risk-2 {
          background: rgba(255, 255, 0, 0.5);
        }
        &.risk-3 {
          background: rgba(255, 165, 0, 0.7);
        }
        &.risk-4 {
          background: rgba(210, 18, 18, 0.7);
        }
      }
    }
  }
}
</style>
