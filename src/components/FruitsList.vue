<template>
  <form class="d-flex flex-column" @submit.prevent="add">
    <label for="label-fruit">Add a fruit</label>
    <div class="d-flex flex-row justify-content-center">
      <input v-model="newFruit" type="text" />
      <button class="btn btn-success" type="submit">Add Fruit</button>
    </div>
  </form>

  <h2>A list of fruits I like:</h2>
  <ul>
    <li v-for="fruit in list" :key="fruit.id">
      {{ fruit.id }} - {{ fruit.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "FruitsList",
  data() {
    return {
      newFruit: "",
      list: [
        {
          id: 1,
          name: "fresas",
        },
        {
          id: 2,
          name: "uvas",
        },
      ],
    };
  },
  methods: {
    add() {
      if (this.newFruit.trim() !== "") {
        this.list.push({
          id: this.list.length + 1,
          name: this.newFruit,
        });
      }
    },
  },
};
</script>

<style scoped>
</style>