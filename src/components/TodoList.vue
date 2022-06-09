<template>
  <div class="dflex flew-column justify-content-center">
    <h3>A list of todos</h3>
    <p
      class="text-white"
      :class="{
        'bg-secondary': status === 0,
        'bg-info': status === 1,
        'bg-success': status === 2,
        'bg-danger': status === 3,
      }"
    >
      {{ statusObj[status] }}
    </p>
    <ul style="list-style: none">
      <li
        class="m-2 d-flex flex-column justify-content-between"
        v-for="todo in list"
        :key="todo.id"
      >
        <div class="card p-4 d-flex flex-row justify-content-between">
          <div class="d-flex justify-content-between">
            <span>{{ todo.title }}</span> - <span>{{ todo.body }}</span>
          </div>
          <button class="btn btn-danger" @click="deletePost(todo)">x</button>
        </div>
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
      url: "https://jsonplaceholder.typicode.com/posts",
      list: [],
      status: 0,
      statusObj: {
        0: "No todos yet",
        1: "Getting...",
        2: "Ready!",
        3: "Error :(",
      },
      newPost: {
        title: "",
        body: "",
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      this.status = 1;
      try {
        this.status = 2;
        this.list = await axios.get(this.url).then((res) => {
          console.log({ res });
          return res.data;
        });
      } catch (err) {
        this.status = 3;
        console.error({ err });
      }
    },
    async deletePost(post) {
      this.status = 1;
      let alert = window.confirm(
        `Are you sure you want to delete ${post.title} ?`
      );
      console.log(post, alert);
      if (alert) {
        console.log("DENTRO");

        try {
          this.status = 2;
          await axios.delete(`${this.url}/${post.id}`);
          this.list = this.list.filter((p) => p.id !== post.id);
          window.alert("Post deleted!");
        } catch (err) {
          this.status = 3;
          console.error(err);
        }
      }
    },
    async updatePost(post) {
      const { id, ...rest } = post;
      try {
        await axios.put(`${this.url}/${id}`, rest);
        window.alert("Post Updated!");
      } catch (err) {
        this.status = 3;
        console.error(err);
      }
    },
    async createPost(post) {
      try {
        await axios.post(this.url, post);
        window.alert("Post Created!");
      } catch (err) {
        this.status = 3;
        console.error(err);
      }
    },
  },
};
</script>

<style>
</style>