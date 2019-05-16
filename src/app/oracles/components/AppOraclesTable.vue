<template>
  <div>
    <v-btn fab bottom right color="pink" dark fixed @click.stop="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="400px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">Create House Oracles Table</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt>
                </v-avatar>
                <v-text-field v-model="name" placeholder="Table name"></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field prepend-icon="business" v-model="minbet" placeholder="Min Bet"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field v-model="maxbet" placeholder="Max Bet"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="funding" prepend-icon="mail" placeholder="Funds"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="maxodds" prepend-icon="phone" placeholder="Max Odds"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="timeoutblocks" prepend-icon="notes" placeholder="Timeout"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <!-- <v-btn flat color="primary">More</v-btn> -->
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="oraclesfund">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import control from "@/app/shared/components/kmdrpc/control";
import oraclesCC from "@/app/shared/components/kmdrpc/oracles";
import rawTX from "@/app/shared/components/kmdrpc/rawtransactions";
import wallet from "@/app/shared/components/kmdrpc/wallet";

const rpc = control.connect(
  "http://127.0.0.1:7777/http://127.0.0.1:12277",
  "user1984893534",
  "pass2c68465da8ed56a9594091d6dcf6f90e5882b8d6b69953c63699bc38025988e944"
);
//const rpc = control.connect("http://176.9.138.124:7777/http://127.0.0.1:14441","user2938311325","pass62443382fef529aa1a580f39d9f11578db5f84525acf261a54eb7245cf4b72e5e1")

export default {
  name: "AppOraclesTable",
  data: () => ({
    dialog: false,
    name: "",
    funding: "",
    minbet: "",
    maxbet: "",
    maxodds: "",
    timeoutblocks: "",
    txid: "",
    tables: []
  }),
  props: {
    source: ""
  },
  methods: {
    magic: function(command) {
      console.log("HEY " + command);
      window.location.href = "#/" + command.toLowerCase().replace(/ /g, "");
    },
    oraclesfund: function(event) {
      let newTable = {};
      newTable.name = this.name;
      newTable.funding = this.funding;
      newTable.minbet = this.minbet;
      newTable.maxbet = this.maxbet;
      newTable.maxodds = this.maxodds;
      newTable.timeoutblocks = this.timeoutblocks;
      oraclesCC
        .oraclesfund(
          rpc,
          this.name,
          this.funding,
          this.minbet,
          this.maxbet,
          this.maxodds,
          this.timeoutblocks
        )
        .then(resp => {
          console.log("oraclesfund");
          console.log(resp);
          rawTX
            .sendrawtransaction(rpc, resp.hex)
            .then(resp => {
              console.log(resp);
              newTable.txid = resp;
              this.tables.push(newTable);
              console.log(this.tables);
              this.name = this.funding = this.minbet = this.maxbet = this.maxodds = this.timeoutblocks =
                "";
              this.$emit("new-table", newTable);
              //		wallet.gettransaction(rpc, resp).then(resp=>{
              //		  console.log(resp)
              //		}).catch(function(error){
              //		  console.log(error)
              //		})
            })
            .catch(function(error) {
              console.log(error);
            });
          this.dialog = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

