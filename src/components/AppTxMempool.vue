<template>
      <v-tab-item
        :id="'tab-' + height"
        :key="height"
      >
      <v-card flat>
        <v-card-text>{{ height }}</v-card-text>
        <v-data-table
          :headers="headers"
          :items="txlist"
          :loading="true"
          class="elevation-1"
        >
       <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
       <template slot="headerCell" slot-scope="props">
         <v-tooltip bottom>
           <span slot="activator">
             {{ props.header.text }}
           </span>
           <span>
             {{ props.header.text }}
           </span>
         </v-tooltip>
       </template>
       <template slot="items" slot-scope="props">
         <td class="text-xs-right">{{ props.item.mempooltxid}}</td>
       </template>
       </v-data-table>
     </v-card>
   </v-tab-item>
</template>
<script>
import control from './kmdrpc/control'
import blockchain from './kmdrpc/blockchain'

const rpc = control.connect("http://176.9.138.124:7777/http://127.0.0.1:14441","user2938311325","pass62443382fef529aa1a580f39d9f11578db5f84525acf261a54eb7245cf4b72e5e1")

  export default {
    components: {
    },
    data () {
      return {
        height: "mempool",
	txlist: [],
        headers: [
          { text: 'txid', value: 'mempooltxid' }
        ]
      }
    },
    created() {
      console.log("getrawmempool on create")
      blockchain.getrawmempool(rpc, true).then(resp=>{
	console.log(resp)
	for(let i = 0 ; i < resp.length ; i++){
	    console.log(resp[i])
	    this.txlist.push(resp[i])
	}
      }).catch(function(error){
	console.log(error)
      })
    },
    methods: {
      newTx: function(newTx) {
	console.log("New tx received")
	console.log(newTx)
	this.txlist.push(newTx)
      }
    }
  }
</script>
