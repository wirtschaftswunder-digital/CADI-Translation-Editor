<template>
  <div class="translation-word">
    <b class="iso">{{ iso }}</b>
    <div>
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
  </div>
</template>

<script>
import sharedTranslationWordProperties from "../static/js/sharedTranslationWordProperties";

export default {
  props: ["originalTranslation", "customTranslation", "iso"],

  computed: {
    wasEdited: sharedTranslationWordProperties.wasEdited,
    currentTranslation: sharedTranslationWordProperties.currentTranslation,
  },
};
</script>

<style lang="css">
.translation-word {
  display: flex;
  columns: 2;
}

.translation-word > div {
  display: grid;
  gap: 1rem;
}

.translation-word > .iso {
  width: 2rem;
}
</style>
