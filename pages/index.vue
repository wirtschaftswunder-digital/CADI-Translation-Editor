<template>
  <div>
    <input type="file" id="fileInput" accept=".json" />
  </div>
</template>

<script>
import { downloadObjectAsJson } from "../static/js/downloadJson";

export default {
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
        reader.readAsText(this.files[0]);

        downloadObjectAsJson({ test: "abc" }, "translations");
      });
  },
};
</script>
