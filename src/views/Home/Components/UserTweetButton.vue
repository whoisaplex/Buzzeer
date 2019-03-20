<template>
<div class="container_sub">
    <input type="text" placeholder="Search..."/>
    <button @click="$parent.StartTweet()">Buzz</button>
</div>
</template>

<script>
export default {
    name: 'UserInfo'
}
</script>

<style scoped>
.container_sub{
    display: flex;
    justify-content: flex-end;
    width: calc(100% / 3);
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
input{
    width:210px;
    border:none;
    border-radius: 7px;
    padding-left:10px;
    outline:none;
    font-weight: bold;
}
</style>