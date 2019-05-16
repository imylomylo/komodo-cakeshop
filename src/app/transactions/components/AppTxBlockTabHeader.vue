<template>
    <v-tab
      :href="'#tab-' + height"
      :key="height"
    >
      TX {{ height }}
    </v-tab>
</template>
<script>
  export default {
    components: {
    },
    data () {
      return {
        height: "block",
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>
