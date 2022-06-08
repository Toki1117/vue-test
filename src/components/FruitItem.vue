<script>
export default {
  name: "FruitItem",
  props: {
    item: null,
  },
  emits: ["remove"],
  computed: {
    fruitItem() {
      return this.item;
    },
  },
};
</script>

<template>
  <div class="d-flex flex-row justify-content-between align-items-center">
    <input class="checkbox" type="checkbox" v-model="fruitItem.buy" />
    <span :class="{ bought: fruitItem.buy }"
      >{{ fruitItem.id }} - {{ fruitItem.name }}</span
    >
    <button
      class="btn btn-danger btn-rounded"
      @click="$emit('remove', fruitItem)"
    >
      x
    </button>
  </div>
</template>

<style scoped>
.bought {
  text-decoration: line-through;
}
</style>