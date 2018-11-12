<template>
      <v-tab-item
        :id="'tab-' + name"
        :key="name"
      >

        <v-card flat>
          <v-card-text>Faucet details</v-card-text>
        </v-card>
      </v-tab-item>
</template>
<script>
  export default {
    components: {
    },
    data () {
      return {
	name: "FaucetC"
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>
