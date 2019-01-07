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
import kmdrpc from './kmdrpc'
import control from './kmdrpc/control'
import generating from './kmdrpc/generating'
import stdrpc from './kmdrpc/stdrpc_es5'

    const rpc = control.connect("http://176.9.138.124:7777/http://127.0.0.1:54510","user1930586250","pass1fe64d93ce8fbca90b03912fce46d426ba4477895d58e6e23136785dd08eee06a1")
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
      this.getinfo=resp
    }).catch(function (error){
      console.log(error)
    })
  }
}
</script>
