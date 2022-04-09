<template>
  <div id="User">
    <div class="user" :key="user.name" v-for="(user,i) in users" :class="i/2 == 0 ? 'gray' : ''">
      <img class="picture" :src="user.picture">
      <div class="username">{{user.name}}</div>
      <div class="invitewraper">
        <div class="invite btn btn-primary" v-on:click="(evt) => {AddInvite(evt, user.id)}">Invite</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  name: 'User',
  setup () {
    const store = useStore();
    return {
      store
    }
  },
  computed: {
    users() {
      return this.store.getters.GetUsers()
    }
  },
  methods: {
    AddInvite(evt, id) {
      evt.target.classList.remove("btn-primary") 
      evt.target.classList.add("btn-outline-primary") 
      evt.target.classList.add("invited")
      evt.target.textContent = "Invited"
      evt.target.disabled = true
      this.$emit('clicked', id)
    }
  }
};
</script>

<style scoped>
  #User {
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
  /*.invite {
    margin-top: 20%;
  }*/
 /* .picturewrap {
    height: 90%;
  }*/
  .picture {
    height: 100%;
    box-shadow: 0px 0px 0px 2px lightgray;
  }
</style>