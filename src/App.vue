<template>
  <div id="app">
    <Navigation v-if="isNotStartPage"/>
    <router-view :class="{'router' : isNotStartPage}"/>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
export default {
  name: 'App',
  components: {
    Navigation
  },
  computed: {
    isNotStartPage(){
      if(this.$route.path !== '/' && this.$route.path !== '/signup') return true
      return false
    }
  }
}
</script>


<style>
*{
  padding:0px;
  margin:0px;
}
body{
  max-width:100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  display:flex;
  background: #191919;
  max-width: 100%;
}
.router{ margin-left:70px;}
.flex_column_middle{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
