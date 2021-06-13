class NormalColumn extends TextColumn {

    /**
     * @type {jQuery}
     */
    input;

    /**
     * @inheritDoc
     * @param {string} config.id The id of input
     */
    constructor(config) {
        super(config);

        this.id = config.id;
        this.input = $('#' + this.id);

    }

    /**
     * Return id of input referenced
     * @returns {string}
     */
    get inputId() {
        return this.input.attr('id');
    }

    /**
     * Returns element html referenced by input
     * @returns {Element}
     */
    get elementInput() {
        return this.input.get(0);
    }

    /**
     * @param {Object.<string, any>} values
     * @param {string} index
     * @return {Promise<string>}
     */
    async renderContent(values, index) {
        const factory = InputFactory.getInstance(this.input, {
            baseName: this.templateInputName,
            index: index,
            reference: this.inputId
        });

        return `<td ${this.cellOptions}>${await this.getText(factory) + await this.getHiddenInput(factory)}</td>`;
    }

    /**
     * Returns text of grid
     * @param {BaseInput} factory
     * @returns {Promise<string>}
     */
    async getText(factory) {
        if (this.textOnInsert) {
            return typeof this.textOnInsert === 'function' ?
                this.textOnInsert(this.elementInput) :
                this.textOnInsert;
        }

        return factory.getValueGrid();
    }

    /**
     * Returns the input hidden to append in the grid
     * @param {BaseInput} factory
     * @returns {Promise<string>}
     */
    async getHiddenInput(factory) {
        if (this.valueOnInsert) {
            let val = typeof this.valueOnInsert === 'function' ?
                this.valueOnInsert(this.elementInput) :
                this.valueOnInsert;
            val = Array.isArray(val) ?
                Array.isArray(val) :
                [val];

            const ret = [];
            val.forEach((v) => {
                ret.push({
                    reference: this.inputId,
                    value: v
                });
            })

            return InputHelper.getHiddenInput(this.templateInputName, ret, factory.index);
        }

        return await factory.getInputHidden();
    }
}