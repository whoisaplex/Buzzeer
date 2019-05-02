<template>
<div class="comment_container">
    <div class="comment_image"></div>
    <div class="comment_content">
        <p>Hello this is a comment just to see who things are going for you and me brother. And just for the record, even though i seem gay sometimes... im really not. Hello this is a comment just to see who things are going for you and me brother. And just for the record, even though i seem gay sometimes... im really not.</p>
    </div>
</div>
</template>

<script>
export default {
    name: 'Comment'
}
</script>

<style scoped>
.comment_container{
    width:95%;
    display:flex;
    color:white;
    box-shadow: 0px 1px 2px #080808;
    border-radius: 3px;
    margin-bottom: 10px;
    background: #1d1d1d;
}
.comment_image{
    width:50px;
    height:50px;
    background:white;
    border-radius:50%;
    margin-top:10px;
    margin-left: 10px;
}
.comment_content{
    max-width: calc(100% - 80px);
    margin-top:10px;
    padding-bottom: 10px;
}
p{
    padding: 0px 10px;
}
</style>

