import projectConfigs from '../json/projects.json'

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

const supportedLanguages = getValueFromProjectConfig('supportedLanguages')

export function getLanguages () {
  return supportedLanguages
}

export function getBaseTranslationsUrl () {
  return getValueFromProjectConfig('translationsUrl')
}

export function getProjectName () {
  return getValueFromProjectConfig('projectName')
}

export function getOtherProjects () {
  return Object.entries(projectConfigs)
    .filter(([key, value]) => key !== getProjectCode())
    .map(([key, value]) => {
      return { ...value, projectCode: key }
    })
}

function getValueFromProjectConfig (key) {
  return projectConfigs[getProjectCode()][key]
}

export function getProjectCode () {
  const value = getUrlParameter('project')
  if (value && typeof value === 'string' && value.length > 0)
    return value.toLowerCase()
  return 'bm'
}

let defaultTranslations = null
export function setDefaultTranslations (value) {
  defaultTranslations = value
}

export function flattenTranslations (obj) {
  const result = {}

  const insertValue = ([entryKey, entryValue], path) => {
    const p = path === '' ? entryKey : `${path}.${entryKey}`
    if (entryValue && typeof entryValue === 'object')
      Object.entries(entryValue).forEach(c => insertValue(c, p))
    else result[p] = entryValue
  }

  Object.entries(obj).forEach(entry => insertValue(entry, ''))
  return result
}

export function nestTranslations (data) {
  if (Array.isArray(data) || Object(data) !== data) return data
  const result = {}
  let cur, prop, idx, last, temp
  for (const p of Object.keys(data)) {
    cur = result
    prop = ''
    last = 0
    do {
      idx = p.indexOf('.', last)
      temp = p.substring(last, idx !== -1 ? idx : undefined)
      if (!cur[prop]) {
        cur[prop] = {}
      }
      cur = cur[prop]
      prop = temp
      last = idx + 1
    } while (idx >= 0)
    cur[prop] = data[p]
  }
  return result['']
}

export function getUrlParameter (parameterName) {
  return urlParams.get(parameterName)
}

export function getRequiredUrlParameter (parameterName) {
  let result = getUrlParameter(parameterName)
  if (typeof result === 'string' && result.length > 0) return result
  if (typeof result === 'number' && !isNaN(result)) return result

  // error case
  throw `Missing URL parameter: ${parameterName}`
}

export function loadJSON (url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      dataType: 'json',
      success: response => {
        try {
          if (typeof response === 'string') {
            resolve(JSON.parse(response))
          } else if (typeof response === 'object') {
            resolve(response)
          } else {
            resolve({})
          }
        } catch (error) {
          console.error(error)
          resolve({})
        }
      },
      error: error => {
        reject(error)
      }
    })
  })
}

export function setUrlParameter (parameterName, parameterValue) {
  insertParam(parameterName, parameterValue)
}

function insertParam (key, value) {
  key = encodeURIComponent(key)
  value = encodeURIComponent(value)

  // kvp looks like ['key1=value1', 'key2=value2', ...]
  let kvp = document.location.search.substr(1).split('&')
  let i = 0

  for (; i < kvp.length; i++) {
    if (kvp[i].startsWith(key + '=')) {
      let pair = kvp[i].split('=')
      pair[1] = value
      kvp[i] = pair.join('=')
      break
    }
  }
  if (i >= kvp.length)
    kvp[kvp.length] = [key, value].join('=')
  let params = kvp.join('&')
  document.location.search = params  // reload page with new params
}
