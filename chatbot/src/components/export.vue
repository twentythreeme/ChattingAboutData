<template>
  <b-button @click="exportData"  variant="outline-secondary">
    <b-icon-download/>
  </b-button>
</template>

<script>

export default {
  name: 'Message',
  components: {
  },
  props:{
    data: Array
  },
  methods:{
    exportData(){
      function downloadObjectAsJson(exportObj, exportName){
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }

      const d = new Date();
      let fname = "chatbotdata_" + d.getHours() + "." + d.getMinutes() + "," + d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear()
      downloadObjectAsJson(this.data,fname)
    }
  }
}
</script>

<style>
</style>
