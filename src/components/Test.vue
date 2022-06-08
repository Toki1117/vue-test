<template>
  <label class="labelInput" for="text">Start typing a question...</label>
  <input
    :class="{ 'red-border': text === '' }"
    id="text"
    class="form-control"
    type="text"
    v-model="text"
  />
  <h3>{{ statusObj[status] }}</h3>
  <button class="btn btn-info" @click="higlightText">Show answer</button>
  <p id="msg" v-show="toggle">My answer: {{ answer }}</p>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      text: "",
      answer: "",
      status: 0,
      toggle: false,
      statusObj: {
        0: "No question yet",
        1: "thinking...",
        2: "Ready!",
        3: "Error :(",
      },
    };
  },
  methods: {
    higlightText() {
      const pEl = document.getElementById("msg");
      this.toggle = !this.toggle && this.text !== "";
      if (this.text !== "") {
        pEl.classList.add("blue-border");
      } else {
        pEl.classList.remove("blue-border");
      }
      setTimeout(() => (this.toggle = false), 2000);
    },
    async getAnswer() {
      this.status = 1;
      try {
        const res = await fetch("https://yesno.wtf/api");
        this.answer = (await res.json()).answer;
        this.status = 2;
      } catch (err) {
        console.error(err);

        this.status = 3;
      }
    },
  },
  watch: {
    text(newText, oldText) {
      console.log("New", newText);
      console.log("Old", oldText);
      if (newText.indexOf("?") > -1) {
        this.getAnswer();
      }
    },
  },
};
</script>

<style>
.labelInput {
  color: darkblue;
  font-size: 24px;
}
.red-border {
  border: 2px dashed red;
}
.blue-border {
  border: 2px dotted blue;
}
</style>
