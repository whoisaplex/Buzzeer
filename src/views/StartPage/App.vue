<template>
<div class="start_page_container">
    <div class="introduction_container">
        <img src="../../assets/BuzzerWhite.png"/>
        <h1>Buzzeer</h1>
        <h2>Welcome to Buzzeer. This is a complete copy paste website mimicking the popular social media - Twitter</h2>
    </div>
    <div class="login_container">
        <input v-model="login_username" type="text" placeholder="Username">
        <input v-model="login_password" type="password" placeholder="Password">
        <button @click="login()">LOGIN</button>
        <div class="registeraccount_container">
            <p>Don't have an account?</p>
            <button @click="GOTO_Signup()" class="register_button">Register Here</button>
        </div>
    </div>
</div>
</template>

<script>
const jwt_decode = require('jwt-decode')

export default {
    name: 'StartPage',
    data(){
        return {
            login_username: '',
            login_password: ''
        }
    },
    methods: {
        GOTO_Signup(){
            this.$router.push({ path: '/signup' })
        },
        login(){
            if(this.login_username !== '' && this.login_password !== ''){
                this.axios.post('/user/login', 
                {
                    username: this.login_username,
                    password: this.login_password
                }).then(response => {
                    const DECODED_TOKEN = jwt_decode(response.data)
                    this.$store.commit('SET_TOKEN', response.data)
                    this.$store.commit('SET_TOKEN_DATA', DECODED_TOKEN.TOKEN_DATA)
                    this.$router.push({path: '/home'})
                }).catch(err => {
                    //Invalid Credentials
                })
            }
        }
    }
}
</script>

<style scoped>
.start_page_container{
    width:100vw;
    height:100vh;
    display:flex;
    align-items: center;
    background:grey;
}
.introduction_container, .login_container{ height:100%; }
.introduction_container{
    width:60%;
    background:url('../../assets/nybg.png');
    background-position: center;
    background-size: cover;
    display:flex;
    justify-content: center;
    align-items: center;
    color: #fbfbfb;
    flex-direction: column;
}
.login_container{
    width:40%;
    background: #1c1c1c;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
h1{ font-size: 6em;}
h2{
    text-align: center;
    padding: 0px 100px;
}
img{ width:20%; }
input{
    width:80%;
    padding: 20px 10px;
    padding-bottom: 10px;
    margin: 10px 0px;
    outline: none;
    font-size: 1em;
    border:none;
    border-bottom: solid 3px #fbfbfb;
    background: none;
    color:#fbfbfb;
    opacity: 0.5;
    transition: all .2s;
}
input::placeholder{
    color: #a53375;
    font-weight: bold;
}
input:focus{
    opacity:1;
}
button{
    width:80%;
    padding: 20px 10px;
    margin-top:25px;
    box-sizing: content-box;
    background: #a53375;
    border: none;
    color: #fbfbfb;
    font-weight:bold;
    font-size: 1.3em;
    cursor:pointer;
    border-radius: 10px;
    outline:none;
}
.registeraccount_container{
    display:flex;
    width:80%;
    margin-top:25px;
    color: #fbfbfb;
}
.registeraccount_container button {
    padding: 0px;
    margin: 0px;
    background:none;
    width:auto;
    font-size: 1em;
    margin-left:10px;
    font-weight: normal;
    transition: all .3s;
}
.registeraccount_container button:hover {
    color: #a53375;
}
</style>
