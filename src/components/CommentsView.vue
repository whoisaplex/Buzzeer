<template>
<div class="dialog_container" @click="closeComment($event)">
    <div class="main_container">
        <textarea v-model="CommentInput" placeholder="Write a comment..."/>
        <div class="button_container">
            <button @click="postComment()">Comment</button>
        </div>
        <div class="comments_container">
            <Comment v-for="Comment in Comments" :key="Comment.id" :Comment="Comment"/>
            <p v-if="hasLoadedComments && 
                Comments.length === 0"
                class="comment_nocontent"
            >
                There are no comments to load...
            </p>
        </div>
    </div>
</div>
</template>

<script>
import Comment from './Comment'
export default {
    name: 'CommentsView',
    components: {
        Comment
    },
    data(){
        return {
            Comments: [],
            CommentInput: '',
            isPostingComment: false,
            isLoadingComments: false,
            hasLoadedComments: false,
        }
    },
    methods: {
        closeComment(event){
            if(event.srcElement.className !== '' && event.srcElement.className === 'dialog_container'){
                this.$emit('toggle')
            }
        },
        postComment(){
            if(this.isPostingComment || this.CommentInput === '') return
            this.isPostingComment = true
            const postData = {
                BuzzId: this.$store.state.Comment.BuzzId,
                CreatorId: this.$store.state.User.UserID,
                CreatorName: this.$store.state.User.Fullname,
                CreatorUsername: this.$store.state.User.Username,
                content: this.CommentInput
            }
            this.axios.post('/comments', postData)
            .then(response => {
                this.Comments.unshift(response.data[0])
            }).catch(() => {

            }).finally(() => {
                this.CommentInput = ''
                this.isPostingComment = false
            })
        },
        getComments(){
            if(this.isLoadingComments) return
            this.isLoadingComments = true
            this.axios.get('/comments', {
                params: {
                    BuzzId: this.$store.state.Comment.BuzzId
                }
            })
            .then(response => {
                this.Comments = response.data
            }).catch(() => {

            }).finally(() => {
                this.isLoadingComments = false
                this.hasLoadedComments = true
            })
        }
    },
    mounted(){
        this.getComments()
    }
}
</script>

<style scoped>
.dialog_container{
    width:100vw;
    height:100vh;
    position:fixed;
    top:0px;
    left:0px;
    background:rgba(0, 0, 0, 0.6);
    z-index:2;
    display:flex;
    justify-content: center;
    align-items: center;
}
.main_container{
    width:50vw;
    height:85vh;
    background:#181818;
    box-shadow: 0px 1px 4px #060606;
    display:flex;
    flex-direction: column;
    align-items: center;
}
.comments_container{
    width:70%;
    height: calc(100% - 150px);
    margin-top:15px;
    overflow-y: auto;
    display:flex;
    flex-direction: column;
    align-items: center;
}
.button_container{
    width:70%;
    display:flex;
    justify-content: flex-end;
}
.comment_nocontent{
    color:grey;
}
button{
    padding: 10px 15px;
    margin-top:10px;
    background: #e32b96;
    border:none;
    color:white;
    cursor:pointer;
    border-radius: 3px;
}
textarea{
    background: #121212;
    width:70%;
    outline:none;
    border:none;
    padding: 10px 15px;
    margin-top:25px;
    resize: none;
    color:white;
    box-sizing: border-box;
    border: solid #828282 1px;
}
</style>

