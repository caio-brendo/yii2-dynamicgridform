/**
 * @typedef {Object} ColumnType
 * @property {string} id
 * @property {Column} classJs
 * @property {boolean} cleanAfterInsert
 * @property {string} templateInputName
 * @property {string} attribute
 * @typedef {Object} ConfigType
 * @property {string} insertButton
 * @property {string} tableId
 * @property {string} tableId
 * @property {string} widgetContainer
 * @property {number} max
 * @property {Array<ColumnType>} columns
 * @property {string} insertPosition
 * @property {Object} options
 * @property {Object} rowOptions
 * @property {Object} rowOptions
 * @property {string} deleteRowClass
 */
class DynamicGridForm {
    /**
     * @var {ConfigType}
     */
    config;
    /**
     * @var {string}
     */
    insertButton;
    /**
     * @var {jQuery}
     */
    table;
    /**
     * @var {number}
     */
    index;
    static bottom = 'bottom';
    static top = 'top';

    /**
     * @param {ConfigType} config
     */
    constructor(config) {
        this.config = config;
        this.insertButton = $('#' + config.insertButton);
        this.table = $('#' + config.tableId);
        this.index = this.currentTotalRows;

        this.insertButton.on('click', this.handleClickInsertButton.bind(this));

        if (this.deleteRowClass) {
            $(document).on('click', `#${this.widgetContainer} .${this.deleteRowClass}`, this.handleDeleteRow.bind(this));
        }

        $(document).on('click', this.selectorTableRows, this.handleClickRow.bind(this));
        $('#' + this.config.widgetContainer).on('cancelEdit', this.cancelEdit.bind(this));

    }

    /**
     * Checks whether the limit has been reached
     * @returns {boolean}
     */
    limitReached() {
        if (this.config.max === 0) {
            return false;
        }

        return (this.index + 1) > this.config.max;
    }

    /**
     * Handles with the limit reached
     * @returns {void}
     */
    handleLimitReached() {
        this.triggerLimitReached();
    }

    /**
     * Get configuration columns
     * @return {Array<ColumnType>}
     */
    get columns() {
        return this.config.columns;
    }

    /**
     * Checks whether the insert is at the bottom
     * @return {boolean}
     */
    isInsertBottom() {
        return this.config.insertPosition === DynamicGridForm.bottom;
    }

    /**
     * Handle with click insert button
     * @return {Promise<void>}
     */
    async handleClickInsertButton() {
        if (this.isEditMode()) {
            this.triggerBeforeUpdate();
            const html = await this.getHtmlRow();
            const row = this.rowEdit;
            row.after(html);
            row.remove();
            this.reorderInputs();
            this.triggerAfterUpdate(html);
        } else {
            // If limit has been reached
            if (this.limitReached()) {
                this.handleLimitReached();
                return;
            }

            // Dispatch before insert event
            const handle = await this.triggerBeforeInsertEvent();
            if (handle === false) {
                return;
            }

            const html = await this.getHtmlRow();

            // Checks locale of insert
            if (this.isInsertBottom()) {
                this.tableBody.append(html);
            } else {
                this.tableBody.prepend(html);
            }
            // Dispatch after insert event
            this.triggerAfterInsertEvent(html);
            // Increment index
            this.incrementIndex();
        }
    }

    /**
     * Dispatch before insert event and catch your value
     * @return {boolean}
     */
    async triggerBeforeInsertEvent() {
        const valueColumns = await this.getValueColumns();
        const valuesInserted = this.getAllDataTable();
        return $('#' + this.config.widgetContainer).triggerHandler('beforeInsert', [valueColumns, valuesInserted, this]);
    }

    /**
     * Dispatch after insert event
     * @param {Node} node
     * @return {void}
     */
    triggerAfterInsertEvent(node) {
        $('#' + this.config.widgetContainer).triggerHandler('afterInsert', node);
    }

    /**
     * Dispatch limit reached event
     * @return {void}
     */
    triggerLimitReached() {
        $('#' + this.config.widgetContainer).triggerHandler('limitReached');
    }

    /**
     * Returns an element tr
     * @param content string|jQuery
     * @return {string}
     */
    getTrHtml(content) {
        return `<tr ${this.rowOptions}>${content}</tr>`;
    }

    /**
     * Handle with delete row
     * @param event {Event}
     * @returns {void}
     */
    handleDeleteRow(event) {
        event.stopPropagation();
        const {currentTarget} = event;
        $(currentTarget).parent().parent().remove();
        this.reorderInputs();
    }

    /**
     * Increment the index
     * @returns {void}
     */
    incrementIndex() {
        this.index += 1;
    }

    /**
     * Decrement the index
     * @returns {void}
     */
    decrementIndex() {
        this.index -= 1;
    }

    /**
     * Returns current index
     * @return {number}
     */
    get index() {
        return this.index;
    }

    /**
     * Handle click row
     * @param event {Event}
     */
    handleClickRow(event) {
        const {currentTarget} = event;
        if (this.config.allowEdit) {
            if (this.isEditMode()) {
                this.cancelEdit();
            }
            $(currentTarget).attr('data-edit', true);
            let added = [];
            $(currentTarget).find('input[data-reference]').each((k, v) => {
                const reference = $(v).attr('data-reference');
                const referenceElement = $('#' + reference);

                // if reference is not added and the element referenced is div then clean checkbox selections
                if (added.indexOf(reference) === -1 && InputHelper.elementIsDiv(referenceElement)) {
                    referenceElement.find('input[type="checkbox"]').prop('checked', false);
                }

                // if reference is not added and the element referenced is select multiple then clean the selections
                if (added.indexOf(reference) === -1 && InputHelper.inputIsSelectMultiple(referenceElement)) {
                    referenceElement.val('');
                }

                const factory = InputFactory.getInstance(referenceElement);
                factory.setValue($(v).val())
                added.push(reference);
            });
        }
    }

    /**
     * Get values referenced
     * @return {Promise<{}>}
     */
    async getValueColumns() {
        const ret = {};
        for (const [key, column] of this.columns.entries()) {
            if (column.id) {
                const input = $('#' + column.id);
                const factory = InputFactory.getInstance(input, {
                    input, baseName: column.templateInputName,
                    index: key,
                    reference: column.id
                });
                if (!ret[column.attribute]) {
                    ret[column.attribute] = await factory.getValue();
                } else if (Array.isArray(ret[column.attribute])) {
                    ret[column.attribute].push(await factory.getValue());
                } else {
                    const current = ret[column.attribute];
                    ret[column.attribute] = [
                        current,
                        await factory.getValue()
                    ];
                }
            }
        }

        return ret;
    }

    /**
     * Returns the id of table
     * @return {string}
     */
    get tableId() {
        return this.config.options.id;
    }

    /**
     * Returns the element of table
     * @return {jQuery}
     */
    get table() {
        return $(`#${this.tableId}`);
    }

    /**
     * Returns the tbody element of table
     * @return {jQuery}
     */
    get tableBody() {
        return $(`#${this.tableId}`).find('tbody');
    }

    /**
     * Returns the row options in string format
     * @return {string}
     */
    get rowOptions() {
        const rowOptions = this.config.rowOptions;
        return Object.keys(rowOptions)
            .reduce((accumulator, currentValue) => accumulator += `${currentValue}="${rowOptions[currentValue]}" `
                , '').trim();
    }

    /**
     * Returns the class of delete row
     * @return {string}
     */
    get deleteRowClass() {
        return this.config.deleteRowClass;
    }

    /**
     * Returns the widget container id
     * @return {string}
     */
    get widgetContainer() {
        return this.config.widgetContainer;
    }

    /**
     * Returns the select for all rows of the table
     * @return {string}
     */
    get selectorTableRows() {
        return `#${this.widgetContainer} tbody tr`;
    }

    /**
     * Reorder the inputs name
     * @return {void}
     */
    reorderInputs() {
        $(this.selectorTableRows).each((key, row) => {
            $(row).find('input[type="hidden"]').each((k, input) => {
                $(input).attr('name', $(input).attr('name').replace(/\[\d+\]/, `[${key}]`));
            })
        });

        this.index = this.currentTotalRows;
    }

    /**
     * Return the current total rows
     * @return {number}
     */
    get currentTotalRows() {
        return $(this.selectorTableRows).length;
    }

    /**
     * Checks if is in edit mode
     * @return {boolean}
     */
    isEditMode() {
        return !!this.tableBody.find('tr[data-edit="true"]').length;
    }

    /**
     * Returns the row that is editing
     * @return {jQuery}
     */
    get rowEdit() {
        return this.tableBody.find('tr[data-edit="true"]');
    }

    /**
     * Returns the html row
     * @return {Promise<string>}
     */
    async getHtmlRow() {
        let html = '';
        const valueColumns = await this.getValueColumns();
        for (const column of this.columns) {
            const input = $('#' + column.id);
            html += await column.classJs.renderContent(valueColumns, this.index);
            if (column.cleanAfterInsert) {
                input.val('').trigger('change');
            }
        }

        html = this.getTrHtml(html);
        html = $(html);
        return html;
    }

    /**
     * Dispatch limit reached event
     * @return {void}
     */
    async triggerBeforeUpdate() {
        $('#' + this.config.widgetContainer).triggerHandler('beforeUpdate', await this.getValueColumns());
    }

    /**
     * Dispatch limit reached event
     * @return {void}
     */
    triggerAfterUpdate(node) {
        $('#' + this.config.widgetContainer).triggerHandler('afterUpdate', node);
    }

    /**
     * Cancel the edit mode
     * @return {void}
     */
    cancelEdit() {
        this.rowEdit.removeAttr('data-edit');
    }

    /**
     * Returns all data inserted in the table
     * @returns {*[]}
     */
    getAllDataTable() {
        const ret = [];
        $(this.selectorTableRows).each(async (key, row) => {
            let object = {};
            for (const [key, column] of this.columns.entries()) {
                if (column.id) {
                    const element = $(row).find(`input[data-reference="${column.id}"]`);
                    const factory = InputFactory.getInstance(element);
                    object[column.id] = await factory.getValue();
                }
            }
            ret.push(object);
        });

        return ret;
    }
}