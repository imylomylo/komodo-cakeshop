<template>
    <v-tab
      :href="'#tab-' + name"
      :key="name"
    >
      CC faucetc
    </v-tab>
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
