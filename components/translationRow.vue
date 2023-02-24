<template>
  <div>
    <translation-word
      v-if="children === null"
      :translationKey="translationKey"
      :children="children"
      :path="path"
    />
    <translation-group
      v-else
      :translationKey="translationKey"
      :children="children"
      :path="path"
    />
  </div>
</template>

<script>
export default {
  name: "translation-row",

  props: ["translationKey", "children", "path"],
};
</script>
