export function getLanguages() {
    return ["de", "en"]
}


let defaultTranslations = null
export function setDefaultTranslations(value) {
    defaultTranslations = value
}


export function getDefaultTranslations() {
    return defaultTranslations
}


export function flattenCustomTranslations(obj) {
    // TODO
    return JSON.parse(JSON.stringify(obj))
}


export function nestCustomTranslations(obj) {
    // TODO
    return obj
}