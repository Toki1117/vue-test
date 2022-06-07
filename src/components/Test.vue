<template>
  <label class="labelInput" for="text">Start typing something...</label>
  <input
    :class="{ 'red-border': text === '' }"
    id="text"
    class="form-control"
    type="text"
    v-model="text"
  />
  <button class="btn btn-info" @click="higlightText">Click ME</button>
  <p id="msg" v-show="toggle">Aqui su texto: {{ text }}</p>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      text: "",
      toggle: false,
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
  border: 2px dashed blue;
}
</style>
