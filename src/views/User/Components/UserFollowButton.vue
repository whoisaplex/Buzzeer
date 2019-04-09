<template>
<div class="container_sub">
    <button @click="onFollow()">{{User.isfollowing ? 'Unfollow' : 'Follow'}}</button>
</div>
</template>

<script>
export default {
    name: 'UserFollowButton',
    props: {
        User: {
            type: Object,
            required: true
        }
    },
    methods: {
        onFollow(){
            const data = {User_id: this.User.id, My_id: this.$store.state.User.UserID}
            if(this.User.isfollowing){
                this.axios.post('/users/unfollow', data).then(response => this.User.isfollowing = !this.User.isfollowing)
            }else{
                this.axios.post('/users/follow', data).then(response => this.User.isfollowing = !this.User.isfollowing) 
            }
        }
    }
}
</script>

<style scoped>
.container_sub{
    display: flex;
    justify-content: flex-end;
    width: calc(100% / 3 - 210px);
}
button{
    padding: 9px 25px;
    border: none;
    background: #e32b96;
    color:#fbfbfb;
    margin: 0px 25px;
    font-weight: bold;
    border-radius: 7px;
    cursor: pointer;
    outline: none;
}
</style>