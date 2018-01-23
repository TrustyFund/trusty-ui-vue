<template lang="pug">

.trusty_input_container(:style="styleSheet", :class="classes")
  .w_input
    .t_input( :class="{active_input: opened }")

      label(
        @click="opened = !opened",
        :class="{no_opened: !opened}"
      ).trusty_place_holder {{ label }}

      slot(name="_input_space")

    .t_right

      slot(name="._right_space")

  
</template>

<script>
	
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
    font-size: 5.4vw !important;
    height: 6.4vw;
    font-family: "Gotham_Pro_Regular";
    width: 100% !important;
}

$color_light_grey:#a9aaaa;//#8a8e8e;//#757777

@media screen and (max-width: 768px) {

  @include column_trusty_inputs;
  
  .trusty_input_container.text_area {
    //margin-bottom: 4.5vw;
    textarea {
      padding-top: 6vw;

    }
    .t_input {
      height: 6vw;
      transition: all .2s;
    }

    &.opened_text_area {
      label {
        top: 1vw;
      }
      .t_input {
        height: 28vw !important;
      }
    }
  }
  

  .trusty_input_container {
    width: 100%;
    .t_input {
      margin-top: 6vw;
    }

    .trusty_place_holder {
      position: absolute;
      left: 0;
      bottom: 6.8vw;    
    }

    .trusty_place_holder.no_opened {
      width: 100%;
      font-family: Gotham_Pro_Regular;
      text-transform: uppercase;
      color: white !important;
      letter-spacing: .23vw !important;
      font-size: 4vw !important;
      letter-spacing: .4vw;
      bottom: 0; 
      padding-bottom: 1.7vw;
      color: white;
    }

    label {
      font-family: Gotham_Pro_Regular;
      color: $color_light_grey;
      transition: all .2s;
      font-size: 2.5vw;
      margin-bottom: 0 !important;
    }

    select, .dropdown-wrapper div {
      font-size: 6.5vw !important;
      color: white;
    }

    .dropdown-wrapper div {
      padding-right: 0vw !important;
      padding-bottom: 1vw;
    }


    .dropdown-wrapper {
      padding-left:0;
      padding-top:0;
      padding-right:0;
      padding-bottom:0;

    }

    ._simple_text_left,
    .trusty_fake_input_show,
    input {
      height: 6.4vw;
      font-size: 5.4vw !important;
      font-family: "Gotham_Pro_Regular";
    }

    .trusty_input_close {
      padding-bottom: 6vw;
    }
     
    textarea {
      padding-left: 0;
    }

    ._simple_text_left {
      text-align: left;
      color: white;
    }
    
    ._right_slash {
      font-size: 5.7vw;
      font-family: Gotham_Pro_Regular;
      margin-bottom: 1.14vw;
      
    }


  }

}


.trusty_deposit_input, 
.trusty_input_container {

  .w_input {
    position: relative;
  }
  
  .only_right_arrow {
    span {
      display: inline-block;
      transform: translateY(-6.4vw);
    }
  }
  .t_right{
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
    option {
      background-color: black;
    }
  }
  
  .t_input.active_input {
    @media screen and (max-width: 768px) {
      margin-top: 0;
      input, textarea {
        margin-left: 0 !important;
      }
    }
  }

  .t_input{
    width: 100%;
    border-bottom: 1px solid $color_light_grey;
    input {
      @include input_tag_style;
    }

    input::placeholder {
      font-family: Gotham_Pro_Regular;
      text-transform: uppercase;
      color: white !important;

      @media screen and (max-width: 750px) {
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

      option {
        //font-size: inherit;
        //height: inherit;
        //font-family: inherit;
      }
    }

    .active_input {
      select {
        margin-left: 0 !important;
      }
    }

  }
}




//Fade in animation

.example-enter {
  opacity: 0.01;
  width: 0px;
}

.example-enter.example-enter-active {
  opacity: 1;
  width: 100px;
  transition: 700ms;
}

.example-leave {
  opacity: 1;
  width: 100px;
}

.example-leave.example-leave-active {
  opacity: 0.01;
  width: 0px;
  transition: 700ms;
}
  


</style>
