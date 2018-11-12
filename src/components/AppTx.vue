<template>
<div>
  <v-tabs
    dark
    color="cyan"
    show-arrows
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <AppTxMempoolTabHeader />
    <AppTxBlockTabHeader />

    <v-tabs-items>
      <AppTxMempool/>
      <AppTxBlock/>
    </v-tabs-items>
  </v-tabs>
</div>
</template>
<script>
import AppTxMempoolTabHeader from './AppTxMempoolTabHeader.vue'
import AppTxBlockTabHeader from './AppTxBlockTabHeader.vue'
import AppTxMempool from './AppTxMempool.vue'
import AppTxBlock from './AppTxBlock.vue'

  export default {
    components: {
	AppTxMempoolTabHeader,
	AppTxBlockTabHeader,
	AppTxMempool,
	AppTxBlock
    },
    data () {
      return {
        getinfo: "yo",
      }
    },
    created() {
      this.getinfo = "hi"
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
