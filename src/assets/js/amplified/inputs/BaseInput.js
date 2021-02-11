/**
 * @class
 * Abstract class that reference an input.
 */
class BaseInput {
    /**
     *
     * @param {jQuery} input The element that will used to recover the data.
     * @param {Object} params Additional parameters that will assist in data recovery.
     * @param {string|undefined} params.baseName The base name to be used when generating
     * the hidden input type. This param can have an tag "<@> that will be replaced by index of
     * line current"
     * @param {string|undefined} params.index The index of line current
     * @param {string|undefined} params.reference The id that references the source input
     */
    constructor(input, params) {
        if (this.constructor === BaseInput) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.input = input;
        this.baseName = params?.baseName;
        this.index = params?.index;
        this.reference = params?.reference;
    }

    /**
     * Get value of the input. This method must be overwrite and returns
     * the value of input.
     * @return {Promise<string>|Promise<Array>}
     */
    async getValue() {
        throw new Error("Method 'value()' must be implemented.");
    }

    /**
     * Get value of the input to appear in grid. This method must be overwrite and return
     * the value formatted to show to final user.
     * @return {string}
     */
    getValueGrid() {
        throw new Error("Method 'valueGrid()' must be implemented.");
    }

    /**
     * Get the input type hidden for reference input.
     * @return {Promise<string>}
     * @throws {Error} If the attribute reference is not defined
     */
    async getInputHidden() {
        throw new Error("Method 'inputHidden()' must be implemented.");
    }

    /**
     * Get the new name of input. Used in input type hidden
     * @return {string}
     * @throws {Error} If the attribute baseName or index is not defined
     */
    getNewNameInput() {
        throw new Error("Method 'inputHidden()' must be implemented.");
    }

    /**
     * Set new value to reference input.
     * @param {string} value The new value
     * @return {void}
     */
    setValue(value) {
        throw new Error("Method 'setValue()' must be implemented.");
    }

    /**
     * Verify if base name was informed
     * @return {boolean}
     */
    hasBaseName() {
        return !!this.baseName;
    }

    /**
     * Verify if index was informed
     * @return {boolean}
     */
    hasIndex() {
        return !!this.index;
    }

    /**
     * Verify if reference was informed
     * @return {boolean}
     */
    hasReference() {
        return !!this.reference
    }

    /**
     * Get the params informed
     * @returns {{reference: (string|undefined), index: (string|undefined), baseName: (string|undefined)}}
     */
    get params() {
        return {
            'baseName': this.baseName,
            'index': this.index,
            'reference': this.reference
        }
    }
}