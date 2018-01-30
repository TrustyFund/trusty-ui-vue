<template lang="pug">

.trusty_input_container(:style="styleSheet", :class="classes")
  
  .w_input
    ._input_space(ref="input_space", :class="{ active_input: opened }")

      label(
        @click="opened = true",
        :class="{no_opened: !opened}"
      ).trusty_place_holder {{ label }}

      slot(name="input")

    ._right_space

      slot(name="right")

  
</template>

<script>
import listen from 'event-listener';

export default {

  props: {
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
    }
  },

  watch: {
    opened(val) {
      if (val) {
        const current = this.type === 'textarea' ? 'textarea' : 'input';
        const target = this.$refs.input_space.querySelector(current);
        target.focus();
        this.blur = listen(target, 'blur', () => {
          if (!target.value.length) this.opened = false;
        });
      }
    }
  },

  beforeDestroy() {
    if (this.blur) this.blur.remove();
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
        select_input: this.type === 'select'
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
    //padding-bottom: 1.7vw;
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

  .only_right_arrow {
    span {
      display: inline-block;
      transform: translateY(-6.4vw);
    }
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


  .dropdown-wrapper div {
    margin: 0 0  !important; 
    font-family: 'Gotham_Pro_Regular';
    color: white !important;
  }
  
  .trusty_arrow_down {
    position: absolute;
    right: 0;
    top: 38%;
  }
  
  select {
    margin: 0 0  !important;
    border: none !important; 
    font-family: 'Gotham_Pro_Medium';
    padding-bottom: 1.4vw !important;
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
      //background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+) no-repeat 95% 50%;
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
}

@import "./mobile.scss";

</style>
