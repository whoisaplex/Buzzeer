<template>
<div class="spinner_container">
    <div class="spinner"></div>
</div>
</template>

<script>
export default {
    name: 'LoadingSpinner'
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
.spinner::after{
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #fff;
    border-color: grey transparent grey transparent;
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

