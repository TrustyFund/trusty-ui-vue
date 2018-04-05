<template> 
  <div class="spinner" :class="{
    'spinner--static': !absolute,
    'spinner--medium': size === 'medium',
    'spinner--small': size === 'small',
    'spinner--big': size === 'big'
  }"></div>
</template>


<script>

export default {
  props: {
    size: {
      type: String,
      required: false,
      default: 'medium'
    },
    absolute: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {};
  }
};

</script>

<style lang="scss">
  @keyframes spinner {
    to {transform: rotate(360deg);}
  }
  
  .spinner:before {
    content: '';
    box-sizing: border-box;
    border-radius: 50%;
    border: 2px solid gray;
    border-top-color: white;
    animation: spinner .7s linear infinite;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .spinner--medium:before {
    width: 40px;
    height: 40px;
    margin-top: -20px;
    margin-left: -20px;
  }

  .spinner--small:before {
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
  }

  .spinner--big:before {
    width: 60px;
    height: 60px;
    margin-top: -30px;
    margin-left: -30px;
  }

  .spinner--static:before {
    margin-top: 0;
    margin-left: 0;
    position: static;
  }
</style>