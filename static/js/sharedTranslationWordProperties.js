export default {
    wasEdited: function () {
        return this.customTranslation && this.customTranslation.trim().length > 0 && this.customTranslation != this.originalTranslation
    },

    currentTranslation: function () {
        return this.wasEdited
            ? this.customTranslation
            : this.originalTranslation;
    },
}