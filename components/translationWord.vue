<template>
  <div>
    {{ originalTranslation }}
    <button>
      {{ currentTranslation }}
    </button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["originalTranslation", "customTranslation"],

  computed: {
    currentTranslation() {
      return this.customTranslation && this.customTranslation.trim().length > 0
        ? this.customTranslation
        : this.originalTranslation;
    },
  },
};
</script>
