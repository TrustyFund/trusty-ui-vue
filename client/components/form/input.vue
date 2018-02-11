<template lang="pug">

.trusty_input_container(:style="styleSheet", :class="classes")

  .w_input
    ._input_space(ref="input_space", :class="{ active_input: opened }")

      label(
        @click="opened = true",
        :class="{no_opened: !opened}"
      ).trusty_place_holder {{ label }}

      slot(name="input")

    ._right_space(ref="right_space")

      slot(name="right")


</template>

<script>
import listen from 'event-listener';

export default {

  props: {
    className: {
      type: String,
      default: 'default'
    },
    styleSheet: {
      default: () => { return {}; },
      type: Object
    },
    label: {
      default: 'label',
      type: String
    },
    type: {
      default: 'text',
      type: String
    },
    isOpen: {
      default: false,
      type: Boolean
    }
  },

  watch: {
    opened(val) {
      if (val) {
        const current = this.type === 'textarea' ? 'textarea' : 'input';
        const target = this.$refs.input_space.querySelector(current);
        if (target) {
          target.focus();
          this.blur = listen(target, 'blur', () => {
            if (!target.value.length) this.opened = false;
          });
        }
      }
    }
  },

  mounted() {
    if (this.isOpen) this.opened = true;

    const select = this.$refs.right_space.querySelector('select');

    function resize() {
      const fake = this.$refs.right_space.querySelector('.fake_option_width');
      const selected = select.options[select.selectedIndex];
      fake.textContent = selected.text;
      select.style.width = fake.offsetWidth + 25 + 'px';
    }

    if (select) {
      resize.call(this);
      this.resizeSelect = listen(select, 'change', resize.bind(this));
    }
  },

  beforeDestroy() {
    if (this.blur) this.blur.remove();
    if (this.resizeSelect) this.resizeSelect.remove();
  },

  data() {
    return {
      opened: false,
    };
  },

  computed: {
    classes() {
      return {
        text_area: this.type === 'textarea',
        opened_text_area: this.opened && this.type === 'textarea',
        select_input: this.type === 'select',
        [this.className]: true
      };
    }
  }
};

</script>


<style lang="scss">

@mixin column_trusty_inputs {

  .trusty_input_container:not(.text_area) {
    margin-bottom: 2vw;
    position: relative;
    height: 10.7vw;;
    .w_input {
      position: absolute;
      width: 100%;
      bottom:0;
    }
  }
  
}

@mixin input_tag_style {
    display: inline-block;
    background-color: transparent !important;
    width: 100% !important;
    margin-left: -1000px !important;
    margin-right: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    border-radius: 0 !important;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: none !important;
    border-bottom-width: 0px !important;
    outline: none !important;
    padding-bottom: 2px;
    padding-left: 0;
    padding-top: 0 !important;
    font-family: "Gotham_Pro_Regular";
    width: 100% !important;
}

$color_light_grey:#a9aaaa;//#8a8e8e;//#757777


.trusty_input_container {


  .trusty_input_container.text_area {

    textarea {
      padding-top: 6vw;
    }

    ._input_space {
      height: 6vw;
      transition: all .2s;
    }
    &.opened_text_area {
      label {
        top: 1vw;
        bottom: initial;
      }
      textarea {
        height: 80%;
      }
      ._input_space {
        height: 30.5vw !important;
      }
    }
  }

  ._input_space.active_input {
    margin-top: 0;
    input, textarea {
      margin-left: 0 !important;
    }
  }

  .trusty_place_holder.no_opened {
    width: 100%;
    font-family: Gotham_Pro_Regular;
    text-transform: uppercase;
    color: white !important;
    letter-spacing: .13vw !important;
    font-size: 2vw !important;
    letter-spacing: .4vw;
    bottom: .4vw;
    position: absolute;
    color: white;
  }

  .w_input {
    position: relative;
    @media screen and (min-width: 769px) {
      margin-top: .4vw;
    }
  }

  input {
    height: 3.2vw;
    font-size: 2.4vw !important;
    font-family: "Gotham_Pro_Regular";
  }

  label {
    font-family: Gotham_Pro_Regular;
    color: $color_light_grey;
    transition: all .2s;
    font-size: 1.5vw;
    margin-bottom: 0 !important;
    text-transform: uppercase;
  }


  textarea {
    padding-left: 0;
    width: 100%;
    border: none;
    height: 22vw;
    outline: none;
    font-size: 2.4vw;
    color: white;
    height: 6.4vw;
    font-family: "Gotham_Pro_Regular";
  }

  ._right_space{
    display: inline-block;
    position: absolute;
    bottom:0;
    right:0;
    span {
      display: inline-block;
      color: white;
      font-family: 'Gotham_Pro'
    }
  }


  select {
    -webkit-appearance: none;
    background: transparent;
    outline: none;
    margin: 0 0  !important;
    border: none !important;
    font-family: 'Gotham_Pro_Medium';
    padding-bottom: 1vw !important;
    padding-right: 0 !important;
    color: white !important;
    height: 100%;

    option {
      background-color: black;
    }
  }



  ._input_space {

    width: 100%;
    border-bottom: 1px solid $color_light_grey;
    input {
      color: white;
      @include input_tag_style;
    }


    @media screen and (min-width: 769px) {
      height: 5vw;
    }

    input::placeholder {
      font-family: Gotham_Pro_Regular;
      text-transform: uppercase;
      color: white !important;

      @media screen and (max-width: 768px) {
        letter-spacing: .23vw !important;
        font-size: 5.4vw !important;
        //font-size: 4vw !important;
        letter-spacing: .4vw;
      }

    }

    input:focus, input:hover {
      border-top: none;
      border-right: none;
      border-left: none;
      border-bottom: 1px solid white;
      outline: none !important;
    }

    textarea {
      margin-left: -1000px !important;
    }

    textarea:hover, textarea:active, textarea:focus, textarea {
      background-color: transparent !important;
      border-radius: 0 !important;
    }

  }


  &.select_input {

    select {
      padding-bottom: 0 !important;
      @include input_tag_style;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;

    }

    .active_input {
      select {
        margin-left: 0 !important;
      }
    }
  }

  span.fake_option_width {
    position: absolute;
    z-index: -1000;
    opacity: 0;
    font-size: 1.5vw;
    font-family: Gotham_Pro_Bold;
  }

  .trusty_arrow_down {
    position: absolute;
    right: 0;
    width: 2vw;
    top:25%;
  }


}


@import "./mobile.scss";

</style>
