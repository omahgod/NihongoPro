<script>
  export default {
    $_veeValidate: {
      validator: 'new'
    },
    methods: 
    {
      validateMail()
      {
        this.$validator.validateAll()
        .then( async result=>
        {
          this.validated = true;
          if (result)
          {
            this.validated = true;
            this.steps = this.steps + 1;
          }
          else
          {
            this.validated = false;
          }
        });
      },
    },
    data: () => ({
      userData:{},
      steps:1,
      levels:[`N5`,`N4`,`N3`,`N2`,`N1`,`Don't know`],
      possibleImprovements:[`Katakana`,`Hiragana`,`Listening`,`Speaking`,`Writing`,`Reading`],
      validated:true,
    })
  }
</script>

<template>
  <v-container>
    <v-layout
      text-xs-center
      align-center
      row wrap
    >  
      <v-flex xs12>
            <v-subheader class="main_title">Forgotten Password</v-subheader>

            <v-subheader>Enter your email below to change your forgotten password.</v-subheader>
            <v-text-field 
              :error-messages="errors.collect('email')"
              data-vv-validate-on="blur"
              data-vv-name='email'
              v-validate="'required|email'" 
              required
              label="Email" 
              v-model="userData.email" 
            >
            </v-text-field>
      <v-btn color="primary" @click="validateMail()">submit</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>


