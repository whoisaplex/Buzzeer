<template>
<div class="container">
    <div class="banner_container">
        <div class="profile_picture"></div>
    </div>
    <div class="Home_navigation_container">
        <UserInfo/>
        <UserStats/>
        <UserTweetButton/>
    </div>
    <div class="tweets_container">
        <div class="tweets_container_inner">
            <Loader v-if="!hasLoaded && !hasError" />
            <h3 v-if="hasLoaded && hasError" class="error_msg">
                There was an error loading your buzzers
            </h3>
            <h3 v-if="hasLoaded && !hasError && this.Tweets.length < 1" class="error_msg">
                You haven't Buzzed anything yet!
            </h3>
            <NewTweet v-if="isTweeting" />
            <Tweet
                v-if="hasLoaded && !hasError" 
                v-for="Tweet in Tweets" 
                :key="Tweet.id" 
                :Tweet="Tweet"
            />
        </div>
    </div>
</div>
</template>

<script>
import UserStats from './Components/UserStats'
import UserInfo from './Components/UserInfo'
import UserTweetButton from './Components/UserTweetButton'

import Tweet from '@/components/Tweet'
import NewTweet from './Components/NewTweet'
import Loader from '@/components/LoadingSpinner'

export default {
    name: 'Home',
    components: {
        UserStats,
        UserInfo,
        UserTweetButton,
        Tweet,
        NewTweet,
        Loader
    },
    data () {
        return {
            Tweets: [],
            hasLoaded: false,
            hasError: false,
            isTweeting: false
        }
    },
    methods: {
        StartTweet(){
            this.isTweeting = true
        },
        CancelTweet(){
            this.isTweeting = false
        },
        AddNewTweet(tweet){
            this.Tweets.unshift(tweet)
        }
    },
    mounted () {
        this.axios.get('/')
        .then(response => {
            this.Tweets = response.data
            this.hasLoaded = true
        })
        .catch(error => {
            this.hasLoaded = true
            this.hasError = true
        })
    }
}
</script>

<style scoped>
.container{
    width: calc(100vw - 70px);
    min-height: 100vh;
}
.banner_container{
    width:100%;
    height:200px;
    background: url('../../assets/nybg.png');
    background-position: center;
    background-size: cover;
    display:flex;
    align-items: center;
    opacity: 0.8;
}
.profile_picture{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: url('../../assets/emptyprofile.png');
    background-position: center;
    background-size: cover;
    margin-left: 25px;
}
.Home_navigation_container{
    width:100%;
    height:60px;
    background:#1c1c1c;
    box-shadow: 0px 0px 2px black;
    display:flex;
    align-items: center;
}
.tweets_container{
    width:100%;
    margin-top:15px;
    display:flex;
    justify-content: center;
}
.tweets_container_inner{
    width:40vw;
}
.error_msg{
    text-align: center;
    color:#6f6f6f;
    padding: 10px 0px;
}
</style>
