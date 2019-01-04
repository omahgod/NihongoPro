<script>
 /* eslint-disable */
  export default {

    mounted()
    {

    },
    created()
    {
      
    },
    props:['currentMenu'],

    data: () => ({
     styling:`cursor:pointer`,
     headerStyle:`font-size:30px;`,
     userData:{},
     dialog:false,
     menu:false,
     errorList:[],
     showSignUpModel:false,
     userSetupData:{},
     signUp:{
      menuTextColor:`black`,
      backgroundImage: `white_backgroud.png`,
      barColor:'rgba(255,255,255, 1)',
      name:'Sign Up',
      icon:'home',
      command:'/signup',
     },
     loginNotification:
     {
       text:`you have logged in successfully`,
       color:`success`,
       timeout:5000
     },
     user: 
      {
        username:'admin',
        password:'password',
      },
      levels:[
        'N5',
        'N4',
        'N3',
        'N2',
        'N1'
      ],
    }),
    computed: {
      username () {
        return this.$route.params.username;
      },
    },
    methods: 
    {
      router()
      {
        this.$root.redirect(
          {
            menuTextColor:`black`,
            backgroundImage: `white_backgroud.png`,
            barColor:'rgba(255,255,255, 1)',
            name:'Forgotten Password',
            icon:'home',
            command:'/forgotten_password',
          }
        );
        this.menu = false;
      },
      loginForm()
      {
        this.errorList=[];
          if(this.validateUserSetup())
          {
            this.dialog = false;
            console.log(`logged in successfully`);
            this.errorList=[];
            this.$root.setLoggedIn(true);
            this.$root.globalNotification(true,this.loginNotification); 
            this.$root.username = this.userData.username;
          }
          else
          {
            this.loginNotification.text=``;
            this.errorList.forEach(error =>{
              this.loginNotification.text += error;
            });
            this.loginNotification.color = `error`;
            this.loginNotification.timeout = 10000;
            this.$root.globalNotification(true,this.loginNotification); 
          }
      },
      validateUserSetup()
      {
        let validateReturn = true;
        if(this.userData.username != this.user.username || this.userData.password != this.user.password)
        {
          validateReturn = false;
          this.errorList.push(`Username or password is incorrect, please try again`);
        }
        if(!this.userData.username)
        {
          validateReturn = false;
          this.errorList.push('Please enter a username and try again.');
        }
        if(!this.userData.password)
        {
          validateReturn = false;
          this.errorList.push('Please enter a password and try again.');
        }
        return validateReturn;
      },
      signUpUser()
      {
        this.menu = false;
        this.$root.router(this.signUp);
        this.$router.push('/signup');
      },
    },
    watch :
    {
      showLogin(newValue,oldValue)
      {
        if (this.showLogin)
        {
          this.errorList = [];
          this.dialog = true ;
        }
      }
    },
    
  }
</script>

<template>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
    >
      <v-btn
        :style="`color:${currentMenu.menuTextColor ? currentMenu.menuTextColor : 'white'}`"  
        slot="activator" 
        large 
        class="buttonStyling"
        flat>
          Log In
        </v-btn>
      <v-card>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" v-model='userData.username' label="Username"></v-text-field>
              <v-text-field prepend-icon="lock" v-model='userData.password' label="Password" type="password"></v-text-field>
            </v-form>
            <v-btn color="primary" class="buttonStyling" flat @click="loginForm()">Log In</v-btn>
            <v-btn flat @click="signUpUser()" class="buttonStyling">Sign Up</v-btn>
            <v-divider></v-divider>
           <v-layout justify-center>
            <a @click="router()">Forgotten Password?</a>
           </v-layout>
          </v-card-text>
      </v-card>
    </v-menu>
</template>