import Vue from 'vue';
import Router from 'vue-router';

import MainMenu from '@/components/mainMenu';
import signUp from '@/components/signUp';
import kanjiManagement from '@/components/kanjiManagement';
import katakanaManagement from '@/components/katakanaManagement';
import hiraganaManagement from '@/components/hiraganaManagement';
import userPofile from '@/components/userProfile';

Vue.use(Router)

const routes =
  [
    {
      path: '/',
      component: MainMenu
    },
    {
      path: '/signup',
      component: signUp
    },
    {
      path: '/kanjis',
      component:kanjiManagement
    },
    {
      path: '/katakanas',
      component:katakanaManagement
    },
    {
      path: '/hiraganas',
      component:hiraganaManagement
    },
    {
      path:'/userprofile',
      component:userPofile
    }
  ]

const routesToUse = new Router({
  routes
})

export default routesToUse;
