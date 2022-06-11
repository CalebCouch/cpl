import { createStore } from 'vuex'
// import moment from 'moment'
const env = process.env
const HOST = env.VUE_APP_SERVER_HOST
console.log(HOST)
console.log(env)

export default createStore({
  state: {
    currentCup: undefined,
    currentTeam: undefined,
    newCupId: undefined,
    cups: [],
    teams: [],
    users: [],
    invites: [],
    selectedNav: 'active'
  },
  mutations: {
    SelectCup (state, id) {
      state.currentCup = id
    },
    SelectTeam (state, id) {
      state.currentTeam = id
    },
    ChangeNav (state, data) {
      state.selectedNav = data
    },
    GetAllTeams (state) {
      fetch(HOST+"/teams")
        .then(res => res.json())
        .then(data => {
          state.teams = data;
        });
    },
    GetAllCups (state) {
      fetch(HOST+"/cups")
        .then(res => res.json())
        .then(data => {
          state.cups = data;
        });
    },
    GetAllUsers (state) {
      fetch(HOST+"/users")
        .then(res => res.json())
        .then(data => {
          state.users = data;
        });
    },
    GetAllInvites (state) {
      fetch(HOST+"/invites")
        .then(res => res.json())
        .then(data => {
          state.invites = data;
        });
    },
    RegisterUser (state, data) {
      fetch(HOST+"/users")
        .then(res => res.json())
        .then(datares => {
          state.users = datares;
        })
        .then(
          () => {
            if (!state.users.filter(a => a.id == data.sub)[0]) {
              fetch(HOST+"/users/new", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({name: data.nickname, email: data.email, id: data.sub, picture: data.picture})
              })
              .then(res => {
                console.log("Request complete! response:", res);
              })
              .then(
                fetch(HOST+"/users")
                  .then(res => res.json())
                  .then(datares => {
                    state.users = datares;
              }))
            } else {
              fetch(HOST+"/users/update/"+state.users.filter(a => a.id == data.sub)[0]._id, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({name: data.nickname, email: data.email, id: data.sub, picture: data.picture})
              })
              .then(res => {
                console.log("Request complete! response:", res);
              })
              .then(
                fetch(HOST+"/users")
                  .then(res => res.json())
                  .then(datares => {
                    state.users = datares;
              }))
            }
      })
    },
    SubmitCup (state, data) {
      fetch(HOST+"/cups/newPending", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(data)
    }).then(res => {
      console.log("Request complete! response:", res);
    }).then(
    fetch(HOST+"/cups")
        .then(res => res.json())
        .then(datares => {
          // console.log(datares)
          // console.log(state.cups)
          // for (let i = 0; i < datares.length; i++) {
          //   const newCup = datares[i]
          //   if (state.cups.filter(a => a._id == newCup._id).length == 0) {
          //     state.newCupId == newCup._id
          //   }
          // }
          state.cups = datares;
        }));
    },
    SubmitTeam (state, data) {
      const team = data.team
      const invites = data.invites
      fetch(HOST+"/teams/new", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(team)
    }).then(res => {
      console.log("Request complete! response:", res);
    }).then(
      setTimeout(() => {
        fetch(HOST+"/teams")
          .then(res => res.json())
          .then(datares => {
            state.teams = datares;
            console.log(datares)
            const teaminv = datares.filter(a => {console.log(a.name === team.name); console.log(a.name); console.log(team.name); return a.name === team.name})[0]
            console.log(teaminv)
            for (let i = 0; i < invites.length; i++) {
              this.commit('SubmitInvite', {cupId: teaminv.cupId, teamId: teaminv._id, teamName: teaminv.name, teamLogo: teaminv.logo, userId: invites[i]});
            }
          })
      }, 100));
    
    },
    SubmitInvite (state, data) {
      fetch(HOST+"/invites/new", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(data)
    }).then(res => {
      console.log("Request complete! response:", res);
    }).then(
    fetch(HOST+"/invites")
        .then(res => res.json())
        .then(datares => {
          state.invites = datares;
        }));
    
    }
  },
  actions: {
     AcceptInvite (context, data) {
      this.commit('SelectTeam', data.teamId)
      const state = context.state
      // const getters = context.getters
      console.log(state.invites)
      fetch(HOST+"/invites/delete/"+state.invites.filter(a => a._id == data.Id)[0]._id, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'}, 
      })
      .then(res => {
        console.log("Request complete! response:", res);
      })
      let oldTeamMembers = context.getters.GetTeam().members
      oldTeamMembers.push(data.userId)
      console.log(oldTeamMembers)
      fetch(HOST+"/teams/update/"+context.getters.GetTeam()._id, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({members: oldTeamMembers})
      })
      .then(res => {
        console.log("Request complete! response:", res);
      })
    },
  },
  getters: {
    GetSpecificQuote: state => id => {
      return state.quotes.filter(q => q._id == id)[0]
    },
    GetCups: state => () => {
      let cups = []
      if (state.selectedNav == 'active') {
        cups = state.cups.filter(q => q.status == 'approved' || q.status == 'started')
      } else {
        cups = state.cups.filter(q => q.status == state.selectedNav)
      }
      return cups
    },
    GetUsers: state => () => {
      return state.users
    },
    // GetNonTeamUsers: (state, getters) => () => {
    //   // let getters = this.getters
    //   return state.users.filter(user => getters.InTeam(user._id))
    // },
    GetMembers: state => () => {
      return state.teams.filter(a => a._id === state.currentTeam)[0].members
    },
    // getNewCupId: state => () => {
    //   return state.newCupId
    // },
    GetMultipleUsers: (state, getters) => (members) => {
      let users = getters.GetUsers()
      return users.filter(user => members.includes(user.id))
    },
    GetInvitableUsers: (state, getters) => () => {
      let validUsers = getters.GetUsers()
      console.log(validUsers)
      validUsers = validUsers.filter(user => !getters.UserInCup(user.id))
      validUsers = validUsers.filter(user => getters.GetInvites(user.id).filter(invite => invite.teamId === state.currentTeam).length > 0)
      return validUsers
    },
    UserInCup: (state, getters) => (userId) => {
      let InCup = false
      getters.GetTeams().forEach(team => InCup ? '' : InCup = team.members.filter(a => a.userId == userId).length > 0)
      getters.GetTeams().forEach(team => InCup ? '' : InCup = team.leader === userId)
      return InCup
    },
    GetNav: state => () => {
      return state.selectedNav
    },
    GetCup: state => () => {
      return state.cups.filter(a => a._id === state.currentCup)[0]
    },
    GetTeam: state => () => {
      return state.teams.filter(a => a._id === state.currentTeam)[0]
    },
    GetTeams: state => () => {
      return state.teams.filter(a => a.cupId == state.currentCup)
    },
    GetInvites: state => (userId) => {
      console.log(state.invites)
      return state.invites.filter(a => a.userId == userId && a.cupId == state.currentCup)
    }
  }
})