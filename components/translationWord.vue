<template>
  <tr class="translation-word">
    <td class="iso">
      <b class="iso">{{ iso }}</b>
    </td>
    <td>
      <div class="translation-word-grid">
        <label>
          <b>Original:</b>
          <span class="original-translation">{{ originalTranslation }}</span>
        </label>

        <label>
          <b>Dein Text:</b>
          <slot></slot>
        </label>
      </div>
    </td>
  </tr>
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
.translation-word-grid {
  display: grid;
  gap: 1rem;
}

.translation-word td.iso {
  width: 3rem;
  vertical-align: top;
}

.translation-word:first-child td {
  padding-top: 0;
}
.translation-word:last-child td {
  padding-bottom: 3rem;
}
.translation-word td {
  padding-top: 3rem;
}
</style>

<style lang="css" scoped>
label {
  display: grid;
  gap: 0.2rem;
}

label > b,
.iso {
  color: black
}

.translation-word .original-translation {
  resize: none;
  background: none;
  padding: 0;
}
</style>
