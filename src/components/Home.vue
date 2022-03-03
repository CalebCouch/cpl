<template>
  <div id="Home">
    <img src="../assets/logo.png" id="fixedImage"> 
    <div class="home-card">
      <div class="home-card-left"> 
          <p class="header" style="margin: 5%;">What is this? </p>
          <p class="body" style="margin: 5%; margin-top: 0%;">This website is a tool for the community to add more professionalism to their tournaments. A few features are voting on cups for new tournaments, discord based notifications for matches that have been scheduled, and allowing the community to come up with what ever games they wish to see played.
          </p>
      </div>
      <div class="home-card-right">
<!--         <img class="home-image" src="https://via.placeholder.com/200">
 -->      </div>
    </div>
    <div class="home-card">
      <div class="home-card-left">
        <p class="header" style="margin: 5%;">Why did I create this? </p>
          <p class="body" style="margin: 5%; margin-top: 0%;">I created this website to prevent other leagues from dominating the space and forcing certain types of game plays that the general community disproves of. Every decision will be poll based and discussion happens else where. This website has a discord channel to support notifications and nothing else.
          </p>
      </div>
      <div class="home-card-right">
        Image here, above, and below.
      </div>
    </div>
    <div class="home-card" style="margin-bottom: 5%;">
      <div class="home-card-left">
        <p class="header" style="margin: 5%;">Another emotion provoking question? </p>
          <p class="body" style="margin: 5%; margin-top: 0%;"> Yet another answer I wish I didn't have to come up with.
          </p>
      </div>
      <div class="home-card-right">
        <!-- <img class="home-image" src="https://via.placeholder.com/200"> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
};
</script>

<style scoped>
  #Home {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  #fixedImage {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: -10;
  }
  .home-card {
    z-index: 100;
    width: 90%;
    height: 30vh;
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5%;
    overflow: auto;
    background: rgba(211, 211, 211, .5);
    box-shadow: 0px 0px 3px 3px lightgray;
  }
  .home-card-right, .home-card-left {
    width: 50%;
    overflow: auto;
  }
  .home-card-left {
  }
  .home-card-right {
  }
  
  .home-image {
    padding: 5%;
  }
 
</style>
