<template>
  <v-tab-item :id="'tab-' + name" :key="name">
    <v-card flat>
      <v-card-text>Faucet details</v-card-text>
      <v-data-table :headers="headers" :items="faucets" :loading="true" class="elevation-1">
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <span slot="activator">{{ props.header.text }}</span>
            <span>{{ props.header.text }}</span>
          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.funding }}</td>
        </template>
      </v-data-table>
    </v-card>
  </v-tab-item>
</template>
<script>
// import AppFaucetTable from './AppFaucetTable.vue'
import control from "./kmdrpc/control";
import faucetCC from "./kmdrpc/faucet";
const rpc = control.connect(
  "http://127.0.0.1:7777/http://127.0.0.1:12277",
  "user1717755851",
  "pass738d683196a4b4c3aaae118e85e3fe9cf4b40747933a32cef58cb9b35727a9f490"
);

export default {
  components: {},
  data() {
    return {
      name: "FaucetCC",
      faucets: [],
      headers: [
        { text: "Name", value: "name", align: "right", sortable: false },
        { text: "Funding", value: "funding", align: "right", sortable: false }
      ]
    };
  },
  created() {
    faucetCC
      .faucetinfo(rpc)
      .then(resp => {
        console.log("faucetinfo response: " + JSON.stringify(resp));
        let faucet = {};
        faucet.name = resp.name;
        faucet.funding = resp.funding;
        this.faucets.push(faucet);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {}
};
</script>
