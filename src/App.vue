<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <Navbar></Navbar>
    <div id="container">
      <router-view/>
    </div>
</template>
<script>

import Navbar from './components/Navbar'


export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
<style>
 body {
    overscroll-behavior-y: none;
    margin: 0!important;
  }
  #app {
    top: 0!important;
    margin: 0!important;
    width: 100vw;
    height: 100vh;
    background-color: white;
    position: fixed!important;
  }
  #container {
    width: 100vw;
    height: 90vh;
  }
</style>
