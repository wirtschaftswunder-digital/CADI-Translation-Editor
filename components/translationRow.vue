<template>
  <tr
    class="translation-row"
    :class="{
      'parent-key': isParent,
      'depth-0': depth === 0,
    }"
    :style="{ '--depth-in-px': `${(depth - 1) * pxPerDepth}px` }"
    @click="$emit('open-edit')"
  >
    <td :class="{ 'parent-key': isParent }" class="translation-key">
      <!-- <div v-if="depth > 1" style="display: absolute">
        <div
          v-for="v in depth - 1"
          :key="v"
          class="depth-line"
          :style="{ '--depth-in-px-2': `${(v - 1) * pxPerDepth}px` }"
        ></div>
      </div> -->
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
      pxPerDepth: 20,
    };
  },

  computed: {
    paddingLeft() {
      return `${this.depth * this.pxPerDepth}px`;
    },
    depth() {
      return this.path.split(".").length - 1;
    },
  },
};
</script>

<style lang="css">
.parent-key {
  font-weight: bold;
}

.translation-row {
  --line-color: var(--light-text);
  cursor: pointer;
  position: relative;
}
.translation-row.parent-key {
  cursor: default;
}
.translation-row td,
#edit-table th {
  padding: 1rem 0.5rem;
}

.translation-row:not(.depth-0) td:first-child::before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  height: 100%;
  transform: translateY(-50%);
  transform-origin: center;
  left: var(--depth-in-px);
  width: 17px;
  border-left: 1px solid var(--line-color);
  border-bottom: 1px solid var(--line-color);
}

.translation-row:nth-child(odd) {
  background: #dcdcdc30;
}

.translation-row:hover {
  background: #006aff1f;
}

.depth-line {
  content: "";
  height: 100%;
  border-left: 1px solid var(--line-color);
  top: 0;
  left: var(--depth-in-px-2);
  position: absolute;
}
</style>
