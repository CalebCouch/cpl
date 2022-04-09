import { createStore } from 'vuex'
// import moment from 'moment'
const env = process.env
const HOST = env.VUE_APP_SERVER_HOST
console.log(HOST)
console.log(env)

export default createStore({
  state: {
    currentCup: undefined,
    cups: [],
    teams: [],
    users: [],
    invites: [],
    nav: 'approved'
  },
  mutations: {
    // GetRandomQuote (state) {
    //   fetch("http://localhost:3000/cups/random")
    //     .then(res => res.json())
    //     .then(data => {
    //       if (state.quote._id != data._id) {
    //         state.quote = data;
    //       } else {
    //         console.log("Duplicate");
    //         this.commit('GetRandomQuote');
    //       }
    //     });
    // },
    SelectCup (state, name) {
      state.currentCup = name
    },
    ChangeNav (state, data) {
      state.nav = data
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
  getters: {
    GetSpecificQuote: state => id => {
      return state.quotes.filter(q => q._id == id)[0]
    },
    GetCups: state => () => {
      let cups = []
      if (state.nav == 'complete') {
        cups = state.cups.filter(q => q.status == 'complete')
      } else {
        cups = state.cups.filter(q => q.status != 'complete')
      }
      return cups
    },
    GetUsers: state => () => {
      return state.users
    },
    GetCup: state => () => {
      return state.cups.filter(a => a.name === state.currentCup)[0]
    },
    GetTeams: state => (id) => {
      return state.teams.filter(a => a.cupId == id)
    },
    GetInvites: state => (id, id2) => {
      return state.invites.filter(a => a.userId == id && a.cupId == id2)
    }
  }
})