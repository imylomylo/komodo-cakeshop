<template>
<div>
Get info is:
  <pre>
    {{getinfo}}
  </pre>
</div>
</template>
<script>
  export default {
    data () {
      return {
        getinfo: "will get overwritten"
      }
    },
    created() {
      this.getinfo = "hi" 

    //   configure rpc connection  

    //   pass the configured rpc connection and fire it off to getinfo
    //    control.getinfo(rpc).then(resp => {
    //      console.log("Incoming response")
    //      console.log(resp)
    //    }).catch(function (error){
    //      console.log(error)
    //    })
    }
  }
</script>
