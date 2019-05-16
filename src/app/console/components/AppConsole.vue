<template>
<div>
Get info is:
  <pre>
    {{getinfo}}
  </pre>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-subheader class="pl-0">Always show thumb label</v-subheader>

          <v-slider
            v-model="slider"
            thumb-label
          ></v-slider>
      <div>
        <v-btn v-on:click="generate" small>Generate</v-btn>
      </div>

      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>
<script>
import kmdrpc from '@/app/shared/components/kmdrpc'
import control from '@/app/shared/components/kmdrpc/control'
import generating from '@/app/shared/components/kmdrpc/generating'

    const rpc = control.connect("http://127.0.0.1:7777/http://127.0.0.1:12277","user1984893534","pass2c68465da8ed56a9594091d6dcf6f90e5882b8d6b69953c63699bc38025988e944")
  export default {
    data () {
      return {
	slider: 1,
        getinfo: "will get overwritten"
      }
    },
    methods: {
	generate: function(event) {
	  generating.generate(rpc,this.slider).then(resp=>{
            console.log("Incoming response")
            console.log(resp)
	    control.getinfo(rpc).then(respgetinfo=>{
		this.getinfo=respgetinfo
	    }).catch(function (error){
		console.log(error)
	    })
        }).catch(function (error){
          console.log(error)
        })
	}
    },
    created() {
      this.getinfo = "hi" 

    //   configure rpc connection  
    //const rpc = control.connect("http://176.9.138.124:7777/http://127.0.0.1:7771","user77770000","pass77770000")

    //   pass the configured rpc connection and fire it off to getinfo
    control.getinfo(rpc).then(resp => {
      console.log("Incoming response")
      console.log(resp)
      if( resp == undefined )
         console.log("ERROR")
      this.getinfo=resp.result
    }).catch(function (error){
      console.log(error)
    })
  }
}
</script>
