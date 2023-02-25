<template>
  <div>
    <b>{{ translationKey }}</b>
    <div class="translation-group">
      <translation-row
        v-for="c in children"
        :key="c.k"
        :children="c.children"
        :translationKey="c.key"
        :path="c.path"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["translationKey", "children", "path"],
};
</script>
