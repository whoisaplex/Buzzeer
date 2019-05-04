<template>
<div class="comment_container">
    <div class="comment_image"></div>
    <div class="comment_content">
        <p>{{Comment.creatorName}} <span @click="GOTO_User()" class="comment_username">@{{Comment.creatorUsername}}</span></p>
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
    methods: {
        GOTO_User(){
            this.$router.push({name: 'user', params: { userid: this.Comment.creatorUsername} })
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
p{
    padding: 0px 10px;
}
</style>

