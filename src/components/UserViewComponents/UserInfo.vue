<template>
<div class="container_sub">
  <h1>{{User.firstName}} {{User.lastName}}</h1>
  <h2>@{{User.username}}</h2>
</div>
</template>

<script>
export default {
    name: 'UserInfo',
    props: {
        User: {
            type: Object,
            required: true
        }
    }
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