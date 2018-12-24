<template>
  <v-snackbar
      v-model="snackbar"
      bottom
      left
      :color="notification.color"
      :timeout="notification.timeout"
    >
    {{notification.text}}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
</template>
<script>
  export default {
    props:['showNotification','notificationInformation'],
    data () {
      return {
        notification : {},
        snackbar:false
      }
    },
    created ()
    {

    },
    mounted:function()
    {

    },
    methods : 
    {
      something()
      {

      }
    },
    watch : {
      showNotification(newValue,oldValue)
      {
        if(this.showNotification)
        {
          this.notification = this.notificationInformation; 
          this.snackbar = true;
          console.log(`notificationInformation: ${this.notificationInformation} / ${this.showNotification}`)
        }
      }
    }
    
  }
</script>

<style>

</style>
