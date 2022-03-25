<template>
  <div id="User">
    <div class="user" v-for="user in users">
      {{user.name}}
    </div>
    
  </div>
</template>

<script>
import { useStore } from 'vuex';
// import moment from 'moment'
export default {
  name: 'User',
  setup () {
    // const route = useRoute();
    const store = useStore();
    // const quote = ref({});
    
    return {
      store
    }
  },
  mounted() {
    let urlParams = new URLSearchParams(window.location.search);
    let name = urlParams.get('name');
    if (name != undefined) {
      this.store.commit("SelectCup", name)
    }
  },
  methods: {
   createTeam() {
      this.$router.push('/createTeam')
    },
  },
  computed: {
    users() {
      return this.store.getters.GetUsers()
    }
  }
};
</script>

<style scoped>
  #Cup {
    width: 90%;
    height: 90%;
    margin: auto;
    margin-top: 4.5%;
    box-shadow: 0px 0px 3px 3px lightgray;
  }
  #cupHeader {
    height: 10%;
    width: 100%;
    background-color: #006bde!important;
    display: flex;
  }
  #cupLogo {
    height: 50%;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 1.5rem;
    margin-left: 1.5rem;
  }
  #cupBody {
    width: 100%;
    height: 90%;
  }
  #cupTeams {
    height: 100%;
    width: 100%;
  }
  #cupVote {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  #createTeam {
    margin-left: auto;
  }
  
  .cup-vote {
    margin-left: auto;
    margin-right: auto;
  }
  .nav-item-custom {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    margin-top: auto;
    margin-bottom: auto;
    color: white;
    cursor: pointer;
  }

</style>