<template>
  <div>{{ translationKey }}</div>
</template>

<script>
export default {
  name: "translation-word",
  props: ["translationKey", "path"],
};
</script>
