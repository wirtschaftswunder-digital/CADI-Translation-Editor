<template>
  <div class="translation-word">{{ translationKey }}</div>
</template>

<script>
import { getDefaultTranslations } from '../static/js/main';

export default {
  props: ["translationKey", "path"],

  created(){
    console.log(getDefaultTranslations());
  }
};
</script>
