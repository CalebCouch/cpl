<template>
  <div id="Team">
    <div id="TeamHeader" v-if="error == undefined && cup != undefined && team != undefined">
      <img id="TeamLogo" :src="'https://ucarecdn.com/'+team.logo+'/-/quality/smart/-/preview/640x640/image.jpg'" type="text/html">
      <div class="nav-item-custom" style="cursor: default; margin-right: 0.25em">{{team.name}}</div>
      <div style="margin-left: auto; margin-right: 1em" class="nav-item-custom" v-on:click="back">back</div>
    </div>
    <div id="TeamBody" v-if="error == undefined && cup != undefined && team != undefined">
      <div id="TeamBodyRight">
        <div class="TeamBodyHeader">Current Members</div>
        <div class="UserGroup">
          <div class="user" :key="member.name" v-for="(member,i) in members" :class="i/2 == 0 ? 'gray' : ''">
            <img class="picture" :src="member.picture">
            <div class="username">{{member.name}}</div>
            <div class="invitewraper">
              <div class="invite btn btn-danger" v-on:click="(evt) => {RemoveUser(evt, member._id)}">Remove</div>
            </div>
          </div>
        </div>
      </div>
      <div id="TeamBodyLeft">
        <div class="TeamBodyHeader">Invite New Members</div>
          <div class="UserGroup">
            <div class="user" :key="user.name" v-for="(user,i) in inviteableUsers" :class="i/2 == 0 ? 'gray' : ''">
              <img class="picture" :src="user.picture">
              <div class="username">{{user.name}}</div>
              <div class="invitewraper">
              <div class="invite btn btn-primary" v-on:click="(evt) => {InivteUser(evt, user.id)}">Invite</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="errorContainer" v-else>
      <div v-on:click="back" style="cursor: pointer;">{{error}}</div>
    </div>
  </div>
</template>

<script>
import { AuthenticationState } from 'vue-auth0-plugin';
import { useStore } from 'vuex';

// import moment from 'moment'
export default {
  name: 'Team',
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
    let teamId = urlParams.get('teamId');
    let cupId = urlParams.get('cupId')
    if (teamId != null) {
      this.store.commit("SelectTeam", teamId)
    } else {
      this.back()
    }
    if (cupId != null) {
      this.store.commit("SelectCup", cupId)
    } else {
      this.back()
    }
  },
  methods: {
    InivteUser(evt, id) {
      evt.target.disabled = true;
      evt.target.classList.remove('btn-primary')
      evt.target.classList.add('btn-outline-primary')
      evt.target.classList.add('noHover')
      evt.target.innerHTML = "Sent"
      console.log(id)
      setTimeout(() => {
        this.store.commit('SubmitInvite', {cupId: this.cup._id, teamId: this.team._id, teamName: this.team.name, teamLogo: this.team.logo, userId: id});
      }, 1000)
    },
    RemoveUser(id) {
      console.log(id)
    },
    setNav (evt, id) {
      Array.from(document.getElementsByClassName('selected')).forEach(a => a.classList.remove('selected'))
      this.selectedNav = id
      evt.target.classList.add('selected')
      // this.store.commit('ChangeNavTeam', id)
    },
    back() {
      let urlParams = new URLSearchParams(window.location.search);
      let cupId = urlParams.get('cupId');
      if (cupId != null) {
        this.$router.push('/cup?cupId='+cupId)
      } else {
        this.$router.push('/cups')
      }
    },
  },
  computed: {
    members() {
      return this.store.getters.GetMultipleUsers(this.team.members)
    },
    team() {
      return this.store.getters.GetTeam()
    },
    cup() {
      return this.store.getters.GetCup()
    },
    inviteableUsers() {
      return this.store.getters.GetInvitableUsers()
    },
    error() {
      if (this.team == {}) {
        return "This team could not be found click here to view all teams"
      }
      if (this.cup == {}) {
        return "This cup could not be found click here to view all cups"
      }
      return undefined
    },
    // invites() {
    //   return this.store.getters.GetInvites(AuthenticationState.user.sub, this.cup._id)
    // }
  }
};
</script>

<style scoped>
  #Team {
    width: 90%;
    height: 90%;
    margin: auto;
    margin-top: 4.5%;
    box-shadow: 0px 0px 3px 3px lightgray;
  }
  #TeamHeader {
    height: 10%;
    width: 100%;
    background-color: #006bde!important;
    display: flex;
  }
  #TeamLogo {
    height: 75%;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 1.5rem;
    margin-left: 1.5rem;
    box-shadow: 0px 0px 0px 3px lightgray;
  }
  #TeamBodyRight, #TeamBodyLeft {
    width: 100%;
    height: 95%;
  }
  #TeamBodyRight {
    border-right: 4px solid gray;
  }
  .noHover {
    pointer-events: none;
  }
  .UserGroup {
    width: 100%;
    height: 100%;
  }
  .invited {
    pointer-events: none;
  }
  .user {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    padding: 2.5%;
  }
  .gray {
    background-color: lightgray;
  }
  .TeamBodyHeader {
    width: 100%;
    height: 5%;
    display: flex; 
    align-items: center; 
    justify-content: center;
    font-weight: bold;
  }
  .username {
    margin-left: 5%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }
  #TeamBody {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: row;
  }
  #cupTeams {
    height: 100%;
    width: 100%;
  }
  #miniNav {
    height: 5%;
    width: 100%;
    display: flex;
    background-color: lightgray;
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
