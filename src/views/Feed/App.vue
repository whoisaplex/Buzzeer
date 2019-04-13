<template>
<div class="feed_container">
    <div class="Buzz_container">
        <newBuzz
            v-show="!isPostingBuzz" 
            @addNewBuzz="addNewBuzz" 
            @startLoader="startLoader" 
            @stopLoader="stopLoader" 
            :hasCancel="false" 
        />
        <LoadingSpinner v-show="isPostingBuzz" />
        <template v-for="Buzz in Buzzes">
            <Buzz :Tweet="Buzz" :key="Buzz.id" />
        </template>
    </div>
</div>
</template>

<script>
import Buzz from '@/components/Tweet'
import newBuzz from '@/components/UserViewComponents/NewTweet'
import LoadingSpinner from '@/components/LoadingSpinner'

export default {
    name: 'Feed',
    components:{
        Buzz,
        newBuzz,
        LoadingSpinner
    },
    mounted(){
        this.axios.get('/feed', { params: { user_id: this.$store.state.User.UserID } })
        .then(response => {
            this.Buzzes = response.data
        }).catch(error => {

        })
    },
    data(){
        return{
            Buzzes: [],
            isPostingBuzz: false
        }
    },
    methods: {
        addNewBuzz(buzz){
            this.Buzzes.unshift(buzz)
        },
        startLoader(){
            this.isPostingBuzz = true
        },
        stopLoader(){
            this.isPostingBuzz = false
        }
    }
}
</script>

<style scoped>
.feed_container{
    width:100%;
    min-height: 100vh;
    background:#191919;
    display:flex;
    justify-content: center;
}
.Buzz_container{
    width:40vw;
    margin-top: 20px;
}
</style>
