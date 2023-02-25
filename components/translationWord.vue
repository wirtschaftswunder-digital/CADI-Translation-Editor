<template>
  <div>
    <button @click="showEdit = true">
      {{ currentTranslation }}
    </button>
    <div v-if="showEdit">
      {{ originalTranslation }}
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["originalTranslation", "customTranslation"],

  data() {
    return {
      showEdit: false,
    };
  },

  computed: {
    currentTranslation() {
      return this.customTranslation && this.customTranslation.trim().length > 0
        ? this.customTranslation
        : this.originalTranslation;
    },
  },
};
</script>
