<template>
    <div>
    <v-btn v-on:click="getnewaddress" color="primary">Get New Address</v-btn>
    <v-btn color="success">Send</v-btn>
    <v-btn color="warning">Receive</v-btn>
    <v-btn v-on:click="dumpprivkey" color="error">Dump WIF</v-btn>
    <v-btn color="info">Info</v-btn>
    <br/>
    address: {{ address }} and WIF: {{ wif }}
  </div>
</template>
<script>
import kmdrpc from './kmdrpc'
import control from './kmdrpc/control'
import wallet from './kmdrpc/wallet'
import stdrpc from './kmdrpc/stdrpc_es5'

    const rpc = control.connect("http://176.9.138.124:7777/http://127.0.0.1:9636","user777000","pass777000")
  export default {
    data () {
      return {
        slider: 1,
        address: "get new address",
	wif: "this is not the wif"
      }
    },
    methods: {
        getnewaddress: function(event) {
          wallet.getnewaddress(rpc).then(resp=>{
            console.log("Incoming response")
            console.log(resp)
	    this.address = resp
	    this.wif = "this is not the wif"
        }).catch(function (error){
          console.log(error)
        })
        },
        dumpprivkey: function(event) {
          wallet.dumpprivkey(rpc, this.address).then(resp=>{
            console.log("Incoming response")
            console.log(resp)
	    this.wif = resp
        }).catch(function (error){
          console.log(error)
        })
        }
    }
}
</script>
