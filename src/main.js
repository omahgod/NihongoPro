import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify';
import App from './App.vue'
import router from './routes';
import colors from 'vuetify/es5/util/colors';
//import paypal from 'paypal-rest-sdk';
Vue.config.productionTip = false

/*paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
  'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
});*/


Vue.use(Vuetify, {
  theme: {
    primary: colors.blue
  }
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
