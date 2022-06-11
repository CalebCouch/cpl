<template>
  <div id="Cup">
    <div id="cupHeader" v-if="error == undefined && cup != undefined">
      <img id="cupLogo" :src="'https://ucarecdn.com/'+cup.logo+'/-/quality/smart/-/preview/640x640/image.jpg'" type="text/html">
      <div class="nav-item-custom" style="cursor: default; margin-right: 0.25em">{{cup.name}}</div>
      <div class="nav-item-custom" style="cursor: default;">{{timeLeft}}</div>
      <div id="navContainer"> 
         <b-dropdown id="dropdown-1" :text="'View: '+selectedNav" variant="primary" class="m-md-2">
          <b-dropdown-item v-on:click="(evt) => {setNav(evt, 'my-invites')}" >My Invites</b-dropdown-item>
          <b-dropdown-item v-on:click="(evt) => {setNav(evt, 'registered-teams')}">Registered Teams</b-dropdown-item>
        </b-dropdown>
      </div>
      <div style="margin-left: auto; margin-right: 1em" class="nav-item-custom" v-on:click="back">back</div>
    </div>
    <div class="errorContainer" v-if="error != undefined || cup == undefined">
      <div v-on:click="back" style="cursor: pointer;">{{error}}</div>
    </div>
    <div id="cupBody" v-else>
      <div v-if="cup.status == 'pending'" id="cupVote">
        <p style="padding: 5%;">This cup is still pending click the Vote button bellow to vote on the discord channel.</p>
        <a href="https://discord.com/channels/947559836286074920/947559836286074924" class="cup-vote btn-primary btn" target="_blank">Vote</a>
      </div>
      <div v-else-if="cup.status == 'approved'" id="cupTeams">
        <!-- <div id="miniNav">
          <div v-on:click="(evt) => {setNav(evt, 'registered-teams')}" class="selected mini-nav-item-custom">Registered Teams</div>
          <div v-on:click="(evt) => {setNav(evt, 'my-invites')}" class="mini-nav-item-custom">My Invites</div>
          <div v-on:click="createTeam" style="margin-left: auto; color: white; background-color:gray;" class="mini-nav-item-custom">Create Team</div>
        </div> -->
        <div id="miniNav">
          <div id="navContainer">
            <div v-on:click="createTeam" style="margin-right: auto; color: black;" class="nav-item-custom">Create Team</div>
           
          </div>
        </div>
        <perfect-scrollbar v-if="selectedNav == 'registered-teams'" class="teams" :key="team.name" v-for="(team,i) in teams" :class="i/2 != 0 ? 'gray' : ''">
          <img class="picture" :src="'https://ucarecdn.com/'+team.logo+'/-/quality/smart/-/preview/640x640/image.jpg'">
          <div class="username">{{team.name}}</div>
          <div class="invitewraper">
            <div class="invite btn btn-primary" v-if="team.leader === AuthenticationState.user.sub" v-on:click="(evt) => {viewTeam(team._id)}">View</div>
          </div>
        </perfect-scrollbar>
        <perfect-scrollbar v-if="selectedNav == 'my-invites'" class="invites" v-for="invite in invites" v-bind:key="invite.teamId">
          <img class="picture" :src="'https://ucarecdn.com/'+invite.teamLogo+'/-/quality/smart/-/preview/640x640/image.jpg'">
          <div class="username">{{invite.teamName}}</div>
          <div class="invitewraper">
            <div class="invite btn btn-primary" v-on:click="(evt) => {AcceptInvite(invite.userId, invite.teamId, invite._id)}">Accept</div>
          </div>
      </perfect-scrollbar>
      </div>
      <div v-else-if="cup.status == 'started'" id="cupTeams">
        cups started
      </div>
    </div>
    
  </div>
</template>

<script>
import { AuthenticationState } from 'vue-auth0-plugin';
import { useStore } from 'vuex';
import moment from 'moment'
export default {
  name: 'Cup',
  setup () {
    // const route = useRoute();
    const store = useStore();
    // const quote = ref({});
    
    return {
      store,
      AuthenticationState: AuthenticationState
    }
  },
  data () {
    return {
     selectedNav: 'registered-teams',
    }
  },
  mounted() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('cupId');
    if (id != null) {
      this.store.commit("SelectCup", id)
    } else {
      this.back()
    }
  },
  methods: {
    setNav (evt, id) {
      Array.from(document.getElementsByClassName('selected')).forEach(a => a.classList.remove('selected'))
      this.selectedNav = id
      evt.target.classList.add('selected')
      // this.store.commit('ChangeNavTeam', id)
    },
    back() {
      this.$router.push('/cups')
    },
    createTeam() {
      this.$router.push('/createTeam?cupId='+this.cup._id)
    },
    viewTeam(teamId) {
      this.$router.push('/Team?cupId='+this.cup._id+'&teamId='+teamId)
    },
    AcceptInvite(userId, teamId, Id) {
      this.store.dispatch("AcceptInvite", {'userId': userId, 'teamId': teamId, 'Id': Id})
    }

  },
  computed: {
    cup() {
      return this.store.getters.GetCup()
    },
    error() {
      if (this.cup == {}) {
        return "This cup could not be found click here to view all cups"
      }
      return undefined
    },
    timeLeft() {
      const localCup = this.store.getters.GetCup()
      var current = moment()
      return  localCup != {} ? moment.duration(moment(localCup.startDate, "YYYY-MM-DD").diff(current))._milliseconds : 0
    },
    teams() {
      return this.store.getters.GetTeams()
    },
    invites() {
      return this.store.getters.GetInvites(AuthenticationState.user.sub)
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
    width: 100%;
    height: 100%;
    /*margin: auto;*/
    /*margin-top: 4.5%;*/
    /*box-shadow: 0px 0px 3px 3px lightgray;*/
  }
  #cupHeader {
    height: 10%;
    width: 100%;
    background-color: #006bde!important;
    display: flex;
  }
  #cupLogo {
    height: 75%;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 1.5rem;
    margin-left: 1.5rem;
    box-shadow: 0px 0px 0px 3px lightgray;

  }
  #cupBody {
    width: 100%;
    height: 90%;
  }
  .errorContainer {
    width: 100%;
    height: 90%;
    display: flex; 
    align-items: center; 
    justify-content: center;
  }
  #cupTeams {
    height: 100%;
    width: 100%;
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
  #cupVote {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  #createTeam {
    margin-left: auto;
  }
  .gray {
    background-color: lightgray;
  }
  .teams {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    padding: 2.5%;
  }
  .invites {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    padding: 2.5%;
  }
  .username {
    margin-left: 5%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }
  .invitewraper {
    margin-left: auto;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center; 
    margin-right: 2.5%;
  }
  .picture {
    height: 100%;
    box-shadow: 0px 0px 0px 2px lightgray;
  }
  .mini-nav-item-custom {
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
