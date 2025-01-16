<template>
  <div id="wrapper">
    <!-- loading screen -->
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>

    <!-- editor -->
    <div v-show="!isLoading" style="display: grid; gap: 5rem">
      <h1>CADI Translation Editor</h1>

      <!-- project selection -->
      <div>
        <p>
          You are editing translations for the <strong>{{ projectName }}</strong>. Switch project:
        </p>
        <switch-project-button />
      </div>

      <!-- Edit -->
      <div>
        <h2>Edit translations</h2>
        <div id="column-selection">
          <label v-for="iso in allLanguages" :key="iso">
            <input type="checkbox" :name="iso" :checked="languages.includes(iso)"
              @input="languageSelectionChanged(iso)" />
            <span class="iso">
              {{ iso }}
            </span>
          </label>
        </div>
        <table v-if="translationKeys && translationRows" id="edit-table">
          <thead>
            <th>Key</th>
            <th style="white-space: nowrap">
              Original
              <select class="iso" style="margin-left: 4px" v-model="originalTranslationColumnIso">
                <option v-for="iso in allLanguages" :key="iso" :value="iso" class="iso">
                  {{ iso }}
                </option>
              </select>
            </th>
            <th v-for="iso in languages" :key="iso" class="iso">{{ iso }}</th>
          </thead>
          <tbody>
            <translationRow v-for="{ key, isParent, path } in translationRows" :key="path" :isParent="isParent"
              :translationKey="key" :path="path" @open-edit="isParent ? null : openEdit(path)">
              <td v-if="!isParent">
                {{
                  defaultTranslationsFlat[
                  `${originalTranslationColumnIso}.${path}`
                  ]
                }}
              </td>
              <td v-if="!isParent" v-for="iso in languages" :key="iso">
                <current-word-translation :originalTranslation="defaultTranslationsFlat[`${iso}.${path}`]
                  " :customTranslation="customTranslations[`${iso}.${path}`]" />
              </td>
            </translationRow>
          </tbody>
        </table>
      </div>

      <!-- Edit window for one key -->
      <div v-if="editWordPath" id="edit-word-window-wrapper">
        <div @click="closeEdit" style="display: absolut; left: 0; top: 0; width: 100%; height: 100%"></div>
        <div id="edit-word-window-container">
          <div>
            <table>
              <translation-word v-for="iso in languages" :key="iso" :iso="iso" :originalTranslation="defaultTranslationsFlat[`${iso}.${editWordPath}`]
                " :customTranslation="customTranslations[`${iso}.${editWordPath}`]
                  ">
                <textarea rows="5" cols="16" style="min-width: 200px"
                  :value="customTranslations[`${iso}.${editWordPath}`]" :placeholder="defaultTranslationsFlat[`${iso}.${editWordPath}`]
                    " @input="updateTranslation(iso, editWordPath, $event)" />
              </translation-word>
            </table>
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              ">
              <span style="margin-right: 2rem; font-size: small">Changes get automatically saved</span>
              <button class="btn" @click="closeEdit">Ok</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Export json -->
      <div style="display: flex; justify-content: space-between">
        <button class="btn" @click="save">Save changes</button>
        <div v-if="showDownloadSrcFileSection" style="display: flex; flex-wrap: nowrap">
          <span style="
                margin-right: 6px;
                margin-top: auto;
                margin-bottom: auto;
                font-weight: 500;
              ">Download source file:</span>
          <button v-for="iso in languages" :key="iso" @click="downloadResultAsSourceFile(iso)" class="iso btn"
            style="margin-left: 4px">
            {{ iso }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { downloadObjectAsJson } from '../static/js/downloadJson'
import {
  getLanguages,
  setDefaultTranslations,
  flattenTranslations,
  nestTranslations,
  getUrlParameter,
  getBaseTranslationsUrl,
  loadJSON,
  getProjectName,
  getProjectCode
} from '../static/js/main'
import translationRow from '../components/translationRow.vue'

export default {
  data() {
    return {
      customTranslations: {},
      languages: ['de', 'en'],
      allLanguages: getLanguages(),
      baseUrl: getBaseTranslationsUrl(),
      translationKeys: null,
      defaultTranslations: null,
      defaultTranslationsFlat: {},
      editWordPath: null,
      originalTranslationColumnIso: 'de',
      customTranslationsFileName: null,
      showFileImport: false,
      showDownloadSrcFileSection: !getUrlParameter('anbieterId'),
      projectName: getProjectName()
    }
  },

  created() {
    this.loadDefaultTranslations()

    // check for custom translations file
    const anbieterId = getUrlParameter('anbieterId')
    const subdomain = getUrlParameter('subdomain')
    if (subdomain && anbieterId) {
      this.showFileImport = false
      this.customTranslationsFileName =
        `${subdomain}_${anbieterId}.json`.toLowerCase()
      this.loadCustomTranslationsFromServer()
    } else {
      this.showFileImport = true
      this.$nextTick().then(this.setUpListenerForFileImport)
    }
  },

  mounted() {
    // add listener for leave page warning
    const thisRef = this
    window.addEventListener('beforeunload', function (e) {
      if (thisRef.getHasUnsavedChanges()) {
        const confirmationMessage =
          'It looks like you have been editing something. If you leave before downloading, your changes will be lost.'
        e.returnValue = confirmationMessage //Gecko + IE
        return confirmationMessage //Gecko + Webkit, Safari, Chrome etc.
      }
    })
  },

  methods: {
    async loadCustomTranslationsFromServer() {
      let obj = {}
      try {
        const url = `${this.baseUrl}custom/${this.customTranslationsFileName}`
        const response = await loadJSON(url)
        if (Object.keys(response).length > 0) obj = response
      } catch (error) {
        obj = {}
        console.error(error)
      }
      this.customTranslations = flattenTranslations(obj)
      this.loadedCustomTranslationsFlat = JSON.parse(
        JSON.stringify(this.customTranslations)
      )
      this.setTranslationKeys()
    },
    getHasUnsavedChanges() {
      const currentCustomTranslations = this.getEditedCustomTranslations()
      const loadedCustomTranslationsFlat = this.getEditedCustomTranslations(
        this.loadedCustomTranslationsFlat
      )

      // compare currentCustomTranslations with loadedCustomTranslationsFlat
      // ignore the order of the keys
      const keys = []
        ;[currentCustomTranslations, loadedCustomTranslationsFlat].forEach(
          obj => {
            Object.keys(obj).forEach(key => {
              if (!keys.includes(key)) keys.push(key)
            })
          }
        )
      for (const key of keys) {
        const current = currentCustomTranslations[key]
        const loaded = loadedCustomTranslationsFlat[key]
        if (current !== loaded) return true
      }
      return false
    },
    setUpListenerForFileImport() {
      const thisRef = this
      document
        .getElementById('fileInput')
        .addEventListener('change', function selectedFileChanged() {
          if (this.files.length === 0) {
            console.log('No file selected.')
            return
          }
          const reader = new FileReader()
          reader.onload = function fileReadCompleted() {
            // when the reader is done, the content is in reader.result.
            //console.log(reader.result);
            const str = reader.result //reader.readAsText(this.files[0]);
            const obj = JSON.parse(str)
            if (obj && typeof obj === 'object') {
              thisRef.customTranslations = flattenTranslations(obj)
              thisRef.loadedCustomTranslationsFlat = JSON.parse(
                JSON.stringify(thisRef.customTranslations)
              )
              thisRef.setTranslationKeys()
            }
          }
          reader.readAsText(this.files[0])
        })
    },
    getEditedCustomTranslations(customTranslations) {
      if (!customTranslations) customTranslations = this.customTranslations

      // filter (original != custom translation)
      const editedCustomTranslations = {}
      Object.entries(customTranslations).forEach(([key, value]) => {
        const transformedValue = String(value || '').trim()
        if (
          transformedValue.length > 0 &&
          transformedValue != this.defaultTranslationsFlat[key]
        )
          editedCustomTranslations[key] = transformedValue
      })
      return editedCustomTranslations
    },
    downloadResult() {
      const editedCustomTranslations = this.getEditedCustomTranslations()
      const obj = nestTranslations(editedCustomTranslations)
      const fileName = this.customTranslationsFileName
        ? this.customTranslationsFileName.replace('.json', '')
        : 'translations'
      downloadObjectAsJson(obj, fileName)
    },
    async loadDefaultTranslations() {
      this.setDefaultTranslations(null)
      const urls = this.allLanguages.map(
        iso => `${this.baseUrl}${iso}/translations.json`
      )
      const requests = urls.map(loadJSON)
      const requestResults = await Promise.all(requests)
      const result = {}
      this.allLanguages.forEach((iso, index) => {
        const data = requestResults[index]
        result[iso] = data
      })
      this.setDefaultTranslations(result)
      this.setTranslationKeys()
    },
    openEdit(path) {
      this.editWordPath = path
    },
    closeEdit() {
      this.editWordPath = null
      // TODO: save progress in cookie / local storage
    },
    setDefaultTranslations(value) {
      setDefaultTranslations(value)
      this.defaultTranslationsFlat = flattenTranslations(value || {})
      this.defaultTranslations = value
    },
    setTranslationKeys() {
      const getValueForEntry = (entry, currentPath) => {
        const [entryKey, entryValue] = entry
        const path =
          currentPath === '' ? entryKey : `${currentPath}.${entryKey}`
        const result = {
          key: entryKey,
          children: null,
          path
        }
        if (entryValue && typeof entryValue === 'object')
          result.children = getChildren(entryValue, path)
        else result.original = entryValue
        return result
      }

      const getChildren = (obj, path) =>
        Object.entries(obj).map(entry => getValueForEntry(entry, path))

      let rows = null
      if (this.defaultTranslations) {
        rows = []
        this.translationKeys = getChildren(this.defaultTranslations.de, '')
        // flatten translationKeys ==> rows
        const addRowsForEntry = entry => {
          const row = { key: entry.key, path: entry.path, isParent: false }
          if (entry.children) {
            // is parent node
            row.isParent = true
            rows.push(row)
            entry.children.forEach(addRowsForEntry)
          } else {
            // is leaf node
            row.original = entry.original
            rows.push(row)
          }
        }
        this.translationKeys.forEach(addRowsForEntry)
        this.languages.forEach(iso => {
          rows.forEach(({ isParent, path }) => {
            if (!isParent) {
              const k = `${iso}.${path}`
              this.customTranslations[k] = this.customTranslations[k] || ''
            }
          })
        })
      } else this.translationKeys = null
      this.translationRows = rows
    },
    updateTranslation(iso, path, event) {
      this.customTranslations[`${iso}.${path}`] = event.target.value
      this.customTranslations = { ...this.customTranslations } // JSON.parse(JSON.stringify(this.customTranslations))
    },
    languageSelectionChanged(iso) {
      const isAlreadyInList = this.languages.includes(iso)
      this.languages = this.allLanguages.filter(x => {
        if (x === iso) return !isAlreadyInList
        else return this.languages.includes(x)
      })
    },
    downloadResultAsSourceFile(iso) {
      const translations = {}
      Object.entries(this.customTranslations).forEach(([key, value]) => {
        if (!key.startsWith(iso)) return null
        const transformedValue = String(value || '').trim()
        translations[key] =
          transformedValue.length > 0
            ? transformedValue
            : this.defaultTranslationsFlat[key]
      })
      const obj = nestTranslations(translations)
      downloadObjectAsJson(obj[iso], iso)
    },
    save() {
      const editedCustomTranslations = this.getEditedCustomTranslations()
      const obj = nestTranslations(editedCustomTranslations)
      const fileName = this.customTranslationsFileName
        ? this.customTranslationsFileName.replace('.json', '')
        : 'translations'
      window.saveTranslations({
        data: obj,
        fileName,
        project: getProjectCode()
      })
    }
  },

  computed: {
    isLoading() {
      return this.defaultTranslations === null
    }
  }
}
</script>
