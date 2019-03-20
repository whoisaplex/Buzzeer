<template>
<div class="container_sub">
  <h1>{{$store.state.User.Fullname}}</h1>
  <h2>@{{$store.state.User.Username}}</h2>
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
    width: calc(100% / 3);
    flex-direction: column;
}

h1, h2{
    color: #fbfbfb;
    margin-left: 15px;
}
h1{
    font-size: 1.5em;
}
h2{
    font-size: 0.9em;
    font-weight: normal;
    color: #e32b96;
    cursor: pointer;
}
</style>