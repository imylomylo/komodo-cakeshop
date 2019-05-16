<template>
    <div>
	<div class="buttons">
	    <v-btn v-on:click="getnewaddress" color="primary">Get New Address</v-btn>
	    <v-btn color="success">Send</v-btn>
	    <v-btn color="warning">Receive</v-btn>
 	    <v-btn v-on:click="dumpprivkey" color="error">Dump WIF</v-btn>
            <v-btn
	      :disabled="dialogtest"
	      :loading="dialogtest"
	      color="info"
	      @click="dialogtest = true"
	    >
	      Info
	    </v-btn>
	    <v-btn @click="getaddressesbyaccount" color="purple-dark-2">Addresses Debug</v-btn>
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
	<div class="testarea">


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
import kmdrpc from '@/app/shared/components/kmdrpc'
import control from '@/app/shared/components/kmdrpc/control'
import wallet from '@/app/shared/components/kmdrpc/wallet'
import util from '@/app/shared/components/kmdrpc/util'
// import stdrpc from './kmdrpc/stdrpc_es5'

    const rpc = control.connect("http://127.0.0.1:7777/http://127.0.0.1:12277","user1984893534","pass2c68465da8ed56a9594091d6dcf6f90e5882b8d6b69953c63699bc38025988e944")
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
        let timeout = 2777
	if( this.address.pubkey != "" ){
	  timeout = 777
	  this.loadingmsg = "Please stand by"
          setTimeout(() => (this.dialogtest = false, this.dialog=true), timeout)
	}
	else if( this.address.address == "empty" || this.address.address == "" ){
	    timeout = 1777
	    this.getnewaddress()
	    console.log("Fetching info before an address is set")
	    this.loadingmsg = "Getting a new address first then try again"
	    setTimeout(() => this.dialogtest = false, timeout)
 	}
	else{
	  this.validateaddress(null)
	  this.loadingmsg = "Validating...please wait"
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
	},
	getaddressesbyaccount: function(event){
	  console.log("list address groupings")
	  wallet.getaddressesbyaccount(rpc, this.address.account).then(resp=>{
	    console.log("getaddressesbyaccount")
	    console.log(resp)
	  }).catch(function(error){
	    console.log(error)
	  })
	},
	listaddressgroupings: function(event){
	  console.log("list address groupings")
	  wallet.listaddressgroupings(rpc).then(resp=>{
	    console.log("address groupings response")
	    console.log(resp)
	  }).catch(function(error){
	    console.log(error)
	  })
	}
    }
}
</script>
