<template>
  <div>
    <!-- Import json -->
    <label>
      <span>Load project</span>
      <input type="file" id="fileInput" accept=".json" />
    </label>

    <!-- Edit -->
    <!-- TODO -->

    <!-- Export json -->
    <button @click="downloadResult">Download</button>
  </div>
</template>

<script>
import { downloadObjectAsJson } from "../static/js/downloadJson";

export default {
  data() {
    return {
      customTranslations: {},
    };
  },

  mounted() {
    document
      .getElementById("fileInput")
      .addEventListener("change", function selectedFileChanged() {
        if (this.files.length === 0) {
          console.log("No file selected.");
          return;
        }
        const reader = new FileReader();
        reader.onload = function fileReadCompleted() {
          // when the reader is done, the content is in reader.result.
          console.log(reader.result);
        };
        const str = reader.readAsText(this.files[0]);
        const obj = JSON.parse(str);
        if (obj && typeof obj === "object") {
          this.customTranslations = JSON.parse(JSON.stringify(obj));
        }
      });
  },

  methods: {
    downloadResult() {
      downloadObjectAsJson(this.customTranslations, "translations");
    },
  },
};
</script>

<style lang="css">
html {
  --accent: #0084ff;
}

.btn {
  padding: 2px 6px;
  background: var(--accent);
}
</style>
