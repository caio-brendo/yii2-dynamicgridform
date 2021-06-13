class TextColumn extends Column {
    /**
     * @inheritDoc
     * @param {Object} config
     * @param {string} config.attribute The attribute of input
     * @param {boolean} config.cleanAfterInsert If clean input after insert
     * @param {string} config.templateInputName
     * @param {string|Function|undefined} config.textOnInsert Custom Text shown in the grid
     * @param {string|Function|undefined} config.valueOnInsert Custom value in the grid
     * @param {Object.options<string, string>} config.options The html options
     */
    constructor(config) {
        super(config);

        if (this.constructor === Column) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.attribute = config.attribute;
        this.cleanAfterInsert = config.cleanAfterInsert;
        this.templateInputName = config.templateInputName;
        this.textOnInsert = config.textOnInsert;
        this.valueOnInsert = config.valueOnInsert;
    }

}