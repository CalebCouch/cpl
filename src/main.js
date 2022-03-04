import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from "../auth_config.json";
import VueAuth0Plugin from 'vue-auth0-plugin';
import PerfectScrollbar from 'vue3-perfect-scrollbar'

import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'




const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueAuth0Plugin, {
  domain: config.domain,
  client_id: config.clientId,
  onRedirectCallback: appState => {
    // console.log(appState)
  }
});
app.use(PerfectScrollbar)
app.mount('#app')
