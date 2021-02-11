class DynamicGridForm{config;insertButton;table;index
    static bottom='bottom';static top='top';constructor(config){this.config=config;this.insertButton=$('#'+config.insertButton);this.table=$('#'+config.tableId);this.index=this.currentTotalRows;this.insertButton.on('click',this.handleClickInsertButton.bind(this));if(this.deleteRowClass){$(document).on('click',`#${this.widgetContainer} .${this.deleteRowClass}`,this.handleDeleteRow.bind(this))}
        $(document).on('click',this.selectorTableRows,this.handleClickRow.bind(this));$('#'+this.config.widgetContainer).on('cancelEdit',this.cancelEdit.bind(this))}
    limitReached(){if(this.config.max===0){return!1}
        return(this.index+1)>this.config.max}
    handleLimitReached(){this.triggerLimitReached()}
    get columns(){return this.config.columns}
    isInsertBottom(){return this.config.insertPosition===DynamicGridForm.bottom}
    async handleClickInsertButton(){if(this.isEditMode()){this.triggerBeforeUpdate();const html=await this.getHtmlRow();const row=this.rowEdit;row.after(html);row.remove();this.reorderInputs();this.triggerAfterUpdate(html)}else{if(this.limitReached()){this.handleLimitReached();return}
        const handle=await this.triggerBeforeInsertEvent();if(handle===!1){return}
        const html=await this.getHtmlRow();if(this.isInsertBottom()){this.tableBody.append(html)}else{this.tableBody.prepend(html)}
        this.triggerAfterInsertEvent(html);this.incrementIndex()}}
    async triggerBeforeInsertEvent(){const valueColumns=await this.getValueColumns();return $('#'+this.config.widgetContainer).triggerHandler('beforeInsert',valueColumns)}
    triggerAfterInsertEvent(node){$('#'+this.config.widgetContainer).triggerHandler('afterInsert',node)}
    triggerLimitReached(){$('#'+this.config.widgetContainer).triggerHandler('limitReached')}
    getTrHtml(content){return `<tr ${this.rowOptions}>${content}</tr>`}
    handleDeleteRow(event){event.stopPropagation();const{currentTarget}=event;$(currentTarget).parent().parent().remove();this.reorderInputs()}
    incrementIndex(){this.index+=1}
    decrementIndex(){this.index-=1}
    get index(){return this.index}
    handleClickRow(event){const{currentTarget}=event;if(this.config.allowEdit){if(this.isEditMode()){this.cancelEdit()}
        $(currentTarget).attr('data-edit',!0);let added=[];$(currentTarget).find('input').each((k,v)=>{const reference=$(v).attr('data-reference');const referenceElement=$('#'+reference);if(added.indexOf(reference)===-1&&InputHelper.elementIsDiv(referenceElement)){referenceElement.find('input[type="checkbox"]').prop('checked',!1)}
            if(added.indexOf(reference)===-1&&InputHelper.inputIsSelectMultiple(referenceElement)){referenceElement.val('')}
            const factory=InputFactory.getInstance(referenceElement);factory.setValue($(v).val())
            added.push(reference)})}}
    async getValueColumns(){const ret={};for(const[key,column]of this.columns.entries()){if(column.id){const input=$('#'+column.id);const factory=InputFactory.getInstance(input,{input,baseName:column.templateInputName,index:key,reference:column.id});if(!ret[column.attribute]){ret[column.attribute]=await factory.getValue()}else if(Array.isArray(ret[column.attribute])){ret[column.attribute].push(await factory.getValue())}else{const current=ret[column.attribute];ret[column.attribute]=[current,await factory.getValue()]}}}
        return ret}
    get tableId(){return this.config.options.id}
    get table(){return $(`#${this.tableId}`)}
    get tableBody(){return $(`#${this.tableId}`).find('tbody')}
    get rowOptions(){const rowOptions=this.config.rowOptions;return Object.keys(rowOptions).reduce((accumulator,currentValue)=>accumulator+=`${currentValue}="${rowOptions[currentValue]}" `,'').trim()}
    get deleteRowClass(){return this.config.deleteRowClass}
    get widgetContainer(){return this.config.widgetContainer}
    get selectorTableRows(){return `#${this.widgetContainer} tbody tr`}
    reorderInputs(){$(this.selectorTableRows).each((key,row)=>{$(row).find('input[type="hidden"]').each((k,input)=>{$(input).attr('name',$(input).attr('name').replace(/\[\d+\]/,`[${key}]`))})});this.index=this.currentTotalRows}
    get currentTotalRows(){return $(this.selectorTableRows).length}
    isEditMode(){return!!this.tableBody.find('tr[data-edit="true"]').length}
    get rowEdit(){return this.tableBody.find('tr[data-edit="true"]')}
    async getHtmlRow(){let html='';const valueColumns=await this.getValueColumns();for(const column of this.columns){const input=$('#'+column.id);html+=await column.classJs.renderContent(valueColumns,this.index);if(column.cleanAfterInsert){input.val('').trigger('change')}}
        html=this.getTrHtml(html);html=$(html);return html}
    async triggerBeforeUpdate(){$('#'+this.config.widgetContainer).triggerHandler('beforeUpdate',await this.getValueColumns())}
    triggerAfterUpdate(node){$('#'+this.config.widgetContainer).triggerHandler('afterUpdate',node)}
    cancelEdit(){this.rowEdit.removeAttr('data-edit')}}