<template>
  <div id="Cup">
    <div id="cupHeader">
      <img id="cupLogo" :src="'https://ucarecdn.com/'+cup.logo+'/-/quality/smart/-/preview/640x640/image.jpg'" type="text/html">
      <div class="nav-item-custom" style="cursor: default;">{{cup.name}}</div>
      <div id="createTeam" class="nav-item-custom" v-if="cup.status == 'approved'" v-on:click="createTeam">Create Team</div>
    </div>
    <div id="cupBody">
      <div v-if="cup.status == 'pending'" id="cupVote">
        <p style="padding: 5%;">This cup is still pending click the Vote button bellow to vote on the discord channel.</p>
        <a href="https://discord.com/channels/947559836286074920/947559836286074924" class="cup-vote btn-primary btn">Vote</a>
      </div>
      <div v-if="cup.status == 'approved'" id="cupTeams"></div>
    </div>
    
  </div>
</template>

<script>
import { useStore } from 'vuex';
// import moment from 'moment'
export default {
  name: 'Cup',
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
    cup() {
      return this.store.getters.GetCup() != {} ? this.store.getters.GetCup() : {status: null}
    }
    // state() {
    //   var current = moment()
    //   const timeLeft = moment.duration(moment(this.cup.startDate, "YYYY-MM-DD").diff(current))
    //   console.log(timeLeft)
    //   return this.stateVal
    // }
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
