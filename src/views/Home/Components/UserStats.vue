<template>
<div class="container_sub">
    <div class="navigation_item">
            <p>Buzzers</p>
            <span>102</span>
        </div>

        <div class="navigation_item">
            <p>Rebuzzers</p>
            <span>56</span>
        </div>

        <div class="navigation_item">
            <p>Followers</p>
            <span>136 K</span>
        </div>
</div>
</template>

<script>
export default {
    name: 'UserStats'
}
</script>

<style scoped>
.container_sub{
    display:flex;
    width: calc(100% / 3);
    justify-content: center;
}
.navigation_item{
    color:#fbfbfb;
    font-weight:bold;
    margin: 0px 10px;
    display:flex;
    flex-direction: column;
    align-items: center;
}
.navigation_item > span {
    color:#e32b96;
}
</style>
