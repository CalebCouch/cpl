import { createStore } from 'vuex'
const env = process.env
const HOST = env.VUE_APP_SERVER_HOST
console.log(HOST)
console.log(env)

export default createStore({
  state: {
    cup: {},
    cups: []
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
    GetAllCups (state) {
      fetch(HOST+"/")
        .then(res => res.json())
        .then(data => {
          state.quotes = data;
        });
    },
    SubmitCup (state, data) {
      console.log(data)
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
  // getters: {
  //   GetSpecificQuote: state => id => {
  //     return state.quotes.filter(q => q._id == id)[0]
  //   }
  // }
})