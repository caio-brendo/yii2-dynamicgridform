class UnreferencedColumn extends TextColumn {

    /**
     * @param {Object.<string, any>} values
     * @param {string} index
     * @return {Promise<string>}
     */
    async renderContent(values, index) {

        return `<td ${this.cellOptions}>${await this.getText() + await this.getHiddenInput(index)}</td>`;
    }

    /**
     * Returns text of grid
     * @returns {Promise<string>}
     */
    async getText() {
        return typeof this.textOnInsert === 'function' ?
            this.textOnInsert() :
            this.textOnInsert;
    }

    /**
     * Returns the input hidden to append in the grid
     * @param index {string}
     * @returns {Promise<string>}
     */
    async getHiddenInput(index) {
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