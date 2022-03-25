import { createStore } from 'vuex'
// import moment from 'moment'
const env = process.env
const HOST = env.VUE_APP_SERVER_HOST
console.log(HOST)
console.log(env)

export default createStore({
  state: {
    cup: {},
    cups: [],
    users: [],
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
      fetch(HOST+"/cups")
        .then(res => res.json())
        .then(data => {
          state.cups = data;
          state.cup = state.cups.filter(q => q.name == name)[0]
        })
    },
    ChangeNav (state, data) {
      state.nav = data
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
    RegisterUser (state, data) {
      console.log("test")
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
    
    }
  },
  getters: {
    GetSpecificQuote: state => id => {
      return state.quotes.filter(q => q._id == id)[0]
    },
    GetCups: state => () => {
      let cups = []
      if (state.nav == 'complete') {
        cups = state.cups.filter(q => q.status == state.nav)
      } else {
        cups = state.cups.filter(q => q.status != 'complete')
      }
      return cups
    },
    GetUsers: state => () => {
      return state.users
    },
    GetCup: state => () => {
      return state.cup
    }
  }
})