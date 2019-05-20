<template>
<div class="messages_content_container">
    <div class="messages_content">
        <div class="message_item" v-for="message in messages" :key="message.created">
            <div class="message_item_content">
                <p>{{message.content}}</p>
            </div>
            <p class="message_item_created">{{message.createdHumanize}}</p>
        </div>


    </div>
    <div class="messages_input_container">
        <input type="text" v-model="textInput" placeholder="Type a message..." />
        <button @click="sendMessage()">Send</button>
    </div>
</div>
</template>

<script>
export default {
    name: 'Conversation',
    data(){
        return{
            messages: [],
            textInput: '',
            hasLoadedMessages: false,
        }
    },
    methods: {
        sendMessage(){
            if(this.textInput === '' || !this.$route.params.id) return
            this.axios.post('/messages', {
                conversationId: this.$route.params.id,
                userId: this.$store.state.User.UserID,
                userFullname: this.$store.state.User.Fullname,
                userUsername: this.$store.state.User.Username,
                content: this.textInput
            }).then(response => {
                console.log(response.data)
            }).catch(() => {

            }).finally(() => {

            })
        } 
    },
    mounted(){
        this.axios.get('/messages', {
            params: {
                conversationId: this.$route.params.id
            }
        }).then(response => {
            this.messages = response.data
        }).catch(() => {

        })
    }
}
</script>


<style scoped>
.messages_content_container{
    width: 100%;
    height: 100vh;
    display:flex;
    flex-direction: column;
}
.messages_content{
    width:100%;
    height: calc(100vh - 50px);
    display:flex;
    flex-direction: column-reverse;
}
.messages_input_container{
    width:100%;
    height: 50px;
    background: #111111;
    display:flex;
    align-items: center;
}
.messages_input_container > input {
    height: 35px;
    width: calc(100% - 115px);
    margin: 0px 10px;
    padding-left: 10px;
    border: none;
    background: #0d0d0d;
    outline: none;
    color:white;
}
.messages_input_container > button {
    height: 35px;
    width: 75px;
    border: none;
    background: #e22b92;
    color:white;
    font-weight: bold;
    cursor: pointer;
    border-radius: 3px;
}
.message_item{
    width: 100%;
    color:white;
    margin: 10px 0px;
    display:flex;
    flex-direction: column;
}
.message_item_created{
    width: calc(100% - 20px);
    margin-left: 20px;
    font-size: 14px;
    padding-top: 5px;
    color: #828282;
}
.message_item_content{
    width: fit-content;
    max-width: 75%;
    padding: 5px 10px;
    margin-left: 10px;
    background:#0d0d0d;
    border-radius: 10px;
}
</style>
