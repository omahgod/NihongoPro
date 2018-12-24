<script>
/* eslint-disable */
</script>
<template>
  <v-app footer>
  <v-content>
    <v-img  aspect-ratio="1.7" :src="require(`./assets/${currentMenu.backgroundImage}`)">
    <v-layout row wrap>
      <v-flex sm12 md12>
        <v-toolbar  height="100" app v-if="menuVisible" flat :color="currentMenu.barColor">
          <v-flex></v-flex>
          <v-toolbar-items v-if="loggedIn" v-for="(menu,i) in menus" v-bind:key="i">
                <v-btn :style="`color:${currentMenu.menuTextColor ? currentMenu.menuTextColor : 'white'}`" @click="router(menu)" large class="buttonStyling" flat>{{menu.name}}</v-btn>
          </v-toolbar-items>
          <!--   
            <v-toolbar-items v-else v-for="(menus,index) in loggedOutMenus" v-bind:key="index">
            <v-btn :style="`color:${currentMenu.menuTextColor ? currentMenu.menuTextColor : 'white'}`" @click="router(menus)" large class="buttonStyling" flat>{{menus.name}}</v-btn>
            </v-toolbar-items>
          -->
          <v-spacer></v-spacer>
          <v-toolbar-items v-if="!loggedIn">
            <!-- 
              <v-btn   :style="`color:${currentMenu.menuTextColor ? currentMenu.menuTextColor : 'white'}`" @click="setupAccount(`signup`)" large class="buttonStyling" flat>Sign Up</v-btn>
            -->
            <login :currentMenu="currentMenu"></login>
          </v-toolbar-items>
          <v-toolbar-items v-else>
            <v-card-text>
            <span class="buttonStyling"></span>
            <v-avatar class="clickableButton" :color="userColor" >
              <v-icon dark>account_circle</v-icon> 
            </v-avatar>
            </v-card-text>
          </v-toolbar-items>
        </v-toolbar>
      </v-flex>

      <v-flex sm12 md12>
        <router-view></router-view>
        <notifications :showNotification="showNotification" :notificationInformation="notificationInformation" ></notifications>
      </v-flex>

    </v-layout>
    </v-img>
    </v-content>

   <v-footer v-if="footerVisible"  style="z-index: 2; height: 0px; background: none;">
      <v-card flat class='flex' tile dark style='position: absolute; bottom: top: 100%; left: 0px; right: 0px;'>
        <v-card-title class='secondary'>
            <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
            <v-layout>
                <v-spacer>
                </v-spacer>
                <p class="mb-0">
                    Designed and Created by Kai Corporation<br/>
                    <span>Content &copy; </span><br/>
                    Address Line 1<br/>
                    City<br/>
                    Post Code<br/>
                    <center>
                    </center>
                </p>
            </v-layout>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>

import notifications from '@/components/notifications';
import userProfile from '@/components/userProfile';
import Login from '@/components/login';
import cssStyling from '@/assets/styling.css';

export default {
  name: 'App',
  components: {notifications,userProfile,Login},
  data () {
    return {
      title:'Nihongo Pro',
      loggedIn:false,
      showLogin:false,
      miniVariant:false,
      notificationInformation:{},
      menuVisible:true,
      footerVisible:true,
      setProfileVisible:true,
      drawer:false,
      showNotification:false,
      userColor:'green',
      currentMenu:{
        order:0,
          name:'Home',
          icon:'home',
          command:'/',
          backgroundImage: `homepage_background.jpg`,
          barColor:'rgba(225, 17, 133, 1)',
      },
      loggedOutMenus:[
        {
          order:0,
          name:'Home',
          icon:'home',
          command:'/',
          backgroundImage: `homepage_background.jpg`,
          barColor:'rgba(225, 17, 133, 1)',
        }
      ],
      menus:[
        {
          order:0,
          name:'Home',
          icon:'home',
          command:'/',
          backgroundImage: `homepage_background.jpg`,
          barColor:'rgba(225, 17, 133, 1)',
        },
        {
          order:1,
          name:'Kanji',
          icon:'extension',
          command:'/kanjis',
          reviewCount:0,
          backgroundImage:`white_backgroud.png`,
          barColor:'rgba(255,255,255, 1)',
          color:`black`
        },
        {
          order:2,
          name:'Katakana',
          icon:'donut_small',
          command:'/katakanas',
          reviewCount:5,
          backgroundImage:`white_backgroud.png`,
          color:`black`
        },
        {
          order:3,
          name:'Hiragana',
          icon:'rowing',
          command:'/hiraganas',
          reviewCount:0,
          backgroundImage:`white_backgroud.png`,
          color:`black`
        }
      ],
    }
  },

  created: function()
  {
    this.$root.setMenuVisible = (menuVisible) =>
    {
        this.menuVisible = menuVisible;
    };
    this.$root.setFooterVisible = (footerVisible) =>
    {
        this.footerVisible = footerVisible;
    };
    this.$root.setProfileVisible = (profileVisible) =>
    {
        this.profileVisible = profileVisible;
    };
    this.$root.setLoggedIn = (loggedIn) =>
    {
      this.loggedIn = loggedIn;
    };
    this.$root.globalNotification = (snackbar,notificationInformation) =>
    {
      this.showNotification = snackbar;
      this.notificationInformation = notificationInformation;

      console.log(`snackbar ${snackbar} / not info ${notificationInformation.color}`);
    };
  },

  mounted()
  {

  },

  methods: {
    checkLoggedIn()
    {
      if(this.$root.loggedIn)
      {
        this.$router.push('/');
      }
      else
      {
        this.$router.push('/login');
      }
    },
    setupAccount(setupType)
    {
      if(setupType == 'login')
      {

      }
      else
      {
        console.log(`sign up`)
      }
    },
    router (route) {
      this.currentMenu = route;
      if(route.command == '/')
      {
        this.currentMenu.menuTextColor =  'white'
      }
      else
      {
        this.currentMenu.menuTextColor =  'black'
      }
      this.$router.push(route.command)
    }
  }
}
</script>
