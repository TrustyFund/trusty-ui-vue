<template> 
  <div class="spinner"></div>
</template>


<script>

export default {

  props: {
    size: {
      default: 40,
      required: false,
      type: Number
    }
  },
  data() {
    return {};
  }
};

</script>

<style>
  @keyframes spinner {
    to {transform: rotate(360deg);}
  }
   
  .spinner:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    margin-top: -20px;
    margin-left: -20px;
    border-radius: 50%;
    border: 2px solid gray;
    border-top-color: white;
    animation: spinner .7s linear infinite;
  }
</style>