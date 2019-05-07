<template>
<div class="dialog_container" @click="closeRebuzz($event)">
    <div class="main_container">
        <div class="comment_container">
            <h2>Rebuzz this to your followers?</h2>
            <textarea v-model="InputText" type="text" placeholder="Add a comment..."/>
        </div>
        <div class="buzz_container" v-if="!isPostingRebuzz">
            <div class="buzz_user_container">
                <p class="fullname_text">{{$store.state.Comment.BuzzName}} <span class="username_text">@{{$store.state.Comment.BuzzUsername}}</span></p>
            </div>
            <div class="buzz_content_container">
                <p>{{$store.state.Comment.BuzzContent}}</p>
            </div>
        </div>
        <div class="rebuzz_button_container" v-if="!isPostingRebuzz">
            <button @click="sendRebuzz()">Rebuzz</button>
        </div>
        <LoadingSpinner v-if="isPostingRebuzz" class="mt-20"/>
    </div>
</div>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner'
export default {
    name: 'RebuzzView',
    components: {
        LoadingSpinner
    },
    data(){
        return{
            InputText: '',
            isPostingRebuzz: false,
            hasError: false
        }
    },
    methods: {
        closeRebuzz(event){
            if(event.srcElement.className !== '' && event.srcElement.className === 'dialog_container'){
                this.$emit('toggle')
            }
        },
        sendRebuzz(){
            if(this.isPostingRebuzz) return
            this.isPostingRebuzz = true
            const Data = {
                creatorID: this.$store.state.User.UserID,
                creatorName: this.$store.state.User.Fullname,
                creatorUsername: this.$store.state.User.Username,
                content: this.InputText,
                isRebuzz: true,
                OGBuzzId: this.$store.state.Comment.BuzzId,
                OGCreatorName: this.$store.state.Comment.BuzzName,
                OGCreatorUsername: this.$store.state.Comment.BuzzUsername,
                OGContent: this.$store.state.Comment.BuzzContent
            }
            this.axios.post('Rebuzz', Data)
            .then(response => {
                this.$emit('toggle')
            })
            .catch(() => {
                this.hasError = true
            }).finally(() => {
                this.isPostingRebuzz = false
            })
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
.comment_container{
    width:100%;
    background:#0e0e0e;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0px;
    box-shadow: 0 3px 1px -2px #0c0c0c;
}
.buzz_container{
    width: 70%;
    height: 100px;
    background:#1c1c1c;
    border-radius: 5px;
    margin-top: 25px;
    border: solid 1px #1f1f1f;
}
.fullname_text{
    color:white;
    font-weight: bold;
    padding-left: 10px;
    padding-top: 10px;
}
.username_text{
    color:#e32b96;
    font-weight: normal;
}
.buzz_content_container{
    padding-left:10px;
    padding-top: 5px;
    color:white;
}
.rebuzz_button_container{
    width:70%;
    display:flex;
    justify-content: flex-end;
    margin-top:10px;
}
button{
    padding: 10px 15px;
    border:none;
    color:white;
    border-radius: 3px;
    background: #e32b96;
    cursor:pointer;
}
h2{
    color:white;
    margin-bottom: 10px;
}
textarea{
    width:70%;
    padding: 5px 5px;
    resize:none;
    outline:none;
    border:none;
    background:#1e1e1e;
    color:white;
    border-radius: 3px;
}
</style>
