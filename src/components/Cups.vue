<template>
  <div id="Cups">
    <div id="miniNav">
   <!--    <div v-on:click="(evt) => {setNav(evt, 'pending')}" class="nav-item-custom">Pending Cups</div>
      <div v-on:click="(evt) => {setNav(evt, 'approved')}" class="selected nav-item-custom">Approved Cups</div> -->
      <div v-on:click="(evt) => {setNav(evt, 'active')}" class="selected nav-item-custom">Active Cups</div>
      <div v-on:click="(evt) => {setNav(evt, 'complete')}" class="nav-item-custom">Compleated Cups</div>
      <div v-on:click="createCup" style="margin-left: auto; color: white; background-color:gray;" class="nav-item-custom">Create Cup</div>
    </div>

    <perfect-scrollbar id="cupsContainer">
      <div class="cup" v-for="cup in cups" :key="cup.createdAt" v-on:click="() => {View(cup.name)}">
        <img class="cup-logo" :src="'https://ucarecdn.com/'+cup.logo+'/-/quality/smart/-/preview/640x640/image.jpg'">
        <perfect-scrollbar id="description">
          <div class="cup-name">{{cup.name}}</div>
          <div class="cup-name">{{cup.description}}</div>
          <div class="cup-prize">Prize: {{cup.prize}}</div>
          <div class="cup-register btn btn-primary" v-on:click="() => {View(cup.name)}">View</div>
        </perfect-scrollbar>
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
      selectedNav: 'approved',
      cupsStartDate: {},
      // route
    }
  },
  mounted() {
    this.store.commit('GetAllCups')
  },
  computed: {
    cups() {
      return this.store.getters.GetCups()
    }
  },
  methods: {
    View(name) {
      this.store.commit('SelectCup', name)
      this.$router.push('/cup?name='+name)
    },
    createCup() {
      this.$router.push('/createCup')
    },
    setNav (evt, id) {
      Array.from(document.getElementsByClassName('selected')).forEach(a => a.classList.remove('selected'))
      this.selectedNav = id
      evt.target.classList.add('selected')
      this.store.commit('ChangeNav', id)
    }
  }
};
</script>

<style scoped>
  #Cups {
    width: 90%;
    height: 90%;
    margin: auto;
    margin-top: 4.5%;
    box-shadow: 0px 0px 3px 3px lightgray;
  }
  #miniNav {
    height: 5%;
    width: 100%;
    display: flex;
    background-color: lightgray;
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
