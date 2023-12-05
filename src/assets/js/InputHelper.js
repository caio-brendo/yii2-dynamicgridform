class InputHelper {

    constructor() {
        throw Error('This class don´t should be instantiated');
    }

    static NODE_TYPE_INPUT = 'INPUT';
    static NODE_TYPE_SELECT = 'SELECT';
    static NODE_TYPE_DIV = 'DIV';
    static NODE_TYPE_TEXTAREA = 'TEXTAREA';
    static INPUT_TYPE_FILE = 'file';
    static INPUT_TYPE_CHECKBOX = 'checkbox';
    static INPUT_TYPE_RADIO = 'radio';
    static RETURN_TYPE_INPUT = 'input';
    static RETURN_TYPE_VALUE = 'value';
    static INPUT_TYPE_TEXT = 'text';
    static INPUT_TYPE_SELECT_ONE = 'select-one';
    static INPUT_TYPE_SELECT_MULTIPLE = 'select-multiple';


    /**
     * Return input type hidden
     * @param baseName {string}
     * @param values {Array<string>}
     * @param index {string}
     * @return {string}
     */
    static getHiddenInput(baseName, values, index) {
        // If value is empty returns input with value empty;
        if (values.length === 0) {
            return `<input type="hidden" class="dgf-reorder" name="${this.getNewNameInput(baseName, false, index)}" value="" data-reference="">`;
        }

        let ret = [];
        values.forEach((v) => {
            const value = this.encodeValue(v.value);
            ret.push(
                `<input 
                    type="hidden" 
                    class="dgf-reorder" 
                    name="${this.getNewNameInput(baseName, values.length > 1, index)}"
                    value="${value}" 
                    ${v.reference ? `data-reference="${v.reference}"` : ''}
                >`
            );
        });

        return ret.join('');
    }

    /**
     * Get name of input
     * @param baseName {string}
     * @param multiple {boolean}
     * @param index {string}
     * @return {string}
     */
    static getNewNameInput(baseName, multiple = false, index) {
        if (multiple) {
            return baseName.replace('<@>', index) + '[]';
        }
        return baseName.replace('<@>', index);
    }


    /**
     * Checks if input informed is text
     * @param input {jQuery}
     * @return {boolean}
     */
    static inputIsText(input) {
        return this.getTypeInput(input) === InputHelper.INPUT_TYPE_TEXT;
    }

    /**
     * Checks if input informed is file
     * @param input {jQuery}
     * @return {boolean}
     */
    static inputIsFile(input) {
        return this.getTypeInput(input) === InputHelper.INPUT_TYPE_FILE;
    }

    /**
     * Checks if input informed is checkbox
     * @param input {jQuery}
     * @return {boolean}
     */
    static inputIsCheckbox(input) {
        return this.getTypeInput(input) === InputHelper.INPUT_TYPE_CHECKBOX;
    }

    /**
     * Checks if input informed is radio
     * @param input {jQuery}
     * @return {boolean}
     */
    static inputIsRadio(input) {
        return this.getTypeInput(input) === InputHelper.INPUT_TYPE_RADIO;
    }

    /**
     * Checks if element informed is input
     * @param element {jQuery}
     * @return {boolean}
     */
    static elementIsInput(element) {
        return element.prop('tagName') === InputHelper.NODE_TYPE_INPUT;
    }

    /**
     * Checks if element informed is input
     * @param element {jQuery}
     * @return {boolean}
     */
    static elementIsTextArea(element) {
        return element.prop('tagName') === InputHelper.NODE_TYPE_TEXTAREA;
    }

    /**
     * Checks if element informed is input
     * @param element {jQuery}
     * @return {boolean}
     */
    static elementIsSelect(element) {
        return element.prop('tagName') === InputHelper.NODE_TYPE_SELECT;
    }

    /**
     * Checks if element informed is input
     * @param element {jQuery}
     * @return {boolean}
     */
    static elementIsDiv(element) {
        return element.prop('tagName') === InputHelper.NODE_TYPE_DIV;
    }

    /**
     * Get type of input informed
     * @param input {jQuery}
     * @return string
     */
    static getTypeInput(input) {
        return input.prop('type');
    }

    /**
     * Checks if element informed is an select multiple
     * @param input {jQuery}
     * @returns {boolean}
     */
    static inputIsSelectMultiple(input){
        return this.getTypeInput(input) === InputHelper.INPUT_TYPE_SELECT_MULTIPLE;
    }

    /**
     * Checks if element informed is an select one
     * @param input {jQuery}
     * @returns {boolean}
     */
    static inputIsSelectOne(input){
        return this.getTypeInput(input) === InputHelper.INPUT_TYPE_SELECT_ONE;
    }

    /**
     * Checks if element is select and is select one
     * @param input {jQuery}
     * @returns {boolean}
     */
    static inputIsSelectAndOne(input){
        return this.elementIsSelect(input) && this.inputIsSelectOne(input);
    }

    /**
     * Checks if element is select and is select multiple
     * @param input {jQuery}
     * @returns {boolean}
     */
    static inputIsSelectAndMultiple(input){
        return this.elementIsSelect(input) && this.inputIsSelectMultiple(input);
    }

    /**
     * Checks if element is div and has input type radio
     * @param input {jQuery}
     * @returns {boolean}
     */
    static elementIsDivAndRadio(input){
        const sons = $(input).find('input[type="radio"]');
        return this.elementIsDiv(input) && sons.length > 0;
    }

    /**
     * Checks if element is div and has input type checkbox
     * @param input {jQuery}
     * @returns {boolean}
     */
    static elementIsDivAndCheckbox(input){
        const sons = $(input).find('input[type="checkbox"]');
        return this.elementIsDiv(input) && sons.length;
    }

    /**
     * Encode value removing & and replacing for &quot;
     * @returns {string|*}
     * @param {*} value
     */
    static encodeValue(value)
    {
        if (typeof value === 'string') {
            return value.replace(/"/g, '&quot;');
        }

        return value;
    }
}