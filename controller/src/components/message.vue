<template>
    <div @click="sendBubble()" class="mouseover message" style="padding:10px; margin-right:10px;">
      <span class="message-text"> {{text}} </span>
      <br>
      <b-img v-if="src" :src="src" fluid alt="Responsive image" style="max-width: 200px;"/>
    </div>
</template>

<script>
import axios from 'axios';

const domain = "http://bernhardjordan.space";

export default {
  name: 'Message',
  components: {
  },
  props:{
    text: String,
    src: String
  },
  methods:{
    sendBubble(){
      axios.post(domain + "/chatbotmessage", null, { params: {
        text: this.text,
        src: this.src
      }})
    }
  }
}
</script>

<style>
.message{
  border-radius: 20px;
  padding: 10px;
  width: 300px;
  min-height: 140px;
  background-color:var(--gray1);
  text-align: left;
  float: left;
  padding-left: 15px;
  margin: 15px;
}
.message-text{

}
.timestamp{
  font-size: small;
  color: var(--gray2);
}
.mouseover :hover{
  cursor: pointer
}
</style>
