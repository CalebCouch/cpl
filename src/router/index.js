import { createRouter, createWebHistory } from 'vue-router'
import { AuthenticationState, AuthenticationProperties } from 'vue-auth0-plugin';
import Home from '../components/Home.vue'
import { watch } from 'vue';
// import {envy} from 'envy';
// const env = envy();
const env = process.env
const HOST = env.VUE_APP_AUTH_HOST

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../components/CreateCup.vue'),
    beforeEnter: () => {
    // define verify method for later use
      const verify = async () => {
          if (AuthenticationState.authenticated) {
              return true;
          }
          AuthenticationProperties.loginWithRedirect({
            redirect_uri: HOST+'/profile/'
          })
          return false;
      };

      // if not loading, verify request
      if (!AuthenticationState.loading) {
          return verify();
      }

      // if loading, watch for loading property to change and then verify
      return new Promise ((resolve) => {
          const unwatch = watch(() => AuthenticationState.loading, async () => {
              if (!AuthenticationState.loading) {
                  unwatch();
                  resolve(verify());
              }
          });
      });
    }
  },
  {
    path: '/CreateCup',
    name: 'CreateCup',
    component: () => import('../components/CreateCup.vue'),
    beforeEnter: () => {
    // define verify method for later use
      const verify = async () => {
          if (AuthenticationState.authenticated) {
              return true;
          }
          console.log(HOST+'/CreateCup')
          AuthenticationProperties.loginWithRedirect()
          return false;
      };

      // if not loading, verify request
      if (!AuthenticationState.loading) {
          return verify();
      }

      // if loading, watch for loading property to change and then verify
      return new Promise ((resolve) => {
          const unwatch = watch(() => AuthenticationState.loading, async () => {
              if (!AuthenticationState.loading) {
                  unwatch();
                  resolve(verify());
              }
          });
      });
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
