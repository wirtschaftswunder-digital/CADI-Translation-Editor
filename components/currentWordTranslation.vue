<template>
  <span class="current-word-translation" :class="{ edited: wasEdited }">
    {{ currentTranslation }}
  </span>
</template>

<script>
import sharedTranslationWordProperties from "../static/js/sharedTranslationWordProperties";

export default {
  props: ["originalTranslation", "customTranslation"],

  computed: {
    wasEdited: sharedTranslationWordProperties.wasEdited,
    currentTranslation: sharedTranslationWordProperties.currentTranslation,
  },
};
</script>

<style lang="css">
.current-word-translation {
  padding: 1px 2px;
  border-radius: 5px;
}
.current-word-translation.edited {
  background: rgba(255, 181, 22, 0.52);
}
</style>
