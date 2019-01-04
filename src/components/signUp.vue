<script>
  export default {
    $_veeValidate: {
      validator: 'new'
    },
    methods: 
    {
      router()
      {

        // call to global function redirect to redirect the user back to the homepage
        // once we have a database connection we won't have to manually input the below.

        this.$root.redirect({
            order:0,
            name:'Home',
            icon:'home',
            command:'/',
            backgroundImage: `homepage_background.jpg`,
            barColor:'rgba(225, 17, 133, 1)'
          });
      },
      level (val) {
        return this.levels[val]
      },
      validateStep()
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
      SignUpUser()
      {
        // have a database call here to save the new user.
      }
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
      wrap
    >
      <v-flex sm12 md12>
        <v-stepper v-model="steps" vertical>
    <v-stepper-step :rules="[() => validated]" :complete="steps > 1" step="1">
      Basic Information
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card color="lighten-1" class="mb-5">
        <v-form >
          <v-text-field 
            :error-messages="errors.collect('username')"
            data-vv-validate-on="blur"
            data-vv-name='username'
            v-validate="'required'" 
            required 
            label="Username" 
            v-model="userData.username" 
          >
          </v-text-field>
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
          
          <v-text-field 
            required 
            label="Password" 
            v-model="userData.password"
            :error-messages="errors.collect('password')"
            data-vv-validate-on="blur"
            type="password"
            name="password"
            v-validate="'required'" 
            ref="password"
          >
          </v-text-field>
          <v-text-field 
          required
          label="Confirm Password" 
          type="password"
          v-model="userData.confirmPassword"
          data-vv-as="password"
          v-validate="'required|confirmed:password'" 
          name="password_confirmation"
          :error-messages="errors.collect('password_confirmation')"
          >
          </v-text-field>
        </v-form>  
      </v-card>
      <v-btn color="primary" @click="validateStep()">Continue</v-btn>
      <v-btn flat @click="router()">Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="steps > 2" step="2">Japanese Knowledge</v-stepper-step>

    <v-stepper-content step="2">
      <v-card color="lighten-1" class="mb-5">
        <v-card-text>
        <v-subheader>Selecting a level means you are knowledgeable of all criteria within that level.</v-subheader>
        <v-subheader>Level of Kanji Proficiency</v-subheader>
        <v-checkbox
              v-model="userData.useWani"
              color="green"
        >
        
        <div slot="label">
          Use my WaniKani key to determine my Japanese kanji proficiency 
        </div>
        </v-checkbox>
        <v-slider
        v-model="userData.kanjiLevel"
        :disabled="userData.useWani"
        :tick-labels="levels"
        always-dirty
        max="5"
        thumb-size="1"
        ticks="always"
      >
        <template
          slot="thumb-label"
          slot-scope="props"
        >
          <span>
            {{ level(props.value) }}
          </span>
        </template>
      </v-slider>
      
      <v-subheader>Level of Grammar Proficiency</v-subheader>
        <v-slider
        v-model="userData.grammarLevel"
        :tick-labels="levels"
        always-dirty
        max="5"
        thumb-size="1"
        ticks="always"
      >
        <template
          slot="thumb-label"
          slot-scope="props"
        >
          <span>
            {{ level(props.value) }}
          </span>
        </template>
      </v-slider>

      <v-subheader>Level of Vocabulary Proficiency</v-subheader>
        <v-slider
        v-model="userData.vocabularyLevel"
        :tick-labels="levels"
        always-dirty
        max="5"
        thumb-size="1"
        ticks="always"
      >
        <template
          slot="thumb-label"
          slot-scope="props"
        >
          <span>
            {{ level(props.value) }}
          </span>
        </template>
      </v-slider>

      <v-autocomplete
        :items="possibleImprovements"
        item-value="name"
        item-text="name"
        label="Known improvements needed"
        autocomplete
        multiple
        chips
        deletable-chips
        small-chips
        v-model="userData.improvements"
      >
      </v-autocomplete>
      </v-card-text>
      </v-card>
      <v-btn color="primary" @click="steps = 3">Continue</v-btn>
      <v-btn flat @click="steps = steps - 1">Go Back</v-btn>
      <v-btn flat @click="router()">Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="steps > 3" step="3">Wanikani Key<small>Optional</small></v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="lighten-1" class="mb-5" height="200px">
        <v-text-field label="WaniKani Key" v-model="userData.wanikaniKey" ></v-text-field>
      </v-card>
      <v-btn color="primary" @click="SignUpUser()">Sign Up</v-btn>
      <v-btn flat @click="steps = steps - 1">Go Back</v-btn>
      <v-btn flat @click="router()">Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>


