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