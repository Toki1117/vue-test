import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import FruitsList from "./components/FruitsList.vue";
import Test from "./components/Test.vue";

const routes = [
  {
    path: "/",
    component: HelloWorld
  },
  {
    path: "/shopping-list",
    component: FruitsList
  },
  {
    path: "/answer-questions",
    component: Test
  },
  {
    path: "/todo-list",
    component: () => import("./components/TodoList.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
