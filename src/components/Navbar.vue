<template>
  <div id="Navbar">
    <div class="nav-item-custom" v-on:click="home">C$ Pro League</div>
    <div class="nav-item-custom" v-on:click="home">Home</div>
    <div class="nav-item-custom" v-on:click="cup">Tournament Cups</div>
    <div class="nav-item-custom" v-on:click="createCup">Create A Cup</div>

    <div id="NavbarRight" v-if="authenticated">
      <div v-on:click="dropdown" id="ProfileBox"> 
        <div id="ProfileName"> {{this.name}} </div>
        <img id="ProfileImage" :src="this.picture">
        <div class="dropdown-content" id="profileDrop">
          <div v-on:click="logout">logout</div>
        </div>
      </div>
    </div>
    <div v-else-if="loading" id="NavbarRight" style="margin-left: auto;">
      <div class="nav-item-custom">loading</div>
    </div>
    <div v-else id="NavbarRight">
      <div class="nav-item-custom" v-on:click="login">login</div>
    </div>
  </div>
</template>

<script>
import { AuthenticationState, AuthenticationProperties } from 'vue-auth0-plugin';



export default {
  name: 'Navbar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  computed: {
    name () {
      return AuthenticationState.user != undefined ? AuthenticationState.user.nickname : ''
    },
    picture () {
      return AuthenticationState.user != undefined ? AuthenticationState.user.picture : ''
    },
    authenticated () {
      return AuthenticationState.authenticated
    },
    loading () {
      return AuthenticationState.loading
    }
  },
  mounted() {
    console.log(AuthenticationState)
    console.log(AuthenticationProperties)
  },
  methods: {
    dropdown () {
      document.getElementById("profileDrop").classList.toggle("show")
    },
    logout () {
      AuthenticationProperties.logout()
    },
    login() {
      const env = process.env
      const HOST = env.VUE_APP_AUTH_HOST
      AuthenticationProperties.loginWithRedirect({
        redirect_uri: HOST+'/'
      });
    },
    team () {
      // console.log(this.$auth)
    },
    cup () {
      this.$router.push('/cups')
    },
    createCup() {
      this.$router.push('/createCup')
    },
    home () {
      this.$router.push('/')
    },
    profile () {
      // console.log("pushing")
      this.$router.push('/profile')
    }
  }
}
</script>

<style>
  #Navbar {
    width: 100vw;
    height: 10vh;
    background-color: #007bff!important;
    display: flex;
  }
  
  #ProfileBox {
    color: white;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    margin-top: auto;
    margin-bottom: auto;
    height: 50%;
    cursor: pointer;
    display: flex;
  }
  #ProfileImage {
    height: 100%;
    box-shadow: 0px 0px 0px 2px lightgray;
  }
  #ProfileName {
    margin-right: 0.5rem;
    margin-top: auto;
    margin-bottom: auto;
  }


  .nav-item-custom {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    margin-top: auto;
    margin-bottom: auto;
    color: white;
    cursor: pointer;
  }
  .show {
    display: block!important;
  }

  #profileDrop {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    top: 7.7%;
    margin-left: -0.7%;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1; 
  }

  #profileDrop div:hover {
    background-color: #ddd;
  }

  #profileDrop div {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
  }

  #NavbarRight {
    margin-left: auto;
    display: flex;
  }

</style>