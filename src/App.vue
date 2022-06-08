<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!--<HelloWorld msg="Hello Vue 3 in CodeSandbox!" />-->
  <div class="d-flex flex-column justify-content-center">
    <!--<div class="p-2">
      <Test />
    </div>-->
    <div class="p-2">
      <FruitsList />
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
// import Test from "./components/Test.vue";
import FruitsList from "./components/FruitsList.vue";
export default {
  name: "App",
  components: {
    HelloWorld,
    // Test,
    FruitsList,
  },
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
