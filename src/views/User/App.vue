<template>
<div class="container">
    <div class="banner_container">
        <div v-if="!CHECK_hasError" class="profile_picture"></div>
    </div>
    <div class="Home_navigation_container">
        <UserInfo :User="User" v-if="!CHECK_hasError"/>
        <UserStats :User="User" v-if="!CHECK_hasError"/>
        <UserSearch :isSolo="CHECK_hasError"/>
        <UserFollowButton v-if="!CHECK_hasError" :User="User"/>
    </div>
    <div class="tweets_container">
        <div class="tweets_container_inner">
            <Loader v-if="!hasLoaded && !hasError" />
            <h3 v-if="CHECK_hasError" class="error_msg">
                Error: {{errorMsg}}
            </h3>
            <h3 v-if="!CHECK_hasError && this.Buzzees.length < 1" class="error_msg">
                {{$route.params.userid}} haven't Buzzed anything yet!
            </h3>
            <template v-if="!CHECK_hasError">
                <Tweet 
                    v-for="Tweet in Buzzees" 
                    :key="Tweet.id" 
                    :Tweet="Tweet"
                    :isOwner="false"
                />
            </template>
        </div>
    </div>
</div>
</template>

<script>
import UserStats from '@/components/UserViewComponents/UserStats'
import UserInfo from '@/components/UserViewComponents/UserInfo'
import UserSearch from '@/components/UserViewComponents/UserSearch'
import UserFollowButton from './Components/UserFollowButton'
import debounce from '@/globals/debounce'

import Tweet from '@/components/Tweet'
import Loader from '@/components/LoadingSpinner'

export default {
    name: 'Home',
    components: {
        UserStats,
        UserInfo,
        UserFollowButton,
        UserSearch,
        Tweet,
        Loader
    },
    data () {
        return {
            Buzzees: [],
            User: {},
            PreviousBuzzeesLength: 0,
            BuzzeesOffset: 0,
            CanLoadBuzzees: true,
            hasLoaded: false,
            hasError: false,
            errorMsg: '',
            isTweeting: false,
            isLoadingAdditionalBuzzees: false
        }
    },
    computed: {
        CHECK_hasError () {
            if(this.hasLoaded === true && this.hasError === true) return true
            return false
        }
    },
    methods: {
        async dataInitializer() {
            const User = await this.getUser()
            if(User.error){
                this.errorMsg = User.error
                this.hasLoaded = true
                this.hasError = true
                return
            }
            this.User = User
            const Buzzees = await this.getBuzzees(0)
            this.Buzzees = Buzzees
            
            this.hasLoaded = true
            this.hasError = false
        },
        loadAdditionalBuzzes: debounce(async function() {
            if((this.CanLoadBuzzees && !this.isLoadingAdditionalBuzzees && window.innerHeight + window.scrollY) >= document.body.offsetHeight){
                this.BuzzeesOffset += 5
                this.isLoadingAdditionalBuzzees = true
                const Buzzees = await this.getBuzzees(this.BuzzeesOffset)
                this.isLoadingAdditionalBuzzees = false
                this.SET_CanLoadBuzzees(Buzzees.length)
                this.Buzzees.push(...Buzzees)
            }
        }, 200),
        getUser() {
            return this.axios.get('/users', { params: { username: this.$route.params.userid, my_id: this.$store.state.User.UserID } })
            .then(response => {
                return response.data
            })
            .catch(error => {
                return error.response.data
            })
        },
        getBuzzees(offset) {
            return this.axios.get('/', { params: { username: this.$route.params.userid, offset } })
            .then(response => {
                return response.data
            })
            .catch(error => {
                return error.response.data
            })
        },
        SET_CanLoadBuzzees(BuzzeesSize) {
            if(BuzzeesSize === 5) return this.CanLoadBuzzees = true
            this.CanLoadBuzzees = false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.loadAdditionalBuzzes)
        this.dataInitializer()
    },
    destroyed() {
        window.removeEventListener('scroll', this.loadAdditionalBuzzes)
    }
}
</script>

<style scoped>
.container{
    width: calc(100% - 70px);
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
    padding-bottom: 50px;
}
.error_msg{
    text-align: center;
    color:#6f6f6f;
    padding: 10px 0px;
}
</style>
