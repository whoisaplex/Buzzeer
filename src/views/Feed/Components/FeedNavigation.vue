<template>
<div class="feed_navigation_container">
    <input type="text" placeholder="Search for a user">
</div>
</template>

<script>
export default {
    name: 'FeedNavigation'
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
input{
    width:40vw;
    height: 35px;
    background: #121212;
    border:none;
    border-radius: 7px;
    padding-left:10px;
    outline:none;
    font-weight: bold;
}
</style>
