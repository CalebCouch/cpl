<template>
  <div id="Cups">
    <div id="miniNav">
      <div v-on:click="(evt) => {setNav(evt, 1)}" class="selected nav-item-custom">Active Cups</div>
      <div v-on:click="(evt) => {setNav(evt, 2)}" class="nav-item-custom">Pending Cups</div>
      <div v-on:click="(evt) => {setNav(evt, 3)}" class="nav-item-custom">Compleated Cups</div>
      <div v-on:click="createCup" style="margin-left: auto; color: white; background-color:gray;" class="nav-item-custom">Create Cup</div>
    </div>
    <div id="cupsContainer">
      <div class="cup" v-for="cup in cups" :key="cup.createdAt">
        
      </div>

    </div>
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
      // quote,
      store,
      selectedNav: 1,
      cups: []
      // route
    }
  },
  mounted() {
    this.store.commit('GetAllCups')
  },
  computed: {
    
  },
  methods: {
    getCups() {
      this.cups = this.store.getters.GetCups('approved')
      console.log(this.cups)
    },
    createCup() {
      this.$router.push('/createCup')
    },
    setNav (evt, id) {
      Array.from(document.getElementsByClassName('selected')).forEach(a => a.classList.remove('selected'))
      evt.target.classList.add('selected')
      this.selectedNav = id
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
    background-color: green;
    display: flex;
  }
  .cup {
    width: 20vh;
    height: 20vh;
    background-color: orange;
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
 
</style>
