<template>
    <div>
	<div class="buttons">
	    <v-btn v-on:click="getnewaddress" color="primary">Get New Address</v-btn>
	    <v-btn color="success">Send</v-btn>
	    <v-btn color="warning">Receive</v-btn>
 	    <v-btn v-on:click="dumpprivkey" color="error">Dump WIF</v-btn>
	    <v-btn @click="validateaddress" color="info">Info</v-btn>
	</div>


    <v-dialog
      v-model="dialog"
      max-width="690"
    >
      <v-card>
        <v-card-title class="headline">Address Info</v-card-title>

        <v-card-text>
         This is your address information 
        </v-card-text>


	    pubkey: "",
	    account: ""
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
	          <v-text-field
	            v-model="address.isvalid"
	            label="Valid"
	            readonly
	          ></v-text-field>
              </v-flex>
              <v-flex xs12>
	          <v-text-field
	            v-model="address.address"
	            label="Address"
	            readonly
	          ></v-text-field>
              </v-flex>
              <v-flex xs12>
	          <v-text-field
	            v-model="address.wif"
	            label="WIF / Priv key"
	            readonly
	          ></v-text-field>
              </v-flex>
              <v-flex xs12>
	          <v-text-field
	            v-model="address.ismine"
	            label="Mine"
	            readonly
	          ></v-text-field>
              </v-flex>
              <v-flex xs12>
	          <v-text-field
	            v-model="address.scriptPubKey"
	            label="Script Pub Key"
	            readonly
	          ></v-text-field>
              </v-flex>
              <v-flex xs12>
	          <v-text-field
	            v-model="address.segid"
	            label="Seg ID"
	            readonly
	          ></v-text-field>
              </v-flex>
              <v-flex xs12>
	          <v-text-field
	            v-model="address.iswatchonly"
	            label="Watch Only"
	            readonly
	          ></v-text-field>
              </v-flex>
              <v-flex xs12>
	          <v-text-field
	            v-model="address.isscript"
	            label="Is Script"
	            readonly
	          ></v-text-field>
              </v-flex>
              <v-flex xs12>
	          <v-text-field
	            v-model="address.iscompressed"
	            label="Compressed"
	            readonly
	          ></v-text-field>
              </v-flex>
              <v-flex xs12>
	          <v-text-field
	            v-model="address.pubkey"
	            label="Pubkey"
	            readonly
	          ></v-text-field>
              </v-flex>
              <v-flex xs12>
	          <v-text-field
	            v-model="address.account"
	            label="Account"
	            readonly
	          ></v-text-field>
              </v-flex>
	    </v-layout>
	  </v-container>


        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Thanks
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>





	<div class="infofield">
	    <v-container>
	      <v-layout row wrap>
	        <v-flex xs12 sm6>
	          <v-text-field
	            v-model="address.address"
	            label="Address"
	            readonly
	          ></v-text-field>
	        </v-flex>
	      </v-layout>
	    </v-container>
	</div>
	<div class="redundant">
	    <br/>
	    address: {{ address.address }} and WIF: {{ address.wif }}
	</div>
	<div class="testarea">
    <v-btn
      :disabled="dialogtest"
      :loading="dialogtest"
      class="white--text"
      color="purple darken-2"
      @click="dialogtest = true"
    >
      Start loading
    </v-btn>
    <v-dialog
      v-model="dialogtest"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          {{ loadingmsg }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
	</div>
    </div>
</template>
<script>
import kmdrpc from './kmdrpc'
import control from './kmdrpc/control'
import wallet from './kmdrpc/wallet'
import util from './kmdrpc/util'
import stdrpc from './kmdrpc/stdrpc_es5'

    const rpc = control.connect("http://176.9.138.124:7777/http://127.0.0.1:9636","user777000","pass777000")
  export default {
    data () {
      return {
	dialog: false,
	dialogtest: false,
	loadingmsg: "Please stand by",
        slider: 1,
	address: {
            address: "empty",
	    wif: "no wif",
	    isvalid: "",
	    scriptPubKey: "",
	    segid: "",
	    ismine: "",
	    iswatchonly: "",
	    isscript: "",
	    pubkey: "",
	    iscompressed: "",
	    account: ""
	}
      }
    },
    watch: {
      dialogtest (val) {
        if (!val) return
        let timeout = 3000
	if( this.address.pubkey != "" ){
	  timeout = 777
	}
	else if( this.address.address == "empty" || this.address.address == "" ){
	    timeout = 1777
	    this.getnewaddress()
	    console.log("Fetching info before an address is set")
	    this.loadingmsg = "Getting a new address first, try again"
	    setTimeout(() => this.dialogtest = false, timeout)
 	}
	else{
	  this.validateaddress(null)
	  this.loadingmsg = "Please stand by"
          setTimeout(() => (this.dialogtest = false, this.dialog=true), timeout)
	}
      }
    },
    methods: {
        getnewaddress: function(event) {
	  this.address.address = ""
	  this.address.wif = ""
	  this.address.isvalid = ""
	  this.address.scriptPubKey = ""
	  this.address.segid = ""
	  this.address.ismine = ""
	  this.address.iswatchonly = ""
	  this.address.isscript = ""
	  this.address.pubkey = ""
	  this.address.iscompressed = ""
	  this.address.account = ""
            
	  wallet.getnewaddress(rpc).then(resp=>{
            console.log("Incoming response")
            console.log(resp)
	    this.address.address = resp
	    this.address.wif = "this is not the wif"
          }).catch(function (error){
            console.log(error)
          })
        },
        dumpprivkey: function(event) {
          wallet.dumpprivkey(rpc, this.address.address).then(resp=>{
            console.log("Incoming response")
            console.log(resp)
	    this.address.wif = resp
          }).catch(function (error){
            console.log(error)
          })
        },
	validateaddress: function(event){
	  console.log("validateaddress")
	  util.validateaddress(rpc,this.address.address).then(resp=>{
	    console.log("validate address response")
	    this.address.isvalid = resp.isvalid
	    this.address.scriptPubKey = resp.scriptPubKey
	    this.address.segid = resp.segid
	    this.address.ismine = resp.ismine
	    this.address.iswatchonly = resp.iswatchonly
	    this.address.isscript = resp.isscript
	    this.address.pubkey = resp.pubkey
	    this.address.iscompressed = resp.iscompressed
	    this.address.account = resp.account
	  }).catch(function (error){
	    console.log(error)
	  })
	}
    }
}
</script>
