<template>
<div class="user_container" @click="GOTO_USER()">
    <p>{{User.firstName}} {{User.lastName}}</p>
    <p>@{{User.username}}</p>
</div>
</template>

<script>
export default {
    name: 'SearchedUser',
    props: {
        User: {
            type: Object,
            required: true
        }
    },
    methods: {
        GOTO_USER(){
            this.$router.push({ name: 'user', params: { userid: this.User.username } })
        }
    }
}
</script>

<style scoped>
.user_container{
    width: 97%;
    padding: 10px 0px;
    background:#181818;
    box-shadow: 0px 1px 2px #0e0e0e;
    color:white;
    border-radius: 5px;
    margin-top: 5px;
    cursor:pointer;
}
.user_container:hover{
    background: #1b1b1b;
}
.user_container:first-of-type{
    margin-top: 0px;
}
p{
    padding: 3px 0px;
    margin-left: 10px;
}
p:last-of-type{
    color:#e32b96;
}
</style>

