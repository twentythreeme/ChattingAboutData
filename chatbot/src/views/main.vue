<template>
<b-container>
  <b-row style="height:100vh">
    <b-col></b-col>
    <b-col cols="10" class="chat-container">
      <b-row style="margin-top:10px">
        <b-col cols="1">
          <div style="float:left">
            <b-avatar variant="info" :src="botimg" size="4rem"></b-avatar>
          </div>
        </b-col>
        <b-col align-self="center">
          <h2 style="text-align:left; margin-top:10px; padding-left:20px">Wahl Chatbot</h2>
        </b-col>
        <b-col>
          <div style="display: flex; justify-content: right; margin-top:5px">
            <ExportButton :data="messages" ref="export" />
          </div>
        </b-col>
      </b-row>
      <b-row style="padding-top: 10px">
        <b-col class="chat-window" id="chat-window" ref="chatWindow">
          <Message v-for="(message, idx) in messages" :key="message.text + idx" :direction="message.direction" :text="message.text" :time="message.time" :src="message.src" :message="message" @imgClick="imgClicked" />
        </b-col>
      </b-row>
      <b-row>
        <div style="display: flex; justify-content: center; margin-top:5px">
          <RecordButton v-on:newMessage="newMessage" />
        </div>
      </b-row>
    </b-col>
    <b-col>
    </b-col>
  </b-row>
  <b-modal id="modal" :hide-footer="true" centered size="xl">
    <b-carousel id="carousel-1" v-model="slide" controls indicators :interval="0" :no-animation="true" no-hover-pause label-next="" label-prev="" background="#aaaaaa" style="text-shadow: 1px 1px 2px #333;" ref="carousel">
      <b-carousel-slide v-for="(img, idx) in getImages()" :key="img + idx" :img-src="img.src"></b-carousel-slide>
    </b-carousel>
    <div style="text-align: center">
      <b-button variant="outline">
        <b-icon icon="arrow-left" @click="$refs.carousel.prev()" />
      </b-button>
      <b-button variant="outline">
        <b-icon icon="arrow-right" @click="$refs.carousel.next()" />
      </b-button>
    </div>
  </b-modal>

</b-container>
</template>

<script>
import axios from 'axios';
import Message from '../components/message.vue'
import RecordButton from '../components/recordButton.vue'
import ExportButton from '../components/export.vue'

let domain = "https://bernhardjordan.space";

export default {
  name: 'Main',
  components: {
    Message,
    RecordButton,
    ExportButton
  },
  data: () => ({
    messages: [{
        direction: 0,
        text: "Hallo! Ich bin Bruno, ein Chatbot! 🤖",
        time: "00:00"
      },
      {
        direction: 0,
        text: "Ich kann dir Fragen rund um die Nationalratswahlen 🗳 in Österreich beantworten. Im Moment bin ich noch in Entwicklung 🛠 und brauche eventuell einen Moment ⌛️ länger um deine Fragen zu beantworten.",
        time: "00:00"
      },
      {
        direction: 0,
        text: "Mein Entwickler möchte mit dir und mir eine Studie durchführen und herausfinden, wie gut wir zwei uns verstehen. Deswegen werde ich dir Anweisungen geben und dich durch diese Studie führen. Zu allererst öffne bitte folgende Seite und starte mit einer kleinen Umfrage: https://forms.gle/bF63LetxXuirH6dF9",
        time: "00:00"
      },
      {
        direction: 0,
        text: "Um mit mir zu sprechen, schick mir eine Sprachnachricht 🔊. Klick dafür auf den Button 🎙 unten, halte ihn solange du sprichst, und lass ihn los um die Frage abzuschicken.",
        time: "00:00"
      },
      {
        direction: 0,
        text: "Probieren wir das gleich aus:",
        time: "00:00"
      },
      {
        direction: 0,
        text: "Begrüß' mich!",
        time: "00:00"
      },
    ],
    slide: 0,
    botimg: require('../assets/imgs/bot.png')
  }),
  methods: {
    newMessage(duration) {
      this.messages.push({
        direction: 1,
        text: "",
        time: this.getTimeString(),
        src: this.getWave(duration),
        duration: duration,
        timestamp: Date.now()
      })
    },

    getWave(duration) {
      console.log(duration)
      if (duration < 100) {
        return require('../assets/imgs/wave0.png')
      } else if (duration < 500) {
        return require('../assets/imgs/wave1.png')
      } else if (duration < 900) {
        return require('../assets/imgs/wave2.png')
      } else if (duration < 1400) {
        return require('../assets/imgs/wave3.png')
      } else if (duration < 2400) {
        return require('../assets/imgs/wave4.png')
      } else if (duration < 4000) {
        return require('../assets/imgs/wave5.png')
      } else if (duration < 6000) {
        return require('../assets/imgs/wave6.png')
      } else {
        return require('../assets/imgs/wave7.png')
      }

    },
    getTimeString() {
      const now = new Date()
      var minutes = now.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes
      }
      return now.getHours() + ":" + minutes;
    },
    getMessage() {
      this.messages.push({
        direction: 0,
        text: "New Message",
        time: this.getTimeString()
      })
    },
    getIncomingMessage(message) {
      console.log(message)
      this.messages.push(message)
    },
    loadMessage() {
      axios
        .get(domain + "/chatbotmessage")
        .then(response => {
          //console.log(response)
          if (response.data != "NONE") {
            this.messages.push({
              direction: 0,
              text: response.data.text,
              src: response.data.src,
              time: this.getTimeString(),
              timestamp: Date.now()
            })
          }
        })
    },
    getImages() {
      let allImgs = this.messages.filter(entry => entry.src != undefined && entry.direction == 0)
      console.log(this.messages.filter(entry => entry.src != undefined && entry.direction == 0))
      return allImgs
    },
    goToCarouselIndex(message) {
      console.log(message)
      let images = this.getImages()
      let index = images.indexOf(message)
      console.log(index)
      this.slide = index
      //this.$refs.carousel.setSlide(index);
    },
    imgClicked(message) {
      this.goToCarouselIndex(message)
    }
  },


  watch: {
    messages: function() {
      this.$nextTick(function() {
        var container = this.$refs.chatWindow;
        container.scrollTop = container.scrollHeight + 120;
      });
    }
  },
  created() {
    this.messages.forEach(message => message.time = this.getTimeString());
    this.interval = setInterval(() => this.loadMessage(), 1000);
    window.addEventListener('beforeunload', function(e) {
      e.preventDefault();
      e.returnValue = 'Bitte JSON downloaden!';

    })

  },
}
</script>

<style>
.chat-container {
  box-shadow: 0 0 1em lightgray;
  background-color: var(--gray1);
}

.chat-window {
  background-color: white;
  margin: 10px 10px 10px 10px;
  padding: 10px;
  border-radius: 25px;
  height: 83vh;
  overflow: scroll;
}
</style>
