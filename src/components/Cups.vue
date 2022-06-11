<template>
  <div id="Cups">
    <div id="miniNav">
      <div id="navContainer">
        <div v-on:click="createCup" style="margin-right: auto;" class="nav-item-custom">Create Cup</div>
        <b-dropdown id="dropdown-1" :text="'Status: '+selectedNav" variant="primary" class="m-md-2">
          <b-dropdown-item v-on:click="(evt) => {setNav(evt, 'pending')}" >Pending</b-dropdown-item>
          <b-dropdown-item v-on:click="(evt) => {setNav(evt, 'approved')}">Approved</b-dropdown-item>
          <b-dropdown-item v-on:click="(evt) => {setNav(evt, 'active')}" >Active</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item v-on:click="(evt) => {setNav(evt, 'complete')}">Compleated</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <perfect-scrollbar id="cupsContainer">
      <div class="cup" v-for="cup in cups" :key="cup.createdAt" v-on:click="() => {ViewCup(cup._id)}">
        <img class="cup-logo" :src="'https://ucarecdn.com/'+cup.logo+'/-/quality/smart/-/preview/640x640/image.jpg'">
        <div id="description">
          <div class="cup-name">{{cup.name}}</div>
          <div class="cup-name" style="max-height: 4.5em; overflow: hidden;">{{cup.description}}</div>
          <div class="cup-prize">Prize: {{cup.prize}}</div>
          <div class="cup-register btn btn-primary" v-on:click="() => {ViewCup(cup._id)}">View</div>
        </div>
       <!--  <a href="https://discord.com/channels/947559836286074920/947559836286074924" class="cup-vote btn-primary btn">Vote</a> -->
      </div>
     <!--  <div class="cup" v-if="selectedNav === 'approved'" v-for="cup in cups" :key="cup.createdAt">
        <img class="cup-logo" :src="'https://ucarecdn.com/'+cup.logo+'/-/quality/smart/-/preview/640x640/image.jpg'">
        <div class="cup-name">{{cup.name}}</div>
        <div class="cup-prize">Prize: {{cup.prize}}</div>
        <div class="cup-start-date">End of registration:</div>
        <div class="cup-end-reg">{{cup.startDate}}</div>
        <div class="cup-register btn btn-primary" v-on:click="() => {Register(cup.name)}">Register</div> -->
      <!-- </div> -->
    </perfect-scrollbar>
  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  name: 'Cups',
  setup () {
    // const route = useRoute();
    const store = useStore();
    // const quote = ref({});
    
    return {
      store,
      cupsStartDate: {},
      // route
    }
  },
  mounted() {
    this.store.commit('GetAllCups')
    // Array.from(document.getElementsByClassName('selected')).forEach(a => a.classList.remove('selected'))
    // document.getElementById(this.selectedNav).classList.add('selected')
    
  },
  computed: {
    cups() {
      return this.store.getters.GetCups()
    },
    selectedNav() {
      return this.store.getters.GetNav()
    }
  },
  methods: {
    ViewCup(id) {
      this.store.commit('SelectCup', id)
      this.$router.push('/cup?cupId='+id)
    },
    createCup() {
      this.$router.push('/createCup')
    },
    setNav (evt, id) {
      Array.from(document.getElementsByClassName('selected')).forEach(a => a.classList.remove('selected'))
      evt.target.classList.add('selected')
      this.store.commit('ChangeNav', id)
    }
  }
};
</script>

<style scoped>
  #Cups {
    width: 100%;
    height: 100%;
    /*margin: auto;*/
    /*margin-top: 4.5%;*/
    /*box-shadow: 0px 0px 3px 3px lightgray;*/
    /*background-color: white;*/
  }
  
  #container {
    background-color: white!important;
  }
  #miniNav {
    height: 7.5%;
    width: 100%;
    background-color: lightgray;
  }
  #navContainer {
    height: 100%;
    width: 100%;
    margin-right: 2.5%;
    justify-content: right;
    display: flex;
    align-items: center;
  }
  #cupsContainer {
    height: 95%;
    width: 100%;
    /*background-color: green;*/
    display: flex;
    padding: 5%;
    flex-wrap: wrap;
    gap: 10%;
  }
  #description {
    height: 100%;
    width: 100%;
  }
  .cup {
    min-width: 15em;
    min-height: 25em;
    width: 20vw;
    height: 30vw;
    box-shadow: 0px 0px 3px 3px lightgray;
    cursor: pointer;
    text-align: center;
    overflow: hidden;
  }
  .nav-item-custom {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    display: flex;
    align-items: center;
    color: black;
    cursor: pointer;
  }
  .selected {
    background-color: white;
    color: black;
  }
  .cup-logo {
    width: 100%;
    height: 60%;
    background-color: white;
    box-shadow: 0px 1px 1px 1px lightgray;
  }
  .cup-register {
  }
  .cup-vote {

  }
 
</style>
