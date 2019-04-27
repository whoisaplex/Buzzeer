<template>
<div class="container_newtweet">
    <textarea v-model="BuzzText" placeholder="What do you want to talk about?"/>
    <div class="action_container">
        <button @click="$emit('cancelBuzz')" v-if="hasCancel" class="cancel_button">Cancel</button>
        <button @click="postBuzz()" :class="{'disabled': isDisabled}">Buzz</button>
    </div>
</div>
</template>

<script>
export default {
    name: 'NewTweet',
    props: {
        hasCancel: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    data(){
        return {
            BuzzText: ''
        }
    },
    computed: {
        isDisabled(){
            return this.BuzzText.length === 0
        }
    },
    methods: {
        postBuzz(){
            if(this.isDisabled) return
            this.$emit('startLoader')
            this.axios.post('/Tweet', {
                UserID: this.$store.state.User.UserID,
                Fullname: this.$store.state.User.Fullname,
                Username: this.$store.state.User.Username,
                content: this.BuzzText
            })
            .then((response) => {
                this.$emit('addNewBuzz', response.data)
                this.$emit('stopLoader')
                this.BuzzText = ''
                if(this.hasCancel) this.$emit('cancelBuzz')
            }).catch(error => {
                this.$emit('stopLoader')
            })
        }
    }
}
</script>

<style scoped>
.container_newtweet{
    width:40vw;
    background:#1d1d1d;
    box-shadow: 0px 1px 2px #0d0d0d;
    border-radius: 5px;
    display:flex;
    flex-direction: column;
    align-items: center;
}
textarea{
    width:calc(100% - 40px);
    height:60px;
    background: #202020;
    resize: none;
    outline:none;
    box-shadow: 0px 0px 1px #bcbcbc;
    padding: 5px;
    margin-top:10px;
    border: none;
    border-radius: 0px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #ffffff;
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
    color: #ffffff;
}
.disabled{
    background:#3a3a3a;
    color: #9b9b9b;
    cursor:default;
}
</style>

