<template>
	<div class="entry-point">
    <Landing v-if="routerName === 'entry' && !userId"/>
    <Profile v-if="routerName === 'entry' && userId"/>
    <router-view v-if="userId"></router-view>
  </div>
</template>

<script>
import Landing from '@/components/Landing/Landing';
import Profile from '@/components/Profile/Profile';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'entry-point',
  components: {
    Landing, Profile
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      ready: 'connection/isReady',
      userId: 'account/getAccountUserId'
    }),
    routerName() {
      return this.$route.name;
    }
  },
  watch: {
    ready: {
      handler(connected) {
        if (connected && this.userId) this.initUserData();
      },
      immediate: true
    },
    userId(newVal) {
      // cleanup after logout
      if (!newVal) this.resetUserData();
    }
  },
  methods: {
    ...mapActions({
      initUserData: 'app/initUserData',
      resetUserData: 'app/resetUserData'
    })
  },
};
</script>

<style lang="scss">
</style>
