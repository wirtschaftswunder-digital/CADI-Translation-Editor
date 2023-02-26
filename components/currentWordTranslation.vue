<template>
  <span class="current-word-translation" :class="{ edited: wasEdited }">
    {{ currentTranslation }}
  </span>
</template>

<script>
import sharedTranslationWordProperties from '../static/js/sharedTranslationWordProperties';

export default {
  props: ["originalTranslation", "customTranslation"],

  computed: {
    wasEdited: sharedTranslationWordProperties.wasEdited,
    currentTranslation: sharedTranslationWordProperties.currentTranslation,
  },
};
</script>
