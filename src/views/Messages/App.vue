<template>
<div class="messages_container">
    <div class="messages_messages_container">
        <div class="messages_item_container" v-for="conversation in conversations" :key="conversation.id" @click="openConversation(conversation.conversationId)">
            <div class="item_main_row">
                <div class="item_image"></div>
                <div class="item_main_content">
                    <p>{{conversation.userFullname}}</p>
                    <p>@{{conversation.userUsername}}</p>
                </div>
            </div>
            <div class="item_secondary_row">
                <p>{{conversation.lastMessage}}</p>
                <div class="spacer"></div>
                <p>{{conversation.lastCreated}}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Messages',
    data(){
        return{
            conversations: [],
            messages: [],
            textInput: '',
            hasLoadedConversations: false,
            hasLoadedMessages: false,
        }
    },
    methods: {
        openConversation(id){
            this.$router.push({ name: 'conversation', params: { id: id }})
        },
        sendMessage(){
            if(this.textInput === '' || !this.$route.query.conversationId) return
            this.axios.post('/messages', {
                conversationId: this.$route.query.conversationId,
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
        this.axios.get('/messages/conversations', {
            params:{
                userId: this.$store.state.User.UserID
            }
        }).then(response => {
            this.conversations = response.data
        }).catch(() => {

        })
    }
}
</script>

<style scoped>
.messages_container{
    width:100%;
    height: 100vh;
    background:#181818;
    display:flex;
}
.messages_messages_container{
    width:100%;
    height: 100vh;
    background: #0d0d0d;
    display:flex;
    flex-direction: column;
}
.messages_item_container{
    width:100%;
    background:#090909;
    display:flex;
    flex-direction: column;
    cursor:pointer;
}
.messages_item_container:hover{
    background:#0c0c0c;
}

.item_main_row{
    width:100%;
    display:flex;
    align-items: center;
    padding-top: 5px;
}
.item_image{
    width:40px;
    height:40px;
    background:white;
    border-radius: 50%;
    margin: 5px 5px;
}
.item_main_content{
    color: white;
}
.item_secondary_row{
    text-align: end;
    color:#a2a2a2;
    padding: 5px 5px 5px;
    display:flex;
}
</style>

