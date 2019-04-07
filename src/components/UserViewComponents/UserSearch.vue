<template>
<div :class="{'isSolo' : isSolo}">
    <input  
        type="text" 
        placeholder="Search..."
        @input="searchUsers"
    />
</div>
</template>

<script>
import debounce from '@/globals/debounce'
export default {
    name: 'UserSearch',
    props: {
        isSolo: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        searchUsers: debounce(() => {
        
        }, 500)
    }
}
</script>

<style scoped>
input{
    width:210px;
    height: 40px;
    border:none;
    border-radius: 7px;
    padding-left:10px;
    outline:none;
    font-weight: bold;
}
.isSolo{
    display:flex;
    justify-content: flex-end;
    width:100%;
    margin-right: calc(100% / 3 - 210px);
}
</style>

