<template>
  <div class="dflex flew-column justify-content-center">
    <h3>A list of todos</h3>
    {{ statusObj[status] }}
    <ul style="list-style: none">
      <li
        class="d-flex flex-column justify-content-between"
        v-for="todo in list"
        :key="todo.id"
      >
        <input type="checkbox" v-model="todo.completed" />
        <span>{{ todo.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TodoList",
  data() {
    return {
      list: [],
      status: 0,
      statusObj: {
        0: "No todos yet",
        1: "Getting...",
        2: "Ready!",
        3: "Error :(",
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.status = 1;
      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((res) => {
          console.log({ res });
          this.status = 2;
          this.list = res.data;
        })
        .catch((err) => {
          console.error({ err });
          this.status = 3;
        });
    },
  },
};
</script>

<style>
</style>