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


export function flattenTranslations(obj) {
    const result = {}

    const insertValue = ([entryKey, entryValue], path) => {
        const p = path === "" ? entryKey : `${path}.${entryKey}`
        if (entryValue && typeof entryValue === "object")
            Object.entries(entryValue).forEach((c) => insertValue(c, p))
        else
            result[p] = entryValue
    }

    Object.entries(obj).forEach((entry) => insertValue(entry, ""))
    return result
}


export function nestTranslations(obj) {
    // TODO
    return obj
}