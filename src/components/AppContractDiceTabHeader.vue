<template>
    <v-tab
      :href="'#tab-' + name"
      :key="name"
    >
      CC {{ name }}
    </v-tab>
</template>
<script>
  export default {
    components: {
    },
    data () {
      return {
        name: "dice",
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>
