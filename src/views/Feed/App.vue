<template>
<div class="feed_container">
    <FeedNavigation />
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
            <Buzz 
                :Tweet="Buzz" 
                :key="Buzz.id"
                @toggleComments="commentsToggle = true" 
            />
        </template>
    </div>
    <CommentsView v-if="commentsToggle" @toggle="commentsToggle = false"/>
</div>
</template>

<script>
import Buzz from '@/components/Tweet'
import newBuzz from '@/components/UserViewComponents/NewTweet'
import LoadingSpinner from '@/components/LoadingSpinner'
import FeedNavigation from './Components/FeedNavigation'
import debounce from '@/globals/debounce'
import CommentsView from '@/components/CommentsView'

export default {
    name: 'Feed',
    components:{
        Buzz,
        newBuzz,
        LoadingSpinner,
        FeedNavigation,
        CommentsView
    },
    mounted(){
        window.addEventListener('scroll', this.loadAdditionalBuzzes)
        this.dataInitializer()
    },
    destroyed() {
        window.removeEventListener('scroll', this.loadAdditionalBuzzes)
    },
    data(){
        return{
            Buzzes: [],
            isPostingBuzz: false,

            PreviousBuzzesLength: 0,
            BuzzesOffset: 0,
            GLOBAL_OFFSET: 6,
            CanLoadBuzzes: true,
            isLoadingAdditionalBuzzes: false,
            commentsToggle: false
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
        },
        async dataInitializer(){
            const Buzzes = await this.getBuzzes(0)
            this.Buzzes = Buzzes
        },
        getBuzzes(offset){
            return this.axios.get('/feed', { params: { user_id: this.$store.state.User.UserID, offset: offset } 
            }).then(response => {
                return response.data
            }).catch(error => {

            })
        },
        loadAdditionalBuzzes: debounce(async function() {
            if((this.CanLoadBuzzes && !this.isLoadingAdditionalBuzzes && window.innerHeight + window.scrollY) >= document.body.offsetHeight){
                this.BuzzesOffset += this.GLOBAL_OFFSET
                this.isLoadingAdditionalBuzzes = true
                const Buzzes = await this.getBuzzes(this.BuzzesOffset)
                this.isLoadingAdditionalBuzzes = false
                this.SET_CanLoadBuzzes(Buzzes.length)
                this.Buzzes.push(...Buzzes)
            }
        }, 200),
        SET_CanLoadBuzzes(BuzzesSize) {
            if(BuzzesSize === this.GLOBAL_OFFSET) return this.CanLoadBuzzes = true
            this.CanLoadBuzzes = false
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
    align-items: center;
    flex-direction: column;
}
.Buzz_container{
    width:40vw;
    margin-top: 70px;
    padding-bottom: 20px;
}
</style>
