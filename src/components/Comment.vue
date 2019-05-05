<template>
<div class="comment_container">
    <div class="delete_container" v-show="deleteToggle">
        <div class="delete_button_container">
            <button class="action_button cancel_button" @click="deleteToggle = !deleteToggle">Cancel</button>
            <button class="action_button" @click="deleteComment()">Delete</button>
        </div>
    </div>
    <div class="comment_image"></div>
    <div class="comment_content">
        <div class="user_row">
            <p>
                {{Comment.creatorName}} 
                <span @click="GOTO_User()" class="comment_username">@{{Comment.creatorUsername}}</span>
            </p>
            <div class="spacer"></div>
            <font-awesome-icon v-show="Comment.isOwner" class="trash_icon" @click="deleteToggle = !deleteToggle" icon="trash" />
        </div>
        <p class="comment_content_body">{{Comment.content}}</p>
        <p class="comment_created">{{Comment.created}}</p>
    </div>
</div>
</template>

<script>
export default {
    name: 'Comment',
    props: {
        Comment: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            deleteToggle: false,
            isDeletingComment: false
        }
    },
    methods: {
        GOTO_User(){
            this.$router.push({name: 'user', params: { userid: this.Comment.creatorUsername} })
        },
        deleteComment(){
            if(this.isDeletingComment) return 
            this.isDeletingComment = true
            this.axios.delete('/comments', { data: { commentId: this.Comment.id, BuzzId: this.$store.state.Comment.BuzzId } })
            .then(response => {
                this.$emit('deleteComment', this.Comment.id)
            }).catch(() => {

            }).finally(() => {
                this.isDeletingComment = false
            })
        }
    }
}
</script>

<style scoped>
.comment_container{
    width:95%;
    display:flex;
    color:white;
    box-shadow: 0px 1px 2px #080808;
    border-radius: 3px;
    margin-bottom: 10px;
    background: #1d1d1d;
}
.comment_image{
    width:50px;
    height:50px;
    background:white;
    border-radius:50%;
    margin-top:10px;
    margin-bottom: 10px;
    margin-left: 10px;
}
.comment_content{
    max-width: calc(100% - 80px);
    width: calc(100% - 80px);
    margin-top:10px;
    padding-bottom: 10px;
}
.comment_username{
    font-size: 14px;
    color: #e32b96;
    cursor:pointer;
}
.comment_username:hover{
    text-decoration: underline;
}
.comment_content_body{
    padding-top:5px;
}
.comment_created{
    width:95%;
    font-size: 14px;
    text-align: end;
    color: #828282;
}
.user_row{
    display: flex;
}
.trash_icon{
    cursor:pointer;
    font-size:15px;
    color:#E53935;
}
.delete_container{
    width: calc(33.25vw);
    height: 50px;
    position: absolute;
    display:flex;
    justify-content: flex-end;
}
.delete_button_container{
    width: 200px;
    height: 40px;
    background: #131313;
    position:absolute;
    transform: translate(-5px, 30px);
    border-radius: 3px;
    box-shadow: 0px 1px 2px #0000007d;
    display:flex;
    justify-content: space-evenly;
    align-items: center;
}
.action_button {
    padding: 0px 15px;
    width: calc(50% - 10px);
    height: 80%;
    border: none;
    color:white;
    background: #E53935;
    font-weight: bold;
    cursor:pointer;
    outline:none;
}
.cancel_button{
    background: #424242;
}
p{
    padding: 0px 10px;
}
</style>

