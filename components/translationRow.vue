<template>
  <tr>
    <td
      :class="{ 'parent-key': isParent }"
      class="translation-key"
      :style="{ 'padding-left': paddingLeft }"
    >
      {{ translationKey }}
    </td>
    <slot></slot>


  </tr>
</template>

<script>
import { getLanguages } from "../static/js/main";

export default {
  props: ["translationKey", "isParent", "path", "value"],

  emits: ["input"],

  data() {
    return {
      languages: getLanguages(),
    };
  },

  computed: {
    paddingLeft() {
      if (this.isParent) return 0;
      const depth = this.path.split(".").length - 1;
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
