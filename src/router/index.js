import { createRouter, createWebHistory } from 'vue-router'
import { AuthenticationState, AuthenticationProperties } from 'vue-auth0-plugin';
import Home from '../components/Home.vue'
import { watch } from 'vue';
import store from '../store'
// import {envy} from 'envy';
// const env = envy();
const env = process.env
const HOST = env.VUE_APP_AUTH_HOST

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: () => {
    // define verify method for later use
      const verify = async () => {
          if (AuthenticationState.authenticated) {
              store.commit('RegisterUser', AuthenticationState.user)
          }
          console.log(HOST+'/')
          // AuthenticationProperties.loginWithRedirect({
          //   redirect_uri: HOST+'/'
          // })
          return true;
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
    path: '/cup',
    name: 'cup',
    component: () => import('../components/Cup.vue'),
    beforeEnter: () => {
    // define verify method for later use
      const verify = async () => {
          if (AuthenticationState.authenticated) {
              store.commit('RegisterUser', AuthenticationState.user)
              return true;
          }
          console.log(HOST+'/cup')
          AuthenticationProperties.loginWithRedirect({
            redirect_uri: HOST+'/cup'
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
    path: '/createTeam',
    name: 'createTeam',
    component: () => import('../components/CreateTeam.vue'),
    beforeEnter: () => {
    // define verify method for later use
      const verify = async () => {
          if (AuthenticationState.authenticated) {
              store.commit('RegisterUser', AuthenticationState.user)
              return true;
          }
          console.log(HOST+'/createTeam')
          AuthenticationProperties.loginWithRedirect({
            redirect_uri: HOST+'/createTeam'
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
    path: '/cups',
    name: 'cups',
    component: () => import('../components/Cups.vue'),
    beforeEnter: () => {
    // define verify method for later use
      const verify = async () => {
          if (AuthenticationState.authenticated) {
              store.commit('RegisterUser', AuthenticationState.user)
              return true;
          }
          console.log(HOST+'/cups')
          AuthenticationProperties.loginWithRedirect({
            redirect_uri: HOST+'/cups'
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
              store.commit('RegisterUser', AuthenticationState.user)
              return true;
          }
          console.log(HOST+'/CreateCup')
          AuthenticationProperties.loginWithRedirect({
            redirect_uri: HOST+'/CreateCup'
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
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
