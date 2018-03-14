<template lang="pug">

#trusty_calendar
  button Click
  .month
    div(v-for="item in month")
      span {{ item.date }}

</template>

<script>


export default {
  data() {
    return {
      month: {},
      months: {},
      year: 2018
    };
  },
  mounted() {
    this.month = this.getMonthData(this.year, 3);
  },
  methods: {
    getMonthData(year, monthNumber) {
      const total = this.daysInMonth(year, monthNumber);
      const page = [];
      for (let i = 1; i < total + 1; i += 1) {
        page.push({
          date: i,
          month: monthNumber,
          year
        });
      }
      return page;
    },
    daysInMonth(year, month) {
      return new Date(year, month, 0).getDate();
    }
  }
};
</script>

<style lang="scss">
</style>
