<template>
  <tr
    class="translation-row"
    :class="{ 'parent-key': isParent }"
    @click="$emit('open-edit')"
  >
    <td :class="{ 'parent-key': isParent }" class="translation-key">
      <span :style="{ 'padding-left': paddingLeft }">
        {{ translationKey }}
      </span>
    </td>
    <td v-if="isParent" v-for="iso in languages" :key="iso"></td>
    <slot></slot>
  </tr>
</template>

<script>
import { getLanguages } from "../static/js/main";

export default {
  props: ["translationKey", "isParent", "path", "value"],

  emits: ["input", "open-edit"],

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

.translation-row {
  cursor: pointer;
}
.translation-row.parent-key {
  cursor: default;
}
.translation-row td,
#edit-table th {
  padding: 1rem 0.5rem;
}

.translation-row:nth-child(odd) {
  background: #dcdcdc30;
}

.translation-row:hover {
  background: #006aff1f;
}
</style>
