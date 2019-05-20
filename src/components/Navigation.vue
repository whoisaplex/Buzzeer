<template>
<div class="container">
    <div class="navigation_container">
        <img @click="$router.push({name: 'feed'})" src="../assets/Buzzer.png" />
        <font-awesome-icon @click="$router.push({name: 'home'})" class="icon" icon="home" />
        <font-awesome-icon @click="$router.push({name: 'messages'})" class="icon" icon="comments" />
    </div>
    <div class="navigation_spacer"></div>
    <font-awesome-icon class="icon" icon="cog" />
    <font-awesome-icon class="icon" icon="sign-out-alt" @click="Logout()" />
</div>
</template>

<script>
export default {
    name: 'Navigation',
    methods: {
        Logout(){
            this.$store.commit('SET_TOKEN', null)
            this.$store.commit('SET_TOKEN_DATA', {Id: '', Fullname: '', Username: ''})
            this.$router.push({path: '/'})
        }
    }
}
</script>

<style scoped>
.container{
    width:70px;
    height:100vh;
    background:#121212;
    position:fixed;
    display:flex;
    flex-direction: column;
    z-index:1;
}
.navigation_container{
    width:100%;
    display:flex;
    flex-direction: column;
    align-items: center;
}
.icon{
    color:#fbfbfb;
    font-size: 28px;
    margin: 5px 0px;
    padding: 10px 0px;
    width:100%;
    cursor:pointer;
    transition: all .2s;
}
.icon:hover{
    color:#e32b96;
    background:#fbfbfb;
}
.navigation_spacer{
    flex-grow:1;
}
img{
    width:50%;
    margin: 10px 0px 10px;
    cursor:pointer;
}
</style>

