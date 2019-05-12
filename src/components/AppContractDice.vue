<template>
      <v-tab-item
        :id="'tab-' + name"
        :key="name"
      >
      <v-card flat>
        <v-card-text>{{ name }}</v-card-text>
        <v-data-table
          :headers="headers"
          :items="tables"
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
         <td class="text-xs-right">{{ props.item.name }}</td>
         <td class="text-xs-right">{{ props.item.minbet }}</td>
         <td class="text-xs-right">{{ props.item.maxbet }}</td>
         <td class="text-xs-right">{{ props.item.maxodds }}</td>
         <td class="text-xs-right">{{ props.item.timeoutblocks}}</td>
         <td class="text-xs-right">{{ props.item.funding}}</td>
         <td class="text-xs-right">{{ props.item.fundingtxid}}</td>
       </template>
       </v-data-table>
     <AppDiceTable v-on:new-table="newTable"/>
     </v-card>
   </v-tab-item>
</template>
<script>
import AppDiceTable from './AppDiceTable.vue'
import control from './kmdrpc/control'
import diceCC from './kmdrpc/dice'

    const rpc = control.connect("http://127.0.0.1:7777/http://127.0.0.1:12277","user1717755851","pass738d683196a4b4c3aaae118e85e3fe9cf4b40747933a32cef58cb9b35727a9f490")

  export default {
    components: {
	AppDiceTable
    },
    data () {
      return {
        name: "dice",
	tables: [],
        headers: [
          { text: 'Table', sortable: false, align: 'left', value: 'name' },
          { text: 'min bet', value: 'minbet' },
          { text: 'max bet', value: 'maxbet' },
          { text: 'max odds', value: 'maxodds' },
          { text: 'timeoutblocks', value: 'timeoutblocks' },
          { text: 'funding', value: 'funding' },
          { text: 'txid', value: 'txid' }
        ]
      }
    },
    created() {
      diceCC.dicelist(rpc).then(resp=>{
	console.log(resp)
	for(let i = 0 ; i < resp.length ; i++){
	  diceCC.diceinfo(rpc,resp[i]).then(resp=>{
	    console.log(resp)
	    this.tables.push(resp)
	  }).catch(function(error){
	    console.log(error)
	  })
	}
      }).catch(function(error){
	console.log(error)
      })
    },
    methods: {
      newTable: function(newTable) {
	console.log("New table received")
	console.log(newTable)
	this.tables.push(newTable)
      }
    }
  }
</script>
