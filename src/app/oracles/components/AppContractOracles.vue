<template>
  <v-tab-item :id="'tab-' + name" :key="name">
    <v-card flat>
      <v-card-text>{{ name }}</v-card-text>
      <v-data-table :headers="headers" :items="oracles" :loading="true" class="elevation-1">
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <span slot="activator">{{ props.header.text }}</span>
            <span>{{ props.header.text }}</span>
          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.description }}</td>
          <td class="text-xs-right">{{ props.item.format }}</td>
          <td class="text-xs-right">{{ props.item.marker }}</td>
          <td class="text-xs-right">{{ props.item.txid}}</td>
        </template>
      </v-data-table>
      <AppOraclesTable v-on:new-oracle="newOracle"/>
    </v-card>
  </v-tab-item>
</template>
<script>
import AppOraclesTable from "./AppOraclesTable.vue";
import control from "@/app/shared/components/kmdrpc/control";
import oraclesCC from "@/app/shared/components/kmdrpc/oracles";

const rpc = control.connect(
  "http://127.0.0.1:7777/http://127.0.0.1:12277",
  "user1984893534",
  "pass2c68465da8ed56a9594091d6dcf6f90e5882b8d6b69953c63699bc38025988e944"
);

export default {
  components: {
    AppOraclesTable
  },
  data() {
    return {
      name: "oraclesCC",
      oracles: [],
      headers: [
        { text: "Name", sortable: false, align: "left", value: "name" },
        { text: "Description", value: "description" },
        { text: "Format", value: "format" },
        { text: "Marker", value: "marker" },
        { text: "Txid", value: "txid" }
      ]
    };
  },
  created() {
    oraclesCC
      .oracleslist(rpc)
      .then(resp => {
        console.log(resp);
        console.log("length of resp (oracles): " + resp.length)
        for (let i = 0; i < resp.length; i++) {
          oraclesCC
            .oraclesinfo(rpc, resp[i])
            .then(resp => {
              console.log(resp);
              this.oracles.push(resp);
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    newOracle: function(newOracle) {
      console.log("New oracle received");
      console.log(newOracle);
      this.oracles.push(newOracle);
    }
  }
};
</script>
