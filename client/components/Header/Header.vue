<template lang="pug">

.trusty_header(v-if="!isHidden")

    icon-component(
      name="trusty_fund_logo",
      v-if="isProfilePage",
      className="fund_logo",
      @click="router.push('/')")

    span._back(v-if="!isProfilePage" @click='handleBack')
      icon-component(name="trusty_arrow_back")

    span._options._mob(
      v-if="isProfilePage"
      @click='toggleSettingsMenu')
      icon-component(name="trusty_options")

    .header_title(v-if="!isProfilePage") {{ headerTitle }}
    div.settings-menu-overlay(@click="hideSettings", :class="{ 'settings-menu-overlay--visible': settingsVisible }")
    div.settings-menu-container(@click="hideSettings")
      div.settings-menu(:class="{ 'settings-menu--expanded': settingsVisible }")
        div.settings-menu__item(@click="$router.push({ name: 'backup' })") Backup wallet
        div.settings-menu__item.disabled Notifications
        div.settings-menu__item(@click="logout") Log out
</div>


</template>


<script>
import iconComponent from '@/components/UI/icon';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    iconComponent
  },
  data() {
    return {
      titles: {
        signup: 'signup',
        login: 'login',
        deposit: 'deposit details',
        withdraw: 'withdraw',
        'manage-percent': 'manage fund',
        'manage-value': 'manage fund',
        user: 'user page',
        profile: 'user profile',
        backup: 'compulsory backup',
        'backup-password': 'check password',
        'backup-phrase': 'backup phrase',
        'backup-verify': 'verify backup',
        'backup-done': 'let\'s review',
        transactions: 'recent transactions',
        'confirm-transactions': 'confirm transactions',
        'terms-of-use': 'terms of use',
        faq: 'FAQ',
        portfolio: 'portfolio',
        entry: 'profile',
        coin: 'coin overview',
        'manage-approve': 'update portfolio',
      },
      settingsVisible: false
    };
  },
  computed: {
    ...mapGetters({
      userId: 'account/getAccountUserId',
      getAssetSnapShot: 'assetInfo/getSnapShot'
    }),
    headerTitle() {
      if (this.$route.name === 'coin') {
        return this.getAssetSnapShot.name || this.$route.params.symbol;
      }
      return this.titles[this.$route.name];
    },
    isProfilePage() {
      return this.$route.name === 'entry' && this.userId;
    },
    isHidden() {
      return this.$route.name === 'entry' && !this.userId;
    }
  },
  methods: {
    ...mapActions({
      logout: 'account/logout'
    }),
    toggleSettingsMenu() {
      this.settingsVisible = !this.settingsVisible;
    },
    hideSettings() {
      this.settingsVisible = false;
    },
    handleBack() {
      // TODO : refactor back button logic
      if (this.$route.name === 'coin' || this.$route.name === 'confirm-transactions') {
        this.$router.go(-1);
      }
      this.$router.push({ name: 'entry' });
    }
  }
};

</script>

<style lang="scss">

@import "~@/style/mixins";

$header_size: 12vw;
$header_desk_size: 12;
$white_color: #e6e6e6;
$background_color: #1b1f22;

.trusty_header {
  color: white;
  width: 100%;
  flex-shrink: 0;
  position: relative;
  z-index: 2;

  span._options {
    box-sizing: border-box;
  }

  .header_title {
    height: 3vw;
    line-height: 3vw;
    display: block;
    text-align: center;
    font-family: Gotham_Pro_Regular;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.8vw;
  }


  span._back {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    width: 12vw !important;
    text-align: center;
    line-height: 3vw;
    cursor: pointer;
    svg {
      display: inline-block;
      height: 1.2vw;
    }
  }

  .trusty_header_logo {
    svg {
      fill: $white_color;
    }
  }

}

.settings-menu-overlay {
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s;
  position: absolute;
  top: 12vw;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0,0,0, 0.4);
  &--visible {
    opacity: 1;
    pointer-events: all;
  }
}

.trusty-header .seetings-menu-container {
  position: relative;
}

.trusty_header .settings-menu {
  position: absolute;
  left: 0;
  top: $header_size;
  right: 0;
  background: #1e2225;
  height: 0vw;
  transition: height 0.2s;
  overflow: hidden;
  &--expanded {
    height: 40vw;
  }
  &__item {
    height: 13vw;
    line-height: 12.2vw;
    font-size: 4.8vw;
    text-transform: uppercase;
    text-align: center;
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-family: Gotham_Pro_Medium;
    cursor: pointer;
    &:last-child {
      border-bottom: none;
    }
    &.disabled {
      cursor: default;
      color: rgba(255, 255, 255, 0.3);
    }
  }
}


@import "./mobile.scss";

@media screen and (min-width: 769px) {

  .trusty_header {

    height: px_from_vw($header_desk_size);

    .trusty_header_logo {
      line-height: px_from_vw(14);
      width: px_from_vw(57);
      height: px_from_vw(12);
      padding-left:px_from_vw( 4);
    }

    .fund_logo {
      position: absolute;
      top: px_from_vw(3.1);
      left: 0;
      width:px_from_vw(53);
      padding-left: px_from_vw(3.6);
      svg { fill: white; }
    }

    .header_title {
      line-height: px_from_vw($header_desk_size);
      font-size: px_from_vw(4.8);
    }

    span._back {
      top:0;
      left:0;
      width: px_from_vw(12);
      line-height: px_from_vw(15);
      svg {
        height: px_from_vw(5.7);
      }
    }

    .trusty_options {
      svg {
        display: inline-block;
        width: 51%;
      }
    }

    span._options {
      padding-top: px_from_vw(2.9);
      padding-right: px_from_vw(.7);
      text-align: center;
      position: absolute;
      top:0;
      right:0;
      display: inline-block;
      width: px_from_vw(12);
      height: px_from_vw(12);
    }
  }


  .trusty_arrow_back {
    position: absolute;
    width: px_from_vw(12);
    height: px_from_vw(12);
    line-height: px_from_vw(13.5);
    top: px_from_vw(.4);
    left: px_from_vw(-.2);
    text-align: center;
    svg {
      display: inline-block;
      height: 45%;
    }
  }

}

</style>



