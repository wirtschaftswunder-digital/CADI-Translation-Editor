<template>
  <div>
    <h1>CADI Translation Editor</h1>

    <p v-if="isLoading">Loading...</p>

    <!-- editor -->
    <div v-show="!isLoading">
      <!-- Import json -->
      <label>
        <span>Load project</span>
        <input type="file" id="fileInput" accept=".json" />
      </label>
      <br />
      <br />

      <!-- Edit -->
      <table v-if="translationKeys && translationRows">
        <thead>
          <th>Key</th>
          <th v-for="iso in languages" :key="iso">{{ iso }}</th>
        </thead>
        <tbody></tbody>
        <translationRow
          v-for="{ key, isParent, path } in translationRows"
          :key="path"
          :isParent="isParent"
          :translationKey="key"
          :path="path"
        >
          <td v-for="(iso, index) in languages" :key="iso">
            <input
              type="text"
              :value="customTranslations[`${iso}.${path}`]"
              @input="updateTranslation(iso, path, $event)"
            />
          </td>
        </translationRow>
      </table>

      {{ customTranslations }}

      <!-- Export json -->
      <br />
      <button @click="downloadResult">Download</button>
    </div>
  </div>
</template>

<script>
import { downloadObjectAsJson } from "../static/js/downloadJson";
import {
  getLanguages,
  setDefaultTranslations,
  flattenCustomTranslations,
  nestCustomTranslations,
} from "../static/js/main";
import translationRow from "../components/translationRow.vue";

export default {
  data() {
    return {
      customTranslations: {},
      languages: getLanguages(),
      translationKeys: null,
      defaultTranslations: null,
    };
  },

  created() {
    this.loadDefaultTranslations();
  },

  mounted() {
    // listener for file import
    const thisRef = this;
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
          //console.log(reader.result);
          const str = reader.result; //reader.readAsText(this.files[0]);
          const obj = JSON.parse(str);
          if (obj && typeof obj === "object") {
            thisRef.loadedCustomTranslations = flattenCustomTranslations(obj);
            thisRef.customTranslations = flattenCustomTranslations(obj);
            console.log(thisRef.customTranslations);
            thisRef.setTranslationKeys();
          }
        };
        reader.readAsText(this.files[0]);
      });
  },

  methods: {
    downloadResult() {
      const obj = nestCustomTranslations(this.customTranslations);
      downloadObjectAsJson(obj, "translations");
    },
    async loadDefaultTranslations() {
      this.setDefaultTranslations(null);
      const baseUrl =
        "https://main.d1u2qdrqduf5v6.amplifyapp.com/translations/";
      const urls = this.languages.map(
        (iso) => `${baseUrl}${iso}/translations.json`
      );
      const requests = urls.map((url) => this.$axios.get(url));
      const requestResults = await Promise.all(requests);
      const result = {};
      this.languages.forEach((iso, index) => {
        const rawData = requestResults[index].data;
        const data = typeof rawData === "string" ? JSON.parse(data) : rawData;
        result[iso] = data;
      });
      this.setDefaultTranslations(result);
      this.setTranslationKeys();
    },
    setDefaultTranslations(value) {
      setDefaultTranslations(value);
      this.defaultTranslations = value;
    },
    setTranslationKeys() {
      const getValueForEntry = (entry, currentPath) => {
        const [entryKey, entryValue] = entry;
        const path =
          currentPath === "" ? entryKey : `${currentPath}.${entryKey}`;
        const result = {
          key: entryKey,
          children: null,
          path,
        };
        if (entryValue && typeof entryValue === "object")
          result.children = getChildren(entryValue, path);
        return result;
      };

      const getChildren = (obj, path) =>
        Object.entries(obj).map((entry) => getValueForEntry(entry, path));

      let rows = null;
      if (this.defaultTranslations) {
        rows = [];
        this.translationKeys = getChildren(this.defaultTranslations.de, "");
        // flatten translationKeys ==> rows
        const addRowsForEntry = (entry) => {
          const row = { key: entry.key, path: entry.path, isParent: false };
          if (entry.children) {
            // is parent node
            row.isParent = true;
            rows.push(row);
            entry.children.forEach(addRowsForEntry);
          } else {
            // is leaf node
            rows.push(row);
          }
        };
        this.translationKeys.forEach(addRowsForEntry);
        this.languages.forEach((iso) => {
          rows.forEach(({ isParent, path }) => {
            if (!isParent) {
              const k = `${iso}.${path}`;
              this.customTranslations[k] = this.customTranslations[k] || "";
            }
          });
        });
      } else this.translationKeys = null;
      this.translationRows = rows;
    },
    updateTranslation(iso, path, event) {
      this.customTranslations[`${iso}.${path}`] = event.target.value;
    },
  },

  computed: {
    isLoading() {
      return this.defaultTranslations === null;
    },
  },
};
</script>

<style lang="css">
html {
  --accent: #0084ff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

body {
  padding: 1rem;
}

.btn {
  padding: 2px 6px;
  background: var(--accent);
}

.translation-group {
  margin-left: 24px;
}
</style>
