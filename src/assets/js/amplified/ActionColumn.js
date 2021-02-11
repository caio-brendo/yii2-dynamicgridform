class ActionColumn extends Column {

    /**
     * @param {Object} config The object with config of class
     * @param {string} config.template The button display template
     * @param {Object.<string, Function>|Object.<string, string>} config.buttons The buttons
     * @param {Object.<string, Function>}config.visibleButtons The rule of visualization
     * @param {Object.options<string, string>} config.options The html options
     */
    constructor(config) {
        super(config);
        this.template = config.template;
        this.buttons = config.buttons;
        this.visibleButtons = config.visibleButtons;
    }

    /**
     * @inheritDoc
     */
    async renderContent(values, index) {
        const data = this.template.replace(/{([\w\-\/]+)}/g, (match, contents, offset, input_string) => {
            let isVisible = true;

            if (this.visibleButtons && this.visibleButtons[contents]) {
                isVisible = typeof this.visibleButtons[contents] === 'function' ?
                    this.visibleButtons[contents](values, index)
                    :
                    this.visibleButtons[contents];
            }

            if (isVisible && this.buttons[contents]) {
                return typeof this.buttons[contents] === 'function' ?
                this.buttons[contents](values, index) :
                    this.buttons[contents];
            }

            return '';
        });

        return `<td ${this.cellOptions}>${data}</td>`;

    }

}