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

    const rpc = control.connect("http://127.0.0.1:7777/http://127.0.0.1:12277","user1717755851","pass738d683196a4b4c3aaae118e85e3fe9cf4b40747933a32cef58cb9b35727a9f490")

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
