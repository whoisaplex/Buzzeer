<template>
<div class="spinner_container">
    <div class="spinner" :style="{'border-color' : getColor()}"></div>
</div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    color: {
      type: String,
      required: false
    }
  },
  methods: {
    getColor(){
      if(this.color === undefined) return 'grey transparent grey transparent'
      const CHOOSEN_COLOR = this.returnColor()
      return `${CHOOSEN_COLOR} transparent ${CHOOSEN_COLOR} transparent`
    },
    returnColor(){
      switch(this.color){
        case 'pink': return '#a53375'
        case 'white': return '#FFFFFF'
        default: return 'grey'
      }
    }
  }
}
</script>

<style scoped>
.spinner_container{
    width:100%;
    display:flex;
    justify-content: center;
}
.spinner{
    width:100px;
    height:100px;
}
.spinner{
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #fff;
    animation: loading_animation 1.2s linear infinite;
}
@keyframes loading_animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

