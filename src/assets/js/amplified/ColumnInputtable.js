class ColumnInputtable extends Column {
    /**
     * @inheritDoc
     * @param {Object} config
     * @param {string} config.id The id of input
     * @param {string} config.attribute The attribute of input
     * @param {boolean} config.cleanAfterInsert If clean input after insert
     * @param {string} config.templateInputName
     * @param {string|Function|undefined} config.textOnInsert Custom Text shown in the grid
     * @param {string|Function|undefined} config.valueOnInsert Custom value in the grid
     * @param {Object.options<string, string>} config.options The html options
     */
    constructor(config) {
        super(config);
        this.id = config.id;
        this.attribute = config.attribute;
        this.cleanAfterInsert = config.cleanAfterInsert;
        this.templateInputName = config.templateInputName;
        this.textOnInsert = config.textOnInsert;
        this.valueOnInsert = config.valueOnInsert;
        /**
         * @type {jQuery}
         */
        this.input = $('#' + this.id);
    }

    /**
     * Return id of input referenced
     * @returns {string}
     */
    get inputId(){
        return this.input.attr('id');
    }

    /**
     * Returns element html referenced by input
     * @returns {Element}
     */
    get elementInput(){
        return this.input.get(0);
    }
}