<template>
  <v-tabs
    dark
    color="cyan"
    show-arrows
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <!-- <v-tab
      v-for="i in 15"
      :href="'#tab-' + i"
      :key="i"
    >
      Item {{ i }}
    </v-tab> -->

    <v-tab
      v-for="i in contracts"
      :href="'#tab-' + i.name"
      :key="i.name"
    >
      CC {{ i.name }} 
    </v-tab>

    <!-- <v-tabs-items>
      <v-tab-item
        v-for="i in 15"
        :id="'tab-' + i"
        :key="i"
      > -->

    <v-tabs-items>
      <v-tab-item
        v-for="i in contracts"
        :id="'tab-' + i.name"
        :key="i.name"
      >

        <v-card flat>
          <v-card-text>{{ i.description}}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>
<script>
  export default {
    data () {
      return {
        contracts: [
          { 
            name: 'Faucet',
            description: 'Faucet contract is ...'
          },
          { 
            name: 'Dice',
            description: 'Dice contract is ... '
          },
          { 
            name: 'Rewards',
            description: 'Rewards contract is ...'
          },
          {
            name: 'Assets',
            description: 'Assets contract is ...'
          }
        ],
        getinfo: "yo"
      }
    },
    created() {
      this.getinfo = "hi"
    }
  }
</script>