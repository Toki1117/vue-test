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
    <div v-show="show">
      <form
        id="postForm"
        class="d-flex flex-column justify-content-stretch mb-3"
        ref="form"
        @submit.prevent
      >
        <div class="mb-3">
          <label class="form-label">Title</label>
          <input class="form-control" type="text" v-model="newPost.title" />
        </div>
        <div class="mb-3">
          <label class="form-label">Body</label>
          <textarea
            class="form-control"
            v-model="newPost.body"
            rows="5"
          ></textarea>
        </div>
        <button class="btn btn-success" type="submit" @click="savePost">
          Save
        </button>
        <button class="btn btn-warning" type="reset" @click="cancel()">
          Cancel
        </button>
      </form>
    </div>
    <button v-show="!show" class="btn btn-info" @click="show = !show">
      Add post
    </button>
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
          <button class="btn btn-info" @click="edit(todo)">Edit</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "../../src/http-common";
export default {
  name: "TodoList",
  data() {
    return {
      url: "/posts",
      list: [],
      status: 0,
      show: false,
      statusObj: {
        0: "No todos yet",
        1: "Getting...",
        2: "Ready!",
        3: "Error :(",
      },
      newPost: {
        title: "",
        body: "",
        id: null,
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
        const res = await axios.put(`${this.url}/${id}`, rest);
        this.reset();
        this.addUpdate(res.data);
        //this.getList();
        window.alert("Post Updated!");
      } catch (err) {
        this.status = 3;
        console.error(err);
      }
    },
    async createPost(post) {
      try {
        const res = await axios.post(this.url, post);
        this.reset();
        this.addPostFirst(res.data);
        //this.getList();
        window.alert("Post Created!");
      } catch (err) {
        this.status = 3;
        console.error(err);
      }
    },
    cancel() {
      this.show = !this.show;
      this.reset();
    },
    reset() {
      this.newPost.id = null;
      this.newPost.title = "";
      this.newPost.body = "";
    },
    savePost() {
      console.log(this.isInvalidForm());
      if (this.isInvalidForm()) {
        console.log("NO VAlid");
        return;
      }
      console.log({ new: this.newPost });
      if (this.newPost.id) {
        this.updatePost(this.newPost);
      } else {
        this.createPost(this.newPost);
      }
    },

    isInvalidForm() {
      const { id, userId, ...rest } = this.newPost;
      return Object.values(rest).some((val) => String(val).trim() === "");
    },
    edit(post) {
      this.newPost = { ...post };
      this.show = !this.show;
    },
    addPostFirst(post) {
      console.log(post);
      this.list.splice(0, 0, post);
    },
    addUpdate(post) {
      const updated = this.list.findIndex((p) => p.id === post.id);
      console.log(post, updated);
      this.list[updated] = {
        ...post,
      };
    },
  },
};
</script>

<style>
</style>