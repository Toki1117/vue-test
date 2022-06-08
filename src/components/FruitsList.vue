<template>
  <form class="d-flex flex-column" @submit.prevent="add">
    <div class="d-flex align-items-center justify-content-around">
      <label ref="label1" for="label-fruit">Add a something</label>
    </div>
    <div class="d-flex flex-row justify-content-center">
      <input v-model="newFruit" type="text" />
      <button class="btn btn-success" type="submit">Add</button>
    </div>
    <div class="m-4 d-flex flex-row justify-content-center">
      <input
        debounce="500"
        placeholder="Search"
        v-model="searchText"
        type="text"
      />
    </div>
  </form>

  <h2>Shopping list:</h2>
  <ul style="list-style: none">
    <li v-for="fruit in filteredFruits" track-by="id" :key="fruit.id">
      <FruitItem :item="fruit" @remove="remove" />
      <!--<input type="checkbox" v-model="fruit.buy" />
      <span :class="{ bought: fruit.buy }"
        >{{ fruit.id }} - {{ fruit.name }}</span
      >
      <button class="btn btn-danger btn-rounded" @click="remove(fruit)">
        x
      </button>-->
    </li>
  </ul>
  <button class="btn btn-warning w-50" @click="hideBought = !hideBought">
    {{ hideBought ? "Show all" : "Hide Bought" }}
  </button>
  <button class="btn btn-warning w-50" @click="desc = !desc">
    {{ !desc ? "Desc" : "Asc" }}
  </button>
</template>

<script>
import FruitItem from "./FruitItem.vue";
function randomId() {
  return Math.floor(Math.random() * 1000);
}

export default {
  name: "FruitsList",
  components: {
    FruitItem,
  },
  mounted() {
    console.log(this.$refs);
    const hasList = localStorage.getItem("list");
    if (hasList) {
      try {
        this.list = JSON.parse(hasList);
      } catch (err) {}
    }
    console.log(localStorage.getItem("list"));
  },
  data() {
    return {
      newFruit: "",
      hideBought: false,
      desc: false,
      searchText: "",
      list: [],
    };
  },
  methods: {
    add() {
      if (this.newFruit.trim() !== "") {
        this.list.push({
          id: randomId(),
          name: this.newFruit,
        });
        this.setItems();
        this.newFruit = "";
      }
    },
    remove(fruit) {
      this.list = this.list.filter((f) => f.id !== fruit.id);
      this.setItems();
    },
    setItems() {
      localStorage.setItem("list", JSON.stringify(this.list));
    },
    sortArray(a, b, field) {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    },
  },
  computed: {
    filteredFruits() {
      let temp = this.list;

      if (this.searchText.trim() !== "") {
        temp = temp.filter((f) =>
          f.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }

      if (this.hideBought) {
        temp = temp.filter((fruit) => !fruit.buy);
      }

      temp = temp.sort((a, b) => this.sortArray(a, b, "name"));

      if (this.desc) {
        temp = temp.reverse();
      }

      return temp;
    },
  },
};
</script>

<style scoped>
</style>