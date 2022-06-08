<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="d-flex flex-column justify-content-center">
    <router-link to="/">Hello World</router-link>
    <router-link to="/shopping-list">Shopping list</router-link>
    <router-link to="/answer-questions">Answer Questions</router-link>
    <!--<div class="p-2">
      <Test />
    </div>-->
    <!--<div class="p-2">
      <FruitsList />
    </div>-->
  </div>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
