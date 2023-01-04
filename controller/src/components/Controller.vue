<template>
<div class="hello">
  <div class="accordion" role="tablist">
    <span v-for="(messages, i) in data" :key="messages.name">
      <b-row>
        <h1 v-b-toggle="'collapse' + i"> {{messages.name}}</h1>
      </b-row>
      <b-collapse :id="'collapse' + i" accordion="myacc">
        <b-row>
          <b-col>
            <Message v-for="(message, idx) in messages.answers" :key="message.text + idx" :text="message.text" :src="message.src" />
          </b-col>
        </b-row>
      </b-collapse>
    </span>
  </div>

  <div class="footer">
    <b-form-textarea id="textarea" v-model="text" placeholder="Enter something..." rows="3" max-rows="6" @keydown.enter.native="enterPress()"></b-form-textarea>
    <b-button variant="primary" @click="sendMessage()">Send</b-button>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Message from '../components/message.vue'
import data from "/public/data/answers.json"

const domain = "http://bernhardjordan.space";

export default {
  name: 'Controller',
  components: {
    Message
  },
  props: {
    msg: String,
  },
  data: function() {
    return {
      data: data,
      input: undefined,
      text: undefined
    }
  },
  methods: {
    sendMessage() {
      axios.post(domain + "/chatbotmessage", null, {
        params: {
          text: this.text
        }
      })
    },
    enterPress() {
      this.sendMessage();
      this.text = undefined
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: left;
  margin: 0 20px 0;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.footer {
  padding: 5pt;
  background-color: rgba(200, 200, 200, 0.8);
  position: sticky;
  bottom: 0;
  width: 100%;
}
</style>
