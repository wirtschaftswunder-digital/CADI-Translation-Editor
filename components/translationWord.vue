<template>
  <div class="translation-word">{{ translationKey }}</div>
</template>

<script>
export default {
  props: ["translationKey", "path"],
};
</script>
