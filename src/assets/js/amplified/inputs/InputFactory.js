class InputFactory {

    constructor() {
        if (this.constructor === InputFactory) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    /**
     * Get instance of input class
     *
     * @param {jQuery|BaseInput} input The reference input
     * @param {Object} params Additional parameters that will assist in data recovery.
     * @param {string|undefined} params.baseName The base name to be used when generating
     * the hidden input type. This param can have an tag "<@> that will be replaced by index of
     * line current"
     * @param {string|undefined} params.index The index of line current
     * @param {string|undefined} params.reference The id that references the source input
     * @param {string|undefined} params.value The value used to set value in edit mode
     * @return {BaseInput}
     */
    static getInstance(input, params) {
        if (typeof input === 'object') {
            switch (true) {
                case InputHelper.inputIsSelectAndMultiple(input):
                    return new InputMultipleValue(input, params);
                case InputHelper.inputIsSelectAndOne(input):
                    return new SelectInputSingle(input, params);
                case InputHelper.elementIsTextArea(input):
                    return new InputSingleValue(input, params);
                case InputHelper.inputIsRadio(input):
                    return new RadioInput(input, params);
                case InputHelper.inputIsCheckbox(input):
                    return new CheckboxInput(input, params);
                case InputHelper.elementIsDivAndCheckbox(input):
                    return new DivInputCheckbox(input, params);
                case InputHelper.elementIsDivAndRadio(input):
                    return new DivInputRadio(input, params);
                case InputHelper.inputIsFile(input):
                    return new FileInput(input, params);
                default:
                    return new InputSingleValue(input, params);

            }
        } else {
            return input;
        }
    }
}