<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-layout row wrap>

        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {

    mounted()
    {
     // this.$root.setMenuVisible(true);
     // this.$root.setFooterVisible(true);
    },

    data: () => ({
     styling:`cursor:pointer`,
     headerStyle:`font-size:30px;`
    }),

    computed: {
      username () {
        return this.$route.params.username
      }
    }
    
  }
</script>
