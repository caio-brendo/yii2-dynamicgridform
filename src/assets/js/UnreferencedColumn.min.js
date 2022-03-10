class UnreferencedColumn extends TextColumn {

    /**
     * @param {Object.<string, any>} values
     * @param {string} index
     * @return {Promise<string>}
     */
    async renderContent(values, index) {

        return `<td ${this.cellOptions}>${await this.getText(index) + await this.getHiddenInput(index)}</td>`;
    }

    /**
     * Returns text of grid
     * @param index {string}
     * @returns {Promise<string>}
     */
    async getText(index) {
        return typeof this.textOnInsert === 'function' ?
            this.textOnInsert(index, InputHelper.getNewNameInput(this.templateInputName, false, index)) :
            this.textOnInsert;
    }

    /**
     * Returns the input hidden to append in the grid
     * @param index {string}
     * @returns {Promise<string>}
     */
    async getHiddenInput(index) {
        if (!this.showHiddenInput) {
            return '';
        }

        let val = typeof this.valueOnInsert === 'function' ?
            this.valueOnInsert() :
            this.valueOnInsert;
        val = Array.isArray(val) ?
            Array.isArray(val) :
            [val];

        const ret = [];
        val.forEach((v) => {
            ret.push({
                value: v
            });
        })

        return InputHelper.getHiddenInput(this.templateInputName, ret, index);
    }
}