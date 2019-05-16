<template>
<div>
  <h2>Peer Info (TONY8)</h2>
  <v-data-table
    :headers="headers"
    :items="peerinfo"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.id}}</td>
      <td class="text-xs-right">{{ props.item.addr}}</td>
      <td class="text-xs-right">{{ props.item.addlocal}}</td>
      <td class="text-xs-right">{{ props.item.services}}</td>
      <td class="text-xs-right">{{ props.item.lastsend}}</td>
      <td class="text-xs-right">{{ props.item.lastrecv}}</td>
      <td class="text-xs-right">{{ props.item.bytessent}}</td>
      <td class="text-xs-right">{{ props.item.bytesrecv}}</td>
      <td class="text-xs-right">{{ props.item.conntime}}</td>
      <td class="text-xs-right">{{ props.item.timeoffset}}</td>
      <td class="text-xs-right">{{ props.item.pingtime}}</td>
      <td class="text-xs-right">{{ props.item.version}}</td>
      <td class="text-xs-right">{{ props.item.subver}}</td>
      <td class="text-xs-right">{{ props.item.inbound}}</td>
      <td class="text-xs-right">{{ props.item.startingheight}}</td>
      <td class="text-xs-right">{{ props.item.banscore}}</td>
      <td class="text-xs-right">{{ props.item.synced_headers}}</td>
      <td class="text-xs-right">{{ props.item.synced_blocks}}</td>
      <td class="text-xs-right">{{ props.item.whitelisted}}</td>
    </template>
  </v-data-table>


</div>
</template>
<script>
import kmdrpc from '@/app/shared/components/kmdrpc'
import control from '@/app/shared/components/kmdrpc/control'
import network from '@/app/shared/components/kmdrpc/network'
// import stdrpc from '@/app/shared/components/kmdrpc/stdrpc_es5'

    const rpc = control.connect("http://127.0.0.1:7777/http://127.0.0.1:12277","user1984893534","pass2c68465da8ed56a9594091d6dcf6f90e5882b8d6b69953c63699bc38025988e944")

    //const rpc = control.connect("http://176.9.138.124:7777/http://127.0.0.1:7771","user77770000","pass77770000")
  export default {
    data () {
      return {
	items: [],
        headers: [
          {
            text: 'ID',
            align: 'left',
            value: 'id'
          },
          { text: 'addr', value: 'addr' },
          { text: 'addrlocal', value: 'addrlocal' },
          { text: 'services', value: 'services' },
          { text: 'lastsend', value: 'lastsend' },
          { text: 'lastrecv', value: 'lastrecv' },
          { text: 'bytessent', value: 'bytessent' },
          { text: 'bytesrecv', value: 'bytesrecv' },
          { text: 'conntime', value: 'conntime' },
          { text: 'timeoffset', value: 'timeoffset' },
          { text: 'pingtime', value: 'pingtime' },
          { text: 'version', value: 'version' },
          { text: 'subver', value: 'subver' },
          { text: 'inbound', value: 'inbound' },
          { text: 'startingheight', value: 'startingheight' },
          { text: 'banscore', value: 'banscore' },
          { text: 'synced_headers', value: 'synced_headers' },
          { text: 'synced_blocks', value: 'synced_blocks' },
          { text: 'whitelisted', value: 'whitelisted' }
        ],
        desserts: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ],
        peerinfo: "will get overwritten"
      }
    },
    methods: {
	first: function(event) {
	}
    },
    created() {
      this.peerinfo = "hi" 

    //   pass the configured rpc connection and fire it off to getpeerinfo
    network.getpeerinfo(rpc).then(resp => {
      console.log("Incoming response")
      console.log(resp)
      this.peerinfo=resp
    }).catch(function (error){
      console.log(error)
    })
  }
}
</script>
