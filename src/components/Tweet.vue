<template>
<div class="tweet_container">
    <div class="tweet_content_row">
        <div class="tweet_image"></div>
        <div class="tweet_content">
            <div class="tweet_content_user">
                <h1>{{Tweet.creatorName}}</h1>
                <h2 @click="$router.push({ name: 'user', params: { userid: Tweet.creatorUsername } })">
                    @{{Tweet.creatorUsername}}
                </h2>
                <h3>- {{Tweet.created}}</h3>
                <div class="spacer"></div>
                <font-awesome-icon v-if="Tweet.isOwner"  @click="ToggleOptions = !ToggleOptions" class="icon buzz_option" icon="ellipsis-h" />
                <div v-if="Tweet.isOwner"
                    class="buzz_option_container" 
                    :style="{'display' : ToggleOptions ? 'flex' : 'none' }"
                    @click="deleteBuzz()"
                >
                    <font-awesome-icon class="delete_icon buzz_option" icon="trash" />
                    <p>Delete</p>
                </div>
            </div>
            <div class="tweet_content_body">
                <p>{{Tweet.content}}</p>
            </div>
            <div v-if="Tweet.isRebuzz" class="rebuzz_container">
                <div class="rebuzz_image_container">
                    <div class="rebuzz_profile_image"></div>
                </div>
                <div class="rebuzz_content_container">
                    <div class="rebuzz_content_info">
                        <p>{{Tweet.OGCreatorName}} <span>@{{Tweet.OGCreatorUsername}}</span></p>
                    </div>
                    <div class="rebuzz_content_content">
                        <p>{{Tweet.OGContent}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="tweet_action_row">
        <div class="action_item_container" @click="likeBuzz()">
            <font-awesome-icon class="icon" :class="{'hearticon_color' : svgHeartStyle.toggle}" :icon="[svgHeartStyle.name, 'heart']" />
            <p>{{Tweet.likeSize}}</p>
        </div>
        <div class="action_item_container" @click="commentBuzz()">
            <font-awesome-icon class="icon" icon="comment-dots" />
            <p>{{Tweet.comments}}</p>
        </div>
        <div v-if="!Tweet.isRebuzz" class="action_item_container" @click="reBuzz()">
            <font-awesome-icon class="icon" icon="retweet" />
            <p>{{Tweet.retweets}}</p>
        </div>
    </div>
</div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    name: 'Tweet',
    props: {
        Tweet: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            ToggleOptions: false,
            isUpdatingBuzz: false,
            svgHeartStyle: {
                name: 'far',
                toggle: false
            }
        }
    },
    mounted(){
        this.svgHeartStyle.toggle = this.Tweet.hasLiked
        this.svgHeartStyle.name = this.svgHeartStyle.toggle ? 'fas' : 'far'
    },
    computed: {
        updateLikesAmount(){
          return this.svgHeartStyle.toggle ? 1 : -1
        }
    },
    methods: {
        deleteBuzz(){
            this.ToggleOptions = false
            if(this.Tweet.isRebuzz){
                this.$emit('deleteRebuzz', { id: this.Tweet.id, ogId: this.Tweet.OGBuzzId })
            }else{
                this.$emit('deleteBuzz', this.Tweet.id)
            }
        },
        likeBuzz(){
            if(this.isUpdatingBuzz) return
            
            this.svgHeartStyle.toggle = !this.svgHeartStyle.toggle
            this.svgHeartStyle.name = this.svgHeartStyle.toggle ? 'fas' : 'far'
            this.Tweet.likeSize += this.updateLikesAmount
            
            const requestPath = this.svgHeartStyle.toggle ? '/likeBuzz' : '/unlikeBuzz'
            this.isUpdatingBuzz = true
            this.axios.post(requestPath, {userid: this.$store.state.User.UserID, Buzzid: this.Tweet.id})
            .then(response => {
                this.isUpdatingBuzz = false
            })
            .catch(error => {
                this.svgHeartStyle.toggle = !this.svgHeartStyle.toggle
                this.svgHeartStyle.name = this.svgHeartStyle.toggle ? 'fas' : 'far'
                this.Tweet.likeSize += this.updateLikesAmount
                this.isUpdatingBuzz = false
            })
        },
        commentBuzz(){
            const StoreDATA = { BuzzId: this.Tweet.id }
            this.$store.commit('SET_COMMENT_DATA', StoreDATA)
            this.$emit('toggleComments')
        },
        reBuzz(){
            const StoreDATA = {
                BuzzId: this.Tweet.id,
                BuzzName: this.Tweet.creatorName,
                BuzzUsername: this.Tweet.creatorUsername,
                BuzzContent: this.Tweet.content
            }
            this.$store.commit('SET_COMMENT_DATA', StoreDATA)
            this.$emit('toggleRebuzz')
        }
    }
}
</script>

<style scoped>
.tweet_container{
    width:100%;
    background:#1d1d1d;
    box-shadow: 0px 1px 2px #0d0d0d;
    border-radius: 5px;
    margin-top: 20px;
}
.tweet_container:first-of-type{ margin-top: 0px; }
.tweet_content_row{
    width: calc(100% - 20px);
    display:flex;
    padding: 20px 10px;   
}
.tweet_content{
    width: calc(100% - 80px);
    margin-left: 10px;
}
.tweet_image{
    width: 50px;
    height:50px;
    background: url('../assets/emptyprofile.png');
    background-position: center;
    background-size: cover;
    border-radius: 50%;
}
.tweet_content_user{
    display:flex;
    align-items: center;
}
.tweet_content_body{
    display:flex;
    margin-top:10px;
    color:#ffffff;
}
.tweet_action_row{
    width: calc(100% - 70px);
    margin-left:70px;
    display:flex;
}
.action_item_container{
    padding: 10px 15px;
    font-weight: bold;
    display:flex;
    align-items: center;
    color: #a61e6d;
    cursor: pointer;
}
.action_item_container, .action_item_container .icon{ transition: all .2s; }
.action_item_container:hover .icon{ color: #e32b96; }
.action_item_container:hover{ color: #e32b96; }
.action_item_container:first-of-type{ padding-left: 0px; }
.icon{
    margin-right: 5px;
    color: #a61e6d;
}
.hearticon_color{
    color:#43A047;
}
.action_item_container:hover .hearticon_color{
    color:#66BB6A;
}
.buzz_option {cursor: pointer;}
h1{
    font-size:1.3em;
    color: #1c1c1c;
    color:#ffffff;
}
h2{
    color: #e32b96;
    font-weight: bold;
    cursor:pointer;
}
h2:hover{
    text-decoration: underline;
}
h3{
    font-weight: normal;
    color:grey;
}
h2, h3{
    font-size:0.9em;
    margin-left: 10px;
}
.buzz_option_container{
    width: 150px; 
    display: none; 
    background: #212121; 
    position:absolute; 
    transform: translate(calc(40vw - 250px + 65px), 30px);
    box-shadow: 0px 1px 2px #00000080;
    color:#F44336;
    cursor:pointer;
}
.buzz_option_container p {
    padding: 10px 0px 10px 5px;
}
.buzz_option_container .delete_icon {
    padding: 10px 0px 10px 5px;
}
.rebuzz_container{
    width:100%;
    background:#1a1a1a;
    border: solid 1px #282828;
    border-radius: 3px;
    margin-top:10px;
    display:flex;
}
.rebuzz_image_container{
    width: 60px;
}
.rebuzz_profile_image{
    width:50px;
    height:50px;
    border-radius: 50%;
    background: white;
    margin: 10px 0px 10px 10px;
}
.rebuzz_content_container{
    width: calc(100% - 70px);
    display:flex;
    flex-direction: column;
    color:white;
}
.rebuzz_content_info{
    margin-top:10px;
    margin-left: 10px;
    font-weight: bold;
}
.rebuzz_content_info span{
    color:#e32b96;
    cursor:pointer;
    font-weight: normal;
}
.rebuzz_content_content{
    margin-left: 10px;
    margin-top: 5px;
}
</style>
