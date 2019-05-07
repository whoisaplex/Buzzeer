<template>
<div class="feed_navigation_container">
    <input 
        type="text" 
        placeholder="Search for a user"
        v-model="searchInput"
        @input="searchUsers"
    />
    <div class="searched_users_container" v-if="hasLoadedUsers && !isLoadingUsers && !hasErrorLoadingUser">
        <SearchedUser v-for="User in loadedUsers" 
            :key="User.id"
            :User="User" 
        />
        <p class="no_user_text" v-if="loadedUsers.length === 0">There is no match for the searched user...</p>
    </div>
</div>
</template>

<script>
import debounce from '@/globals/debounce'
import SearchedUser from './SearchedUser'
export default {
    name: 'FeedNavigation',
    components: {
        SearchedUser
    },
    data(){
        return{ 
            searchInput: '',
            loadedUsers: [],
            isLoadingUsers: false,
            hasLoadedUsers: false,
            hasErrorLoadingUser: false
        }
    },
    methods: {
        searchUsers: debounce(function(){
            if(this.searchInput === ''){
                this.loadedUsers = []
                this.hasLoadedUsers = false
                return
            }
            this.isLoadingUsers = true
            this.axios.get('/users/searchUser', {
                params: {
                    searchInput: this.searchInput
                }
            }).then(response => {
                this.loadedUsers = response.data
            }).catch(() => {
                this.hasErrorLoadingUser = true
            }).finally(() => {
                this.hasLoadedUsers = true
                this.isLoadingUsers = false
            })
        }, 500)
    }
}
</script>

<style scoped>
.feed_navigation_container{
    position:fixed;
    width:calc(100% - 70px);
    z-index:0;
    height:50px;
    display:flex;
    justify-content: center;
    align-items: center;
    background:#1c1c1c;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
}
.searched_users_container{
    width: 45vw;
    background: #0d0d0d;
    position:absolute;
    top: 50px;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
.no_user_text{
    color:grey;
}
input{
    width:40vw;
    height: 35px;
    background: #121212;
    border:none;
    border-radius: 7px;
    padding-left:10px;
    outline:none;
    font-weight: bold;
    color:white;
}
</style>
