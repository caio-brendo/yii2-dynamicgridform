class Column {
    /**
     * @param {Object} config
     * @param {Object.options<string, string>} config.options The html options
     */
    constructor(config) {
        this.options = config.options;
    }

    /**
     * Render the content of column
     * @param values {Object.<string, any>}
     * @param index {string}
     * @return {Promise<string>}
     */
    async renderContent(row, index) {
        throw new Error("Method 'renderContent()' must be implemented.");
    }

    /**
     * Returns de html options for column
     * @return {string}
     */
    get cellOptions(){
        const options = this.options;
        return Object.keys(options)
            .reduce((accumulator, currentValue) => accumulator += `${currentValue}="${options[currentValue]}" `
                , '').trim();
    }
}