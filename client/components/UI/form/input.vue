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
  methods: {
    focusBlur() {
      const current = this.type === 'textarea' ? 'textarea' : 'input';
      const target = this.$refs.input_space.querySelector(current);

      if (target) {
        this.focus = listen(target, 'focus', () => {
          this.opened = true;
        });
        this.blur = listen(target, 'blur', () => {
          if (!target.value.length) this.opened = false;
        });
      }
    },

    selectResize() {
      const select = this.$refs.right_space.querySelector('select');

      function resize() {
        const fake = this.$refs.right_space.querySelector('.fake_option_width');
        const selected = select.options[select.selectedIndex];
        fake.textContent = selected.text;
        select.style.width = fake.offsetWidth + 25 + 'px';
      }

      if (select) {
        resize.call(this);
        this.resize = listen(select, 'change', resize.bind(this));
      }
    }
  },

  mounted() {
    if (this.isOpen) this.opened = true;
    this.focusBlur();
    this.selectResize();
  },

  beforeDestroy() {
    if (this.blur) this.blur.remove();
    if (this.resize) this.resize.remove();
    if (this.focus) this.focus.remove();
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

@import '~@/style/mixins';

.trusty_input_container:not(.text_area) {
	margin-bottom: 2vw;
	position: relative;
	height: 10.7vw;;
	.w_input {
		position: absolute;
		width: 100%;
		bottom:0;
	}
	@media screen and (min-width: 769px) {
		height: px_from_vw(10.7);;
		margin-bottom: px_from_vw(2);
	}
}



@mixin input_tag_style {
		display: inline-block;
		background-color: transparent !important;
		width: 100% !important;
		opacity: 0;
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

		._input_space {
			transition: all .2s;
		}
	}

	._input_space.active_input {
		margin-top: 0;
		input, textarea {
			opacity: 1;
		}
	}

	.trusty_place_holder.no_opened {
		width: 100%;
		font-family: Gotham_Pro_Regular;
		text-transform: uppercase;
		position: absolute;
		color: white;
	}

	.w_input {
		position: relative;
	}

	input {
		font-family: "Gotham_Pro_Regular";
	}

	label {
		cursor: pointer;
		font-family: Gotham_Pro_Regular;
		color: $color_light_grey;
		transition: all .2s;
		text-transform: uppercase;
	}


	textarea {
		padding-left: 0;
		width: 100%;
		border: none;
		outline: none;
		color: white;
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
			opacity: 0;
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

@import "./desk.scss";
@import "./mobile.scss";

</style>
