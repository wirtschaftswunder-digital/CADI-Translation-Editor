<template>
  <div class="translation-word">
    <label>
      <b>Original translation</b>
      <br />
      <span>{{ originalTranslation }}</span>
    </label>

    <label>
      <b>Your translation</b>
      <br />
      <slot></slot>
    </label>
  </div>
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
.translation-word {
  display: grid;
  gap: 1rem;
}
</style>
