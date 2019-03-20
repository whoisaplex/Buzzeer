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
      if(this.$route.path !== '/' || this.$route.path !== '/signup') return false
      return true
    }
  }
}
</script>


<style>
*{
  padding:0px;
  margin:0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  display:flex;
  background: #fbfbfb;
}
.router{ margin-left:70px; }
</style>
