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
import control from "@/app/shared/components/kmdrpc/control";
import faucetCC from "@/app/shared/components/kmdrpc/faucet";
    const rpc = control.connect("http://127.0.0.1:7777/http://127.0.0.1:12277","user1984893534","pass2c68465da8ed56a9594091d6dcf6f90e5882b8d6b69953c63699bc38025988e944")


export default {
  components: {},
  data() {
    return {
      name: "faucetCC",
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
