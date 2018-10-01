<template lang="pug">
  .mirror-container
    .mirror-list
      p Sort:
      select
        option(selected) Popular
        option Successfull (this month)
        option Successfull (12 months)
      .mirror-card(v-for="item in traders")
        .mirror-card-image
          img(:src="item.profile_image_url")
        .mirror-card-info
          span.card-name {{item.username}}
          span.card-info {{item.copier_count}} copiers
        .mirror-card-statistics
          span.card-status(:class="'risk-'+item.risk_score") Risk {{ item.risk_score }}
          span.card-statistics {{ item.performance_this_month.includes('-') || item.performance_this_month ? item.performance_this_month : '+' + item.performance_this_month }}%
</template>

<script>
import iconComponent from '@/components/UI/icon';

const traders = require('./traders.json');

export default {
  components: {
    iconComponent
  },
  data() {
    return {
      traders
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
.mirror-list {
  > p {
    width: 40px;
    display: inline-block;
    margin: 0 10px 10px 0;
  }
  > select {
    color: black;
    border: 1px solid wheat;
  }
}
</style>
