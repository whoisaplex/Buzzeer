<template>
<div v-if="is_SIGNING || is_CONFIRMED" class="actions_container">
    <div v-if="is_CONFIRMED" class="flex_column_middle">
        <font-awesome-icon icon="check-square" class="icon" />
        <h1>Account created!</h1>
        <button @click="GOTO_Login()">Login</button>
    </div>
    <LoadingSpinner v-if="is_SIGNING"
    color="pink" 
    />
</div>
<div v-else class="signup_container">
    <div class="logo_container">
        <h1>Buzzeer</h1>
        <img src="../../assets/Buzzer.png"/>
    </div>
    <input type="text" v-model="signup_username" placeholder="Username">
    <input type="text" v-model="signup_firstname" placeholder="Firstname">
    <input type="text" v-model="signup_lastname" placeholder="Lastname">
    <input type="password" v-model="signup_password" placeholder="Password">
    <input type="password" v-model="signup_password_confirm" placeholder="Confirm Password">
    <button @click="signup()">SignUp</button>
</div>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner'
export default {
    name: 'Signup',
    components: {
        LoadingSpinner
    },
    data(){
        return{
            is_SIGNING: false,
            is_CONFIRMED: false,

            signup_username: '',
            signup_firstname: '',
            signup_lastname: '',
            signup_password: '',
            signup_password_confirm: '',
        }
    },
    methods: {
        signup(){
            if(this.register_check()){
                this.is_SIGNING = true
                this.axios.post('/userCredentials/register', 
                {
                    username: this.signup_username,
                    firstName: this.signup_firstname,
                    lastName: this.signup_lastname,
                    password: this.signup_password
                }).then(response => {
                    this.is_SIGNING = false
                    this.is_CONFIRMED = true
                }).catch(err => {
                    this.is_SIGNING = false
                    console.log('Username alredy exists')
                })
            }
        },
        register_check(){
            if(
                this.signup_username !== '' && 
                this.signup_firstname !== '' &&
                this.signup_lastname !== '' &&
                this.signup_password !== '' &&
                this.signup_password_confirm !== ''
            )
            {
                if(this.signup_password === this.signup_password_confirm) return true
                return false
            }else{
                return false
            }
        },
        GOTO_Login(){
            this.$router.push({ path: '/' })
        }
    }
}
</script>

<style scoped>
.signup_container, .actions_container{
    width:100vw;
    height:100vh;
    background: #1c1c1c;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
input{
    width:500px;
    padding: 15px 10px;
    margin-top:10px;
    background:#202020;
    border:none;
    border-bottom: #999999 solid 2px;
    outline:none;
    transition: all .3s;
    color:white;
    box-sizing: border-box;
}
input:focus{
    border-bottom: #a53375 solid 2px;
    width:520px;
}
button{
    margin-top:10px;
    width:500px;
    padding: 10px 0px;
    background: #a53375;
    border: solid 2px #a53375;
    color:white;
    font-weight: bold;
    transition: all .3s;
    cursor:pointer;
    outline:none;
}
button:hover{
    background: white;
    color: #a53375;
    border-color: white;
}
img{
    width:50px;
    height:50px;
    margin-left: 10px;
}
.logo_container{
    display:flex;
    align-items: center;
    font-size: 30px;
    color:white;
}
.icon{
    color:#a53375;
    font-size:5em;
}
h1{
    color:white;
}
</style>
