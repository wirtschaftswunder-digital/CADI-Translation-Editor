<template>
  <div id="wrapper">
    <div v-if="isLoading">
      <h1>CADI Translation Editor</h1>

      <p>Loading...</p>
    </div>

    <!-- editor -->
    <div v-show="!isLoading" style="display: grid; gap: 5rem">
      <h1>CADI Translation Editor</h1>

      <!-- Import json -->
      <div>
        <h2>Step 1: Load project (optional)</h2>
        <label for="fileInput">
          <p>
            Load your current custom translations .json file to continue
            editing.
          </p>
        </label>
        <input type="file" name="fileInput" id="fileInput" accept=".json" />
      </div>

      <!-- Edit -->
      <div>
        <h2>Step 2: Edit translations</h2>
        <table v-if="translationKeys && translationRows" id="edit-table">
          <thead>
            <th>Key</th>
            <th v-for="iso in languages" :key="iso" class="iso">{{ iso }}</th>
          </thead>
          <tbody>
            <translationRow
              v-for="{ key, isParent, path } in translationRows"
              :key="path"
              :isParent="isParent"
              :translationKey="key"
              :path="path"
              @open-edit="isParent ? null : openEdit(path)"
            >
              <td v-if="!isParent" v-for="iso in languages" :key="iso">
                <current-word-translation
                  :originalTranslation="
                    defaultTranslationsFlat[`${iso}.${path}`]
                  "
                  :customTranslation="customTranslations[`${iso}.${path}`]"
                />
              </td>
            </translationRow>
          </tbody>
        </table>
      </div>

      <!-- Edit window for one key -->
      <div v-if="editWordPath" id="edit-word-window-wrapper">
        <div
          @click="closeEdit"
          style="display: absolut; left: 0; top: 0; width: 100%; height: 100%"
        ></div>
        <div id="edit-word-window-container">
          <div>
            <table>
              <translation-word
                v-for="iso in languages"
                :key="iso"
                :iso="iso"
                :originalTranslation="
                  defaultTranslationsFlat[`${iso}.${editWordPath}`]
                "
                :customTranslation="
                  customTranslations[`${iso}.${editWordPath}`]
                "
              >
                <textarea
                  rows="5"
                  cols="16"
                  style="min-width: 200px"
                  :value="customTranslations[`${iso}.${editWordPath}`]"
                  :placeholder="
                    defaultTranslationsFlat[`${iso}.${editWordPath}`]
                  "
                  @input="updateTranslation(iso, editWordPath, $event)"
                />
              </translation-word>
            </table>
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <span style="margin-right: 2rem; font-size: small"
                >Changes get automatically saved</span
              >
              <button class="btn" @click="closeEdit">Ok</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Export json -->
      <div>
        <h2>Step 3: Download results</h2>
        <p style="max-width: 540px">
          Download the output file, which contains your custom translations.
          Upload it on your website and make sure to provide your booking mask
          frontend code with the relative path to the uploaded custom
          translations file.
        </p>
        <button class="btn" @click="downloadResult">Download</button>
      </div>
    </div>
  </div>
</template>

<script>
import { downloadObjectAsJson } from "../static/js/downloadJson";
import {
  getLanguages,
  setDefaultTranslations,
  flattenTranslations,
  nestTranslations,
} from "../static/js/main";
import translationRow from "../components/translationRow.vue";

export default {
  data() {
    return {
      customTranslations: {},
      languages: getLanguages(),
      translationKeys: null,
      defaultTranslations: null,
      defaultTranslationsFlat: {},
      editWordPath: null,
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
            thisRef.loadedCustomTranslations = flattenTranslations(obj);
            thisRef.customTranslations = flattenTranslations(obj);
            console.log(thisRef.customTranslations);
            thisRef.setTranslationKeys();
          }
        };
        reader.readAsText(this.files[0]);
      });
  },

  methods: {
    downloadResult() {
      // filter (original != custom translation)
      const editedCustomTranslations = {};
      Object.entries(this.customTranslations).forEach(([key, value]) => {
        const transformedValue = String(value || "").trim();
        if (
          transformedValue.length > 0 &&
          key in this.defaultTranslationsFlat &&
          transformedValue != this.defaultTranslationsFlat[key]
        )
          editedCustomTranslations[key] = transformedValue;
      });
      const obj = nestTranslations(editedCustomTranslations);
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
    openEdit(path) {
      this.editWordPath = path;
    },
    closeEdit() {
      this.editWordPath = null;
    },
    setDefaultTranslations(value) {
      setDefaultTranslations(value);
      this.defaultTranslationsFlat = flattenTranslations(value || {});
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
        else result.original = entryValue;
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
            row.original = entry.original;
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
      this.customTranslations = { ...this.customTranslations }; // JSON.parse(JSON.stringify(this.customTranslations))
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
  font-size: 14px;
}

body {
  --accent: #0084ff;
  --light-text: #8c8c8c;
  --medium-text: #495057;
  --input-bg: #f3f3f3;
  --bg-accent: #dcdcdc30;
  padding: 1rem;
  font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: var(--light-text);
}

#wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10rem;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: black;
}

.btn {
  height: 40px;
  padding: 8px 12px;
  background: black;
  border-radius: 0.2rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

.iso {
  text-transform: uppercase;
}

.translation-group {
  margin-left: 24px;
}

#edit-word-window-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
}

#edit-word-window-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  pointer-events: none;
}

#edit-word-window-container > div {
  max-width: 640px;
  margin-left: 5vmin;
  margin-right: 5vmin;
  pointer-events: all;
  background: white;
  padding: 1rem 2.5rem;
  border-radius: 0.25rem;
}

#edit-table {
  color: var(--medium-text);
}

#edit-table thead th {
  text-align: left;
  top: 0;
  position: sticky;
  background: white;
}

textarea,
.original-translation {
  font-family: inherit;
  border: none;
  background: #f3f3f3;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--medium-text);
  border-radius: 0.25rem;
  overflow: auto;
  resize: vertical;
}
textarea {
  --placeholder-col: var(--light-text);
}
textarea::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--placeholder-col);
  opacity: 1; /* Firefox */
}
textarea:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: var(--placeholder-col);
}
textarea::-ms-input-placeholder {
  /* Microsoft Edge */
  color: var(--placeholder-col);
}

input[type="file"] {
  background-color: var(--bg-accent);
  border: 1px solid var(--light-text);
  border-radius: 4px;
  height: 40px;
  width: 500px;
  color: black;
}
input[type="file"]::file-selector-button {
  border: none;
  border-radius: 4px;
  color: white;
  background-color: black;
  border: 1px solid black;
  height: 40px;
  cursor: pointer;
  transition: all 0.25s ease-in;
  cursor: pointer;
}
input[type="file"]::file-selector-button:hover {
  background-color: #fff;
  color: black;
  transition: all 0.25s ease-in;
}
</style>
