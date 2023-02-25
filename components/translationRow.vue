<template>
  <tr>
    <td
      :class="{ 'parent-key': isParent }"
      class="translation-key"
      :style="{ 'padding-left': paddingLeft }"
    >
      {{ translationKey }}
    </td>
    <td>{{ isParent }}</td>
  </tr>
</template>

<script>
export default {
  props: ["translationKey", "isParent", "path"],

  computed: {
    paddingLeft() {
      if (this.isParent) return 0;
      const depth = this.path.split('.').length - 1;
      console.log(this.path, depth);
      return `${depth * 20}px`;
    },
  },
};
</script>

<style lang="css">
.parent-key {
  font-weight: bold;
}
</style>
