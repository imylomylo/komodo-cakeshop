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
         <td class="text-xs-right">{{ props.item.timeout}}</td>
         <td class="text-xs-right">{{ props.item.funds}}</td>
         <td class="text-xs-right">{{ props.item.txid}}</td>
       </template>
       </v-data-table>
     <AppDiceTable v-on:new-table="newTable"/>
     </v-card>
   </v-tab-item>
</template>
<script>
import AppDiceTable from './AppDiceTable.vue'
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
          { text: 'timeout', value: 'timeout' },
          { text: 'funds', value: 'funds' },
          { text: 'txid', value: 'txid' }
        ]
      }
    },
    created() {
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
