<script>
  export default {
    data: () => ({
      username:``,
      password:``,
      confirmPassword:``
    })
  }
</script>

<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-text-field label="Username" v-model="username" ></v-text-field>
        <v-text-field label="Password" v-model="password" ></v-text-field>
        <v-text-field label="Confirm Password" v-model="confirmPassword" ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>


