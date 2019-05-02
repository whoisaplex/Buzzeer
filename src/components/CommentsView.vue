<template>
<div class="dialog_container" v-if="showToggle" @click="closeComment($event)">
    <div class="main_container">
        <textarea placeholder="Write a comment..."/>
        <div class="button_container">
            <button>Comment</button>
        </div>
        <div class="comments_container">
            <Comment/>
            <Comment/>
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
    props: {
        showToggle: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        closeComment(event){
            if(event.srcElement.className !== '' && event.srcElement.className === 'dialog_container'){
                this.$emit('toggle')
            }
        }
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

