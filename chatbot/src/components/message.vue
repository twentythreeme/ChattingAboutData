<template>
  <div>
  <b-row style="padding:10px">
    <div>
      <div class="message" :class="{ 'outgoing': direction == 1, 'incoming': direction == 0 }">
        <span class="message-text"> {{text}} </span>
        <br v-if="src">
        <div class="images">
          <b-img v-if="src" :src="src" fluid alt="Responsive image" @click="$emit('imgClick', message)" v-b-modal.modal />
        </div>
        <span class="timestamp"> {{time}}</span>
      </div>
    </div>
  </b-row>
</div>
</template>

<script>

export default {
  name: 'Message',
  components: {
  },
  props:{
    direction: Number,
    text: String,
    time: String,
    src: String,
    message: Object
  }
}
</script>

<style>
.message{
  border-radius: 20px;
  padding: 10px;
  max-width: 70%;
}
.incoming{
  background-color:var(--gray1);
  text-align: left;
  float: left;
  padding-left: 15px;

}
.outgoing{
  background-color:var(--first);
  text-align: right;
  float: right;
  padding-right: 15px;
  color: white;
}
.message-text{
}
.timestamp{
  font-size: small;
  color: var(--gray2);
}

.images{
  max-width: 280px;
}
</style>
