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
          <v-toolbar-items v-for="(menu,i) in menus" :key="i">
                <v-btn :style="`color:${currentMenu.menuTextColor ? currentMenu.menuTextColor : 'white'}`" @click="router(menu)" large class="buttonStyling" flat>{{menu.name}}</v-btn>
          </v-toolbar-items>
          <v-spacer></v-spacer>
          <v-toolbar-items v-if="!loggedIn">
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
import util from 'util';
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
        },
        {
          order:1,
          name:'Courses',
          icon:'home',
          command:'/courses',
          backgroundImage: `white_backgroud.png`,
          barColor:'rgba(255,255,255, 1)',
        }
      ],
      menus:[],
      loggedInMenus:[
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
      signUp:{
      menuTextColor:`black`,
      backgroundImage: `white_backgroud.png`,
      barColor:'rgba(255,255,255, 1)',
      name:'Sign Up',
      icon:'home',
      command:'/signup',
     }
    }
  },

  created: function()
  {
    this.setMenus();

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
      this.setMenus(loggedIn);
    };
    this.$root.globalNotification = (snackbar,notificationInformation) =>
    {
      this.showNotification = snackbar;
      this.notificationInformation = notificationInformation;
    };
    this.$root.router = (menu) =>
    {
      console.log(`calling router`);
      this.currentMenu = menu;
    },
    this.$root.redirect = (route) =>
    {
      this.router(route);
    }
  },
  mounted()
  {
    // when a database is established we can use this current path to determine what data to use.
    let currentRoute = this.$router.currentRoute.path;

    // hard coding this so i dont constantly get reverted after every nodemon change.
    if(currentRoute == '/signup')
    {
      this.currentMenu = this.signUp;
    }
    //this.$root.router(currentRoute);
  },

  methods: {
    setMenus()
    {
      if(this.loggedIn)
      {
        this.menus=[];
        this.menus=this.loggedInMenus;
        console.log(`logged in`)
      }
      else
      {
        this.menus=[];
        this.menus=this.loggedOutMenus;
        console.log(`not logged in`)
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
