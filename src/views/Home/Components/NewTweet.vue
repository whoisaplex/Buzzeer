<template>
<div class="container_newtweet">
    <textarea v-model="TweetText" placeholder="What do you want to talk about?"/>
    <div class="action_container">
        <button @click="$parent.CancelTweet()" class="cancel_button">Cancel</button>
        <button @click="PostTweet()">Buzz</button>
    </div>
</div>
</template>

<script>
export default {
    name: 'NewTweet',
    data(){
        return {
            TweetText: ''
        }
    },
    methods: {
        PostTweet(){
            this.axios.post('/Tweet', {
                UserID: this.$store.state.User.UserID,
                Fullname: this.$store.state.User.Fullname,
                Username: this.$store.state.User.Username,
                content: this.TweetText
            })
            .then((response) => {
                this.$parent.AddNewTweet(response.data)
                this.$parent.CancelTweet()
            })
        }
    }
}
</script>

<style scoped>
.container_newtweet{
    width:40vw;
    background:#fbfbfb;
    box-shadow: 0px 1px 2px #bcbcbc;
    border-radius: 5px;
    display:flex;
    flex-direction: column;
    align-items: center;
}
textarea{
    width:calc(100% - 40px);
    height:60px;
    resize: none;
    outline:none;
    box-shadow: 0px 0px 1px #bcbcbc;
    padding: 5px;
    margin-top:10px;
    border: none;
    border-radius: 0px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
textarea::placeholder{
    color:#999999;
}
.action_container{
    width:calc(100% - 20px);
    display:flex;
    justify-content: flex-end;
}
button{
    margin:10px 5px 10px 10px;
    padding: 8px 20px;
    border: none;
    background: #e32b96;
    color: #fbfbfb;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    outline:none;
}
.cancel_button{
    background: none;
    color: #121212;
}
</style>

